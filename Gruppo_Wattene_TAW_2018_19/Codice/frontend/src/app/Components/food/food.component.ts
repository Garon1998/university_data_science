import { Component, OnInit } from "@angular/core";
import { FoodService, SocketIOService } from "src/app/Services";
import { Router } from "@angular/router";
import { FoodModel } from "src/app/Models";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.css"]
})
export class FoodComponent implements OnInit {
  dataSource;
  foods: FoodModel[] = [];
  food: FoodModel;
  form: FormGroup;

  constructor(
    private foodHttp: FoodService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sio: SocketIOService
  ) {}

  ngOnInit() {
    this.getFoods();
    this.sio.modified_food().subscribe(food => {
      if (food) {
        const index = this.foods.findIndex(x => x._id === food._id);
        if (index === -1) {
          this.foods.push(food);
        } else {
          this.foods[index] = food;
        }
        this.foods = this.foods.sort((a, b) => a.name.localeCompare(b.name));
        console.log(this.foods);
        this.dataSource = new MatTableDataSource(this.foods);
      } else {
        this.getFoods();
      }
    });
    this.food = {
      _id: "",
      name: "",
      price: 0,
      time: 0,
      category: "Primo Piatto",
      available: true
    };

    this.form = this.formBuilder.group({});
  }
  getFoods() {
    this.foodHttp.getFoods().subscribe(data => {
      this.foods = data;
      this.foods = this.foods.sort((a, b) => a.name.localeCompare(b.name));
      this.dataSource = new MatTableDataSource(this.foods);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateFood(id: string, available: boolean) {
    this.foodHttp.updateFood(this.foods.find(x => x._id === id), available).subscribe(
      data => {
        this.ngOnInit();
      });
  }

  deleteFood(id: string) {
    this.foodHttp.deleteFood(id).subscribe(data => {
      this.foods = this.foods.filter(x => x._id !== id);
      this.foods = this.foods.sort((a, b) => a.name.localeCompare(b.name));
      this.dataSource = new MatTableDataSource(this.foods);
    });
  }

  createFood() {
    this.foodHttp.createFood(this.food).subscribe(
      data => {
        this.foods.push(data);
        this.foods = this.foods.sort((a, b) => a.name.localeCompare(b.name));
        this.dataSource = new MatTableDataSource(this.foods);
      },
      err => {
        if (err.status === 304) {
          this.openSnackBar("Cibo già presente", 2000);
        }
      }
    );
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, "chiudi", {
      duration: time
    });
  }
}
