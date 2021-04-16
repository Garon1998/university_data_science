import { Component, OnInit } from "@angular/core";
import { DrinkModel } from "src/app/Models";
import { DrinkService, SocketIOService } from "src/app/Services";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-drink",
  templateUrl: "./drink.component.html",
  styleUrls: ["./drink.component.css"]
})
export class DrinkComponent implements OnInit {
  dataSource;
  drinks: DrinkModel[] = [];
  form: FormGroup;
  drink: DrinkModel;

  constructor(
    private drinkHttp: DrinkService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sio: SocketIOService
  ) {}

  ngOnInit() {
    this.getDrinks();
    this.sio.modified_drink().subscribe(drink => {
      if (drink) {
        const index = this.drinks.findIndex(x => x._id === drink._id);
        if (index === -1) {
          this.drinks.push(drink);
        } else {
          this.drinks[index] = drink;
        }
        console.log(this.drinks);
        // this.drinks = this.drinks.sort((a, b) => a.name.localeCompare(b.name));
        this.dataSource = new MatTableDataSource(this.drinks);
      } else {
        this.getDrinks();
      }
    });

    this.drink = {
      _id: '',
      name: '',
      price: 0,
      time: 0,
      category: 'Analcolico',
      available: true
    };

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  getDrinks() {
    this.drinkHttp.getDrinks().subscribe(data => {
      this.drinks = data;
      this.drinks = this.drinks.sort((a, b) => a.name.localeCompare(b.name));
      this.dataSource = new MatTableDataSource(this.drinks);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateDrink(id: string, available: boolean) {
    this.drinkHttp
      .updateDrink(
        this.drinks.find(x => x._id === id),
        available
      )
      .subscribe(data => {
        this.ngOnInit();
      });
  }

  deleteDrink(id: string) {
    this.drinkHttp.deleteDrink(id).subscribe(data => {
      this.drinks = this.drinks.filter(x => x._id !== id);
      this.dataSource = new MatTableDataSource(this.drinks);
    });
  }

  createDrink() {
    this.drinkHttp.createDrink(this.drink).subscribe(
      data => {
        this.drinks.push(data);
        this.drinks = this.drinks.sort((a, b) => a.name.localeCompare(b.name));
        this.dataSource = new MatTableDataSource(this.drinks);
      },
      err => {
        if (err.status === 304) {
          this.openSnackBar('Bevanda già presente', 2000);
        }
      }
    );
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time
    });
  }
}
