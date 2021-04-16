(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/backoffice/backoffice.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/backoffice/backoffice.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\r\n<mat-card>\r\n  <mat-tab-group>\r\n    <mat-tab label=\"REGISTRAZIONE\">\r\n      <app-register></app-register>\r\n    </mat-tab>\r\n    <mat-tab label=\"UTENTI\">\r\n      <app-users></app-users>\r\n    </mat-tab>\r\n    <mat-tab label=\"CIBI\">\r\n      <app-food></app-food>\r\n    </mat-tab>\r\n    <mat-tab label=\"BEVANDE\">\r\n      <app-drink></app-drink>\r\n    </mat-tab>\r\n    <mat-tab label=\"STATISTICHE\">\r\n      <app-stats></app-stats>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n</mat-card>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dashboard/dashboard.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dashboard/dashboard.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\r\n<!--Dashboard per la cassa e per i camerieri-->\r\n\r\n<mat-tab-group class=\"stats\" *ngIf=\"role === Roles?.cassa || role === Roles?.cameriere\">\r\n  <mat-tab label=\"Tavoli\">\r\n    <mat-card style=\"min-height: 100vh;\" *ngIf=\"role === Roles?.cameriere || role === Roles?.cassa\">\r\n      <mat-card-content>\r\n        <!-- rowHeight=\"1:1\" -->\r\n        <mat-grid-list [cols]=\"breakpoint\" rowHeight=\"1:1\" (window:resize)=\"onResize($event)\"\r\n          style=\"margin: 10px 10px;\">\r\n          <div *ngFor=\"let table of tables\" style=\"margin: 5em 5em;\">\r\n            <mat-grid-tile>\r\n              <button mat-raised-button class=\"big-button\" style=\"width: 100%;height: 100%; color: white; line-height: 30px;\"\r\n                [ngStyle]=\"{'background-color': (table?.available)? 'green': (!table.available && table.order_id)? 'red': 'orange'}\"\r\n                [matMenuTriggerFor]=\"tableMenu\">\r\n                <div *ngIf=\"!table?.available && table?.waiter_id != null\" style=\"margin: 0;\">\r\n                  {{getCameriereDelTavolo(table?.waiter_id)}}</div>\r\n                <div *ngIf=\"role === Roles?.cassa && !table?.available && table?.order_id !== null\" style=\"margin: 0;\">\r\n                  {{getSuborderStateFoods(table?.order_id, table?._id)}}</div>\r\n                <div *ngIf=\"role === Roles?.cassa && !table?.available && table?.order_id !== null\" style=\"margin: 0;\">\r\n                  {{getSuborderStateDrinks(table?.order_id, table?._id)}}</div>\r\n                <div *ngIf=\"!table?.available && table?.order_id == null\" style=\"margin: 0;\">Attesa ordine...</div>\r\n                <div style=\"font-size: large;\">\r\n                  # {{table?.table_number}}\r\n                </div>\r\n                <div style=\"font-size: large;\">\r\n                  <i class=\"material-icons\">supervisor_account</i> {{table?.clients}}/{{table?.total_seats}}\r\n                </div>\r\n              </button>\r\n\r\n              <mat-menu #tableMenu=\"matMenu\">\r\n                <button mat-menu-item *ngIf=\"table?.available && (role === Roles?.cassa || role === Roles?.cameriere) \"\r\n                  (click)=\"openTableDialog(table?._id, table?.total_seats, table)\">Occupa tavolo</button>\r\n                <button mat-menu-item *ngIf=\"!table?.available && !table?.order_id && role === Roles?.cassa\"\r\n                  (click)=\"freeTable(table?._id, table)\">Libera tavolo</button>\r\n                <button mat-menu-item *ngIf=\"table?.order_id && role === Roles?.cassa\"\r\n                  (click)=\"deleteOrder(table?.order_id)\">Elimina ordine</button>\r\n                <button mat-menu-item *ngIf=\"role === Roles?.cassa && table?.clients == 0\"\r\n                  (click)=\"deleteTable(table?._id)\">Elimina tavolo</button>\r\n                <button mat-menu-item\r\n                  *ngIf=\"table?.waiter_id === user?._id && !table?.available && !table?.order_id != null && role === Roles?.cameriere\"\r\n                  (click)=\"goToOrders(table?._id)\">Gestione ordine</button>\r\n                <button mat-menu-item *ngIf=\"!table?.available && table?.order_id && role === Roles?.cassa\"\r\n                  (click)=\"payment(table?._id, table?.order_id, false)\">Paga</button>\r\n                <button mat-menu-item *ngIf=\"!table?.available && table?.order_id && role === Roles?.cassa\"\r\n                  (click)=\"payment(table?._id, table?.order_id, true)\">Paga e libera tavolo</button>\r\n              </mat-menu>\r\n            </mat-grid-tile>\r\n          </div>\r\n          <mat-grid-tile>\r\n            <button mat-raised-button class=\"big-button\"\r\n              style=\"width: 300px;height: 250px; color: white;background-color: rgb(177, 50, 149)\" (click)=\"addTable()\"\r\n              *ngIf=\"role === Roles?.cassa\">\r\n              <div style=\"font-size: 90px;\">\r\n                +\r\n              </div>\r\n            </button>\r\n          </mat-grid-tile>\r\n\r\n        </mat-grid-list>\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n  </mat-tab>\r\n  <mat-tab *ngIf=\"role === Roles?.cameriere\">\r\n    <ng-template mat-tab-label>\r\n      <div [ngClass]=\"(nuoviOrdini===true) ? 'pulseColor':''\" (click)=\"nuoviOrdini = false\" >\r\n        <!-- <mat-icon class=\"example-tab-icon\">thumb_up</mat-icon> -->\r\n        Da servire\r\n      </div>\r\n    </ng-template>\r\n    <app-serve-queue></app-serve-queue>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n<!--Dashboard per i cuochi e per i baristi-->\r\n<app-preparation-queue *ngIf=\"role === Roles?.cuoco || role === Roles?.barista\"></app-preparation-queue>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dialog-payment/dialog-payment.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dialog-payment/dialog-payment.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card-title>Pagamento</mat-card-title>\r\n<mat-card-content>\r\n  <div *ngFor=\"let subOrder of subOrders\">\r\n    <div *ngFor=\"let food of subOrder?.ordered_foods\">\r\n      {{food?.price*food?.quantity}}€  x{{food?.quantity}} {{food?.name}}\r\n    </div>\r\n    <div *ngFor=\"let drink of subOrder?.ordered_drinks\">\r\n      {{drink?.price*drink?.quantity}}€  x{{drink?.quantity}} {{drink?.name}}\r\n    </div>\r\n  </div>\r\n  <div style=\"margin-top: 20px;\">\r\n    <b>Totale: {{total}}€</b>\r\n  </div>\r\n\r\n  <button mat-raised-button color=\"primary\"style=\"margin-top: 25px\" [mat-dialog-close]=\"table\" (click)=\"pay()\" cdkFocusInitial>Paga</button>\r\n</mat-card-content>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dialog-table/dialog-table.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dialog-table/dialog-table.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngIf=\"!data?.addTable\">\r\n  <ol>\r\n    <li>\r\n      <mat-form-field>\r\n        <input matInput type=\"number\" [min]=\"data?.minSeats\" [max]=\"data?.maxSeats\" [(ngModel)]=\"numeroClienti\" placeholder=\"Inserisci il numero di clienti\">\r\n      </mat-form-field>\r\n    </li>\r\n\r\n    <li *ngIf=\"role === Roles?.cassa\">\r\n      <mat-form-field>\r\n        <mat-label>Cameriere</mat-label>\r\n        <mat-select>\r\n          <mat-option *ngFor=\"let waiter of waiters\" [value]=\"waiter?._id\" (click)=\"idCameriere = waiter?._id\">\r\n            {{waiter.firstname}} {{waiter?.lastname}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </li>\r\n  </ol>\r\n  <div mat-dialog-actions>\r\n    <button mat-button (click)=\"close()\">Chiudi</button>\r\n    <button mat-raised-button color=\"accent\" *ngIf=\"numeroClienti > data?.maxSeats\" (click)=\"openSnackBar('Il tavolo non ha abbastanza posti', 2000)\"></button>\r\n    <button mat-raised-button color=\"accent\" *ngIf=\"numeroClienti && numeroClienti > 0 && numeroClienti <= data?.maxSeats\" (click)=\"takeTable(); close();\">Ok</button>\r\n  </div>\r\n</div>\r\n<div *ngIf=\"data?.addTable\">\r\n  <ol>\r\n    <li>\r\n      <mat-form-field>\r\n        <input matInput type=\"number\" [min]=\"data?.minSeats\" [max]=\"data?.maxSeats\" [(ngModel)]=\"tableNumber\" placeholder=\"Inserisci il numero del tavolo\">\r\n      </mat-form-field>\r\n    </li>\r\n    <li>\r\n      <mat-form-field>\r\n        <input matInput type=\"number\" min=\"0\" [(ngModel)]=\"maxSeats\" placeholder=\"Inserisci il numero di posti\">\r\n      </mat-form-field>\r\n    </li>\r\n  </ol>\r\n  <button *ngIf=\"(tableNumber && tableNumber > 0) && (maxSeats && maxSeats > 0)\" mat-raised-button color=\"accent\" (click)=\"addTable(tableNumber,maxSeats); close()\">Conferma</button>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/drink/drink.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/drink/drink.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<mat-form-field style=\"margin-top: 20px; margin-left: 5%; width: 90%;\">\r\n  <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n</mat-form-field>\r\n\r\n<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\r\n\r\n  <ng-container matColumnDef=\"name\">\r\n    <th mat-header-cell *matHeaderCellDef> Nome </th>\r\n    <td mat-cell *matCellDef=\"let drink\"> {{drink?.name}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"category\">\r\n    <th mat-header-cell *matHeaderCellDef> Categoria </th>\r\n    <td mat-cell *matCellDef=\"let drink\"> {{drink?.category}}</td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"price\">\r\n    <th mat-header-cell *matHeaderCellDef> Prezzo </th>\r\n    <td mat-cell *matCellDef=\"let drink\"> {{drink?.price}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"time\">\r\n    <th mat-header-cell *matHeaderCellDef> Tempo </th>\r\n    <td mat-cell *matCellDef=\"let drink\"> {{drink?.time}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"available\">\r\n    <th mat-header-cell *matHeaderCellDef> Disponibile </th>\r\n    <td mat-cell *matCellDef=\"let drink\"> \r\n      <mat-slide-toggle color=\"primary\" [checked]=\"drink?.available\" (click)=\"updateDrink(drink?._id, !drink?.available);\"></mat-slide-toggle>\r\n    </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"delete\">\r\n    <th mat-header-cell *matHeaderCellDef></th>\r\n    <td mat-cell *matCellDef=\"let drink\">\r\n      <button mat-flat-button (click)=\"deleteDrink(drink?._id)\"><i class=\"material-icons\">delete</i></button>\r\n    </td>\r\n  </ng-container>\r\n\r\n  <tr mat-header-row *matHeaderRowDef=\"['name','category','price','time','available','delete']\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: ['name','category','price','time','available','delete'];\"></tr>\r\n</table>\r\n\r\n<mat-accordion>\r\n  <mat-expansion-panel style=\"width: 90%; margin-left:5%; margin-bottom: 20px;\" class=\"mat-elevation-z8\" (click)=\"form?.reset()\">\r\n    <mat-expansion-panel-header>\r\n      <mat-panel-title>\r\n        Aggiungi una bevanda\r\n      </mat-panel-title>\r\n      <mat-panel-description>\r\n        Clicca per visualizzare\r\n      </mat-panel-description>\r\n    </mat-expansion-panel-header>\r\n    <form [formGroup]=\"form\">\r\n      <mat-form-field class=\"space-on-side\">\r\n        <mat-label>Nome</mat-label>\r\n        <input type=\"text\" matInput [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"drink.name\">\r\n        <mat-error *ngIf=\"drink?.name === ''\">Inserire il nome della bevanda</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"space-on-side\">\r\n        <mat-label>Categoria</mat-label>\r\n        <mat-select [(value)]=\"drink.category\" [value]=\"drink?.category\">\r\n          <mat-option value=\"Analcolico\">Analcolico</mat-option>\r\n          <mat-option value=\"Alcolico\">Alcolico</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"space-on-side\" style=\"width: 70px\">\r\n        <mat-label>Prezzo</mat-label>\r\n        <input matInput type=\"number\" min=\"0\" [(ngModel)]=\"drink.price\" [ngModelOptions]=\"{standalone: true}\" [value]=\"drink?.price\">\r\n      </mat-form-field>\r\n      <mat-form-field class=\"space-on-side\" style=\"width: 70px\">\r\n        <mat-label>Tempo di preparazione</mat-label>\r\n        <input matInput type=\"number\" min=\"0\" [(ngModel)]=\"drink.time\" [ngModelOptions]=\"{standalone: true}\" [value]=\"drink?.time\">\r\n      </mat-form-field>\r\n    </form>\r\n    <button mat-raised-button color=\"accent\" style=\"margin: 20px 20px;\" [disabled]=\"drink?.name === ''\" (click)=\"createDrink(); drink.nome = ''; drink.price = 0; drink.category = 'Analcolico'; drink.time = 0;\">Conferma</button>\r\n  </mat-expansion-panel>\r\n</mat-accordion>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/food/food.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/food/food.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<mat-form-field style=\"margin-top: 20px; margin-left: 5%; width: 90%;\">\r\n  <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n</mat-form-field>\r\n\r\n<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\r\n\r\n  <ng-container matColumnDef=\"name\">\r\n    <th mat-header-cell *matHeaderCellDef> Nome </th>\r\n    <td mat-cell *matCellDef=\"let food\"> {{food?.name}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"category\">\r\n    <th mat-header-cell *matHeaderCellDef> Categoria </th>\r\n    <td mat-cell *matCellDef=\"let food\"> {{food?.category}}</td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"price\">\r\n    <th mat-header-cell *matHeaderCellDef> Prezzo </th>\r\n    <td mat-cell *matCellDef=\"let food\"> {{food?.price}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"time\">\r\n    <th mat-header-cell *matHeaderCellDef> Tempo </th>\r\n    <td mat-cell *matCellDef=\"let food\"> {{food?.time}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"available\">\r\n    <th mat-header-cell *matHeaderCellDef> Disponibile </th>\r\n    <td mat-cell *matCellDef=\"let food\"> \r\n      <mat-slide-toggle color=\"primary\" [checked]=\"food?.available\" (click)=\"updateFood(food?._id, !food?.available);\"></mat-slide-toggle>\r\n    </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"delete\">\r\n    <th mat-header-cell *matHeaderCellDef></th>\r\n    <td mat-cell *matCellDef=\"let food\">\r\n      <button mat-flat-button (click)=\"deleteFood(food?._id)\"><i class=\"material-icons\">delete</i></button>\r\n    </td>\r\n  </ng-container>\r\n\r\n  <tr mat-header-row *matHeaderRowDef=\"['name','category','price','time','available','delete']\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: ['name','category','price','time','available','delete'];\"></tr>\r\n</table>\r\n\r\n<mat-accordion>\r\n  <mat-expansion-panel style=\"width: 90%; margin-left:5%; margin-bottom: 20px;\" class=\"mat-elevation-z8\" (click)=\"form?.reset()\">\r\n    <mat-expansion-panel-header>\r\n      <mat-panel-title>\r\n        Aggiungi un cibo\r\n      </mat-panel-title>\r\n      <mat-panel-description>\r\n        Clicca per visualizzare\r\n      </mat-panel-description>\r\n    </mat-expansion-panel-header>\r\n    <form [formGroup]=\"form\">\r\n      <mat-form-field class=\"space-on-side\">\r\n        <mat-label>Nome</mat-label>\r\n        <input type=\"text\" matInput [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"food.name\">\r\n        <mat-error *ngIf=\"food?.name === ''\">Inserire il nome del cibo</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"space-on-side\">\r\n        <mat-label>Categoria</mat-label>\r\n        <mat-select [(value)]=\"food.category\" [value]=\"food?.category\">\r\n          <mat-option value=\"Antipasto\">Antipasto</mat-option>\r\n          <mat-option value=\"Contorno\">Contorno</mat-option>\r\n          <mat-option value=\"Dessert\">Dessert</mat-option>\r\n          <mat-option value=\"Dolce\">Dolce</mat-option>\r\n          <mat-option value=\"Primo Piatto\">Primo Piatto</mat-option>\r\n          <mat-option value=\"Secondo Piatto\">Secondo Piatto</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"space-on-side\" style=\"width: 70px\">\r\n        <mat-label>Prezzo</mat-label>\r\n        <input matInput type=\"number\" min=\"0\" [(ngModel)]=\"food.price\" [ngModelOptions]=\"{standalone: true}\" [value]=\"food?.price\">\r\n      </mat-form-field>\r\n      <mat-form-field class=\"space-on-side\" style=\"width: 70px\">\r\n        <mat-label>Tempo di preparazione</mat-label>\r\n        <input matInput type=\"number\" min=\"0\" [(ngModel)]=\"food.time\" [ngModelOptions]=\"{standalone: true}\" [value]=\"food?.time\">\r\n      </mat-form-field>\r\n    </form>\r\n    <button mat-raised-button color=\"accent\" style=\"margin: 20px 20px;\" [disabled]=\"food?.name === ''\" (click)=\"createFood(); food.name = ''; food.price = 0; food.category = 'Primo piatto'; food.time = 0;\">Conferma</button>\r\n  </mat-expansion-panel>\r\n</mat-accordion>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/login/login.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/login/login.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card class=\"login\">\r\n  <mat-tab-group>\r\n    <mat-tab label=\"LOGIN\">\r\n      <form [formGroup]=\"loginForm\" class=\"formLogin\">\r\n        <mat-form-field>\r\n          <input type=\"text\" matInput placeholder=\"Username\" formControlName=\"username\" [(ngModel)]=\"username\" autocomplete=\"off\">\r\n          <mat-error *ngIf=\"loginForm?.get('username')?.hasError('required')\">Inserire l'username</mat-error>\r\n        </mat-form-field>\r\n        <br>\r\n        <mat-form-field>\r\n          <input type=\"password\" matInput placeholder=\"Password\" formControlName=\"password\" [(ngModel)]=\"password\" autocomplete=\"off\">\r\n          <mat-error *ngIf=\"loginForm?.get('password')?.hasError('required')\">Inserire la password</mat-error>\r\n        </mat-form-field>\r\n        <div class=\"buttonForm\">\r\n          <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!loginForm?.valid\">Conferma</button>\r\n        </div>\r\n      </form>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n</mat-card>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/navbar/navbar.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/navbar/navbar.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar color=\"primary\" class=\"app-toolbar\" style=\"margin-bottom: 50px\">\r\n  <span>\r\n    <a class=\"logo\" routerLink='/dashboard'>WATTENE</a>\r\n  </span>\r\n  <span class=\"spacer\"></span>\r\n\r\n  <button mat-raised-button color=\"primary\">{{role}}</button>\r\n  <a routerLink=\"/backoffice\">\r\n    <i class=\"material-icons light-icons\" style=\"padding: 0 14px;\" *ngIf=\"role === Roles?.cassa\">settings</i>\r\n  </a>\r\n\r\n  <a routerLink=\"/login\" (click)=\"logout()\">\r\n    <i class=\"material-icons light-icons\">logout</i>\r\n  </a>\r\n\r\n</mat-toolbar>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/order/order.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/order/order.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\r\n<mat-card>\r\n  <mat-tab-group style=\"height: 65vh;padding: 0 10px;\">\r\n    <mat-tab label=\"Cibi\">\r\n      <mat-form-field>\r\n        <mat-label>Categoria</mat-label>\r\n        <mat-select [(ngModel)]=\"categoriaCibo\" (selectionChange)=\"categoriaCiboModificata()\">\r\n          <mat-option value=\"\">\r\n            -\r\n          </mat-option>\r\n          <mat-option *ngFor=\"let categoria of categorieCibi\" [value]=\"categoria\">\r\n            {{categoria}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-list>\r\n        <div *ngFor=\"let food of foods; index as i\">\r\n          <mat-list-item>\r\n            {{food?.name}}\r\n            <mat-form-field style=\"position: absolute; margin-left: 80%; width: 50px;\">\r\n              <input matInput type=\"number\" min=\"0\" placeholder=\"\" [(ngModel)]=\"foods[i].quantita\"\r\n                (focusout)=\"(foods[i]?.quantita < 0) ? foods[i].quantita = null : null;\" />\r\n            </mat-form-field>\r\n          </mat-list-item>\r\n        </div>\r\n      </mat-list>\r\n    </mat-tab>\r\n    <mat-tab label=\"Bibite\">\r\n      <mat-list>\r\n        <mat-form-field>\r\n          <mat-label>Categoria</mat-label>\r\n          <mat-select [(ngModel)]=\"categoriaBibite\" (selectionChange)=\"categoriaBibiteModificata()\">\r\n            <mat-option value=\"\">\r\n              -\r\n            </mat-option>\r\n            <mat-option *ngFor=\"let categoria of categorieBibite\" [value]=\"categoria\">\r\n              {{categoria}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <div *ngFor=\"let drink of drinks; index as i\">\r\n          <mat-list-item>\r\n            {{drink?.name}}\r\n            <mat-form-field style=\"position: absolute; margin-left: 80%; width: 50px;\">\r\n              <input matInput type=\"number\" min=\"0\" [(ngModel)]=\"drinks[i].quantita\"\r\n                (focusout)=\"(drinks[i]?.quantita < 0) ? drinks[i].quantita = 0 : null;\" />\r\n            </mat-form-field>\r\n          </mat-list-item>\r\n        </div>\r\n      </mat-list>\r\n    </mat-tab>\r\n    <div *ngIf=\"cibiCarrello || bibiteCarrello\">\r\n      <mat-tab label=\"Riepilogo ordine\">\r\n        <div *ngFor=\"let cibo of cibiOrdinatiFiltrati\">\r\n          x{{cibo?.quantita}} {{cibo?.name}}\r\n        </div>\r\n        <div *ngFor=\"let bibita of bibiteOrdinateFiltrate\">\r\n          x{{bibita?.quantita}} {{bibita?.name}}\r\n        </div>\r\n      </mat-tab>\r\n    </div>\r\n  </mat-tab-group>\r\n</mat-card>\r\n<mat-toolbar color=\"primary\" style=\"position: fixed; bottom: 0; width: 100vw;\">\r\n  <button mat-raised-button color=\"warn\" [disabled]=\"!cibiCarrello && !bibiteCarrello\" (click)=\"creaSubOrder()\">Conferma\r\n    ordine</button>\r\n</mat-toolbar>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/preparation-queue/preparation-queue.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/preparation-queue/preparation-queue.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card>\r\n  <mat-card-header>\r\n    <mat-card-title style=\"font-size: xx-large;\">Ordini</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <mat-toolbar>\r\n      <mat-toolbar-row *ngFor=\"let suborder of suborders\"\r\n        style=\"margin-bottom: 20px;overflow-x: scroll;overflow-y: hidden;\">\r\n\r\n\r\n        <!-- se sono cuoco -->\r\n        <div *ngIf=\"role === Roles?.cuoco\" style=\"display: contents;\">\r\n\r\n          <div style=\"display: contents;\">\r\n            <mat-card style=\"margin-right: 1rem; cursor: pointer;\" [ngStyle]=\"{'background-color': 'yellow'}\"\r\n              (click)=\"isAllSetToReadyFood(suborder) ? setAllFoodsReady(suborder?.order_id, suborder?._id) : openSnackBar('Non tutte i cibi sono pronti', 3000); \">\r\n              Pronto\r\n            </mat-card>\r\n          </div>\r\n\r\n          <mat-card style=\"margin-right: 1rem;font-size: 0.7em; cursor: pointer;\"\r\n            *ngFor=\"let food of suborder?.ordered_foods\"\r\n            [ngStyle]=\"{'background-color': (food?.prepared_by)? 'green': 'red'}\"\r\n            (click)=\"setFoodReady(suborder?.order_id, suborder?._id, food?.food_id,!food?.prepared_by)\">\r\n            {{food?.name}}\r\n            <br />\r\n            <span>x{{food?.quantity}}</span> <span> Tempo totale: {{food?.quantity*food?.time}} min</span>\r\n\r\n          </mat-card>\r\n        </div>\r\n\r\n        <!-- se sono barista -->\r\n        <div *ngIf=\"role === Roles?.barista\" style=\"display: contents;\">\r\n          <div style=\"display: contents;\">\r\n            <mat-card style=\"margin-right: 1rem; cursor: pointer;\" [ngStyle]=\"{'background-color': 'yellow'}\"\r\n              (click)=\"isAllSetToReadyDrink(suborder) ? setAllDrinksReady(suborder?.order_id, suborder?._id) : openSnackBar('Non tutte le bibite sono pronte', 3000); \">\r\n              Pronto\r\n            </mat-card>\r\n          </div>\r\n\r\n          <mat-card style=\"margin-right: 1rem;font-size: 0.7em; cursor: pointer;\"\r\n            *ngFor=\"let drink of suborder?.ordered_drinks\"\r\n            [ngStyle]=\"{'background-color': (drink?.prepared_by)? 'green': 'red'}\"\r\n            (click)=\"setDrinkReady(suborder?.order_id, suborder?._id, drink?.drink_id, !drink?.prepared_by)\">\r\n            {{drink?.name}}\r\n            <br />\r\n            <span>x{{drink?.quantity}}</span> <span> Tempo totale: {{drink?.quantity*drink?.time}} min</span>\r\n          </mat-card>\r\n        </div>\r\n      </mat-toolbar-row>\r\n    </mat-toolbar>\r\n  </mat-card-content>\r\n</mat-card>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/register/register.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/register/register.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<form [formGroup]=\"registerForm\" class=\"formLogin\" class=\"login\" style=\"width: 90%; margin-left: 4%;\">\r\n  <mat-form-field>\r\n    <input type=\"text\" matInput placeholder=\"Nome\" formControlName=\"firstname\" [(ngModel)]=\"firstname\"\r\n      autocomplete=\"off\">\r\n    <mat-error *ngIf=\"registerForm.get('firstname').hasError('required')\">Inserire il nome</mat-error>\r\n  </mat-form-field>\r\n  <br />\r\n\r\n  <mat-form-field>\r\n    <input type=\"text\" matInput placeholder=\"Cognome\" formControlName=\"lastname\" [(ngModel)]=\"lastname\"\r\n      autocomplete=\"off\">\r\n    <mat-error *ngIf=\"registerForm.get('lastname').hasError('required')\">Inserire il cognome</mat-error>\r\n  </mat-form-field>\r\n  <br />\r\n  <mat-form-field>\r\n    <input type=\"text\" matInput placeholder=\"Username\" formControlName=\"username\" [(ngModel)]=\"username\"\r\n      autocomplete=\"off\">\r\n    <mat-error *ngIf=\"registerForm.get('username').hasError('required')\">Inserire l'username</mat-error>\r\n  </mat-form-field>\r\n  <br />\r\n  <mat-form-field>\r\n    <mat-label>Ruolo</mat-label>\r\n    <mat-select [(ngModel)]=\"role\" formControlName=\"role\">\r\n      <mat-option *ngFor=\"let role of roles\" [value]=\"role\" >\r\n        {{role | uppercase}}\r\n      </mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n  <br/>\r\n  <mat-form-field>\r\n    <input type=\"password\" matInput placeholder=\"Password\" formControlName=\"password\" [(ngModel)]=\"password\"\r\n      autocomplete=\"off\">\r\n    <mat-error *ngIf=\"registerForm.get('password').hasError('required')\">Inserire la password</mat-error>\r\n  </mat-form-field>\r\n  <div class=\"buttonForm\">\r\n    <button mat-raised-button color=\"primary\" (click)=\"onSubmit(); registerForm.reset();\"\r\n      [disabled]=\"!registerForm.valid\">Conferma</button>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/serve-queue/serve-queue.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/serve-queue/serve-queue.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card>\r\n  <mat-card-header>\r\n    <mat-card-title style=\"font-size: xx-large;\">Ordini</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content style=\"width: 40vw;position: relative;float: left;\">\r\n    <mat-toolbar>\r\n      <mat-toolbar-row *ngFor=\"let suborder of suborders\" style=\"margin-bottom: 20px;overflow-x: scroll;overflow-y: hidden;\">\r\n\r\n        <div style=\"display: contents;\">\r\n\r\n          <div style=\"display: contents;\">\r\n            <mat-card style=\"margin-right: 1rem; cursor: pointer;\" [ngStyle]=\"{'background-color': 'yellow'}\" (click)=\"setSuborderDelivered(suborder?.order_id, suborder?._id)\">\r\n              Cibo del tavolo {{getTavoloDelSuborder(suborder?.order_id)?.table_number}}\r\n            </mat-card>\r\n          </div>\r\n        </div>\r\n      </mat-toolbar-row>\r\n    </mat-toolbar>\r\n  </mat-card-content>\r\n  <mat-card-content style=\"width: 40vw;position: relative;float: right;\">\r\n    <mat-toolbar>\r\n      <mat-toolbar-row *ngFor=\"let suborder of subordersDrinks\" style=\"margin-bottom: 20px;overflow-x: scroll;overflow-y: hidden;\">\r\n\r\n        <div style=\"display: contents;\">\r\n\r\n          <div style=\"display: contents;\">\r\n            <mat-card style=\"margin-right: 1rem;  cursor: pointer;\" [ngStyle]=\"{'background-color': 'yellow'}\" (click)=\"setDrinkSuborderDelivered(suborder?.order_id, suborder?._id)\">\r\n              Drink del tavolo {{getTavoloDelSuborder(suborder?.order_id)?.table_number}}\r\n            </mat-card>\r\n          </div>\r\n        </div>\r\n      </mat-toolbar-row>\r\n    </mat-toolbar>\r\n  </mat-card-content>\r\n</mat-card>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/barman-stats/barman-stats.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/barman-stats/barman-stats.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\n    \n    <ng-container matColumnDef=\"nome\">\n        <th mat-header-cell *matHeaderCellDef> Nome del barman </th>\n        <td mat-cell *matCellDef=\"let barman\"> {{barman?.barman_name}} {{barman?.barman_surname}} </td>\n    </ng-container>\n    \n    <ng-container matColumnDef=\"valore\">\n        <th mat-header-cell *matHeaderCellDef> Numero drink preparati </th>\n        <td mat-cell *matCellDef=\"let barman\"> {{barman?.nrDrink}}</td>\n    </ng-container>\n  \n    <tr mat-header-row *matHeaderRowDef=\"['nome', 'valore']\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: ['nome', 'valore'];\"></tr>\n  </table>\n  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/cook-stats/cook-stats.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/cook-stats/cook-stats.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\r\n    \r\n  <ng-container matColumnDef=\"nome\">\r\n      <th mat-header-cell *matHeaderCellDef> Nome del cuoco </th>\r\n      <td mat-cell *matCellDef=\"let cook\"> {{cook?.cook_name}} {{cook?.cook_surname}} </td>\r\n  </ng-container>\r\n  \r\n  <ng-container matColumnDef=\"valore\">\r\n      <th mat-header-cell *matHeaderCellDef> Numero piatti preparati </th>\r\n      <td mat-cell *matCellDef=\"let cook\"> {{cook?.nrPiatti}} </td>\r\n  </ng-container>\r\n\r\n  <tr mat-header-row *matHeaderRowDef=\"['nome', 'valore']\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: ['nome', 'valore'];\"></tr>\r\n</table>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/drink-stats/drink-stats.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/drink-stats/drink-stats.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\n    \n    <ng-container matColumnDef=\"nome\">\n        <th mat-header-cell *matHeaderCellDef> Nome del drink </th>\n        <td mat-cell *matCellDef=\"let drink\"> {{drink?.drink_name}} </td>\n    </ng-container>\n    \n    <ng-container matColumnDef=\"valore\">\n        <th mat-header-cell *matHeaderCellDef> Numero drink venduti </th>\n        <td mat-cell *matCellDef=\"let drink\"> {{drink?.nrDrink}} </td>\n    </ng-container>\n  \n    <tr mat-header-row *matHeaderRowDef=\"['nome', 'valore']\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: ['nome', 'valore'];\"></tr>\n  </table>\n  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/food-stats/food-stats.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/food-stats/food-stats.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\r\n    \r\n    <ng-container matColumnDef=\"nome\">\r\n        <th mat-header-cell *matHeaderCellDef> Nome del cibo </th>\r\n        <td mat-cell *matCellDef=\"let food\"> {{food?.food_name}} </td>\r\n    </ng-container>\r\n    \r\n    <ng-container matColumnDef=\"valore\">\r\n        <th mat-header-cell *matHeaderCellDef> Quantità venduta </th>\r\n        <td mat-cell *matCellDef=\"let food\"> {{food?.nrfood}} </td>\r\n    </ng-container>\r\n  \r\n    <tr mat-header-row *matHeaderRowDef=\"['nome', 'valore']\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: ['nome', 'valore'];\"></tr>\r\n  </table>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/money-stats/money-stats.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/money-stats/money-stats.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\n    \n    <ng-container matColumnDef=\"clients\">\n        <th mat-header-cell *matHeaderCellDef> Numero clienti </th>\n        <td mat-cell *matCellDef=\"let money\"> {{money?.nrClients}}</td>\n    </ng-container>\n    \n    <ng-container matColumnDef=\"valore\">\n        <th mat-header-cell *matHeaderCellDef> Guadagni della giornata </th>\n        <td mat-cell *matCellDef=\"let money\"> {{money?.soldi}}</td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"['clients', 'valore']\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: ['clients', 'valore'];\"></tr>\n</table>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/stats.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/stats.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<mat-tab-group class=\"stats\">\r\n  <mat-tab label=\"Clienti\">\r\n    <app-money-stats></app-money-stats>\r\n  </mat-tab>\r\n  <mat-tab label=\"Cibi più venduti\">\r\n    <app-food-stats></app-food-stats>\r\n  </mat-tab>\r\n  <mat-tab label=\"Bibite più vendute\">\r\n    <app-drink-stats></app-drink-stats>\r\n  </mat-tab>\r\n  <mat-tab label=\"Camerieri\">\r\n    <app-waiter-stats></app-waiter-stats>\r\n  </mat-tab>\r\n  <mat-tab label=\"Cuochi\">\r\n    <app-cook-stats></app-cook-stats>\r\n  </mat-tab>\r\n  <mat-tab label=\"Baristi\">\r\n    <app-barman-stats></app-barman-stats>\r\n  </mat-tab>\r\n  <!-- <mat-tab label=\"Third\"> Content 3 </mat-tab> -->\r\n</mat-tab-group>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/waiter-stats/waiter-stats.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/waiter-stats/waiter-stats.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <mat-card-header>\r\n    <mat-card-title style=\"font-size: xx-large;\">Tavoli serviti</mat-card-title>\r\n</mat-card-header>\r\n<mat-card-content>\r\n    <mat-toolbar>\r\n            <mat-toolbar-row *ngFor=\"let waiter of waiters\">\r\n                {{waiter?.lastname}}  {{waiter?.firstname}}\r\n            </mat-toolbar-row>\r\n    </mat-toolbar>\r\n</mat-card-content>\r\n -->\r\n\r\n<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\r\n    \r\n    <ng-container matColumnDef=\"nome\">\r\n        <th mat-header-cell *matHeaderCellDef> Nome del cameriere </th>\r\n        <td mat-cell *matCellDef=\"let waiter\"> {{waiter?.waiter_name}} {{waiter?.waiter_surname}} </td>\r\n    </ng-container>\r\n    \r\n    <ng-container matColumnDef=\"valore\">\r\n        <th mat-header-cell *matHeaderCellDef> Numero ordini serviti </th>\r\n        <td mat-cell *matCellDef=\"let waiter\"> {{waiter?.nrOrdini}}</td>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"['nome', 'valore']\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: ['nome', 'valore'];\"></tr>\r\n</table>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/users/users.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/Components/users/users.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<mat-form-field style=\"margin-top: 20px; margin-left: 5%; width: 90%;\">\r\n  <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n</mat-form-field>\r\n\r\n<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" style=\"margin: 20px 5%;width: 90%;\">\r\n\r\n  <ng-container matColumnDef=\"username\">\r\n    <th mat-header-cell *matHeaderCellDef> Username </th>\r\n    <td mat-cell *matCellDef=\"let user\"> {{user?.username}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"name\">\r\n    <th mat-header-cell *matHeaderCellDef> Nome </th>\r\n    <td mat-cell *matCellDef=\"let user\"> {{user.firstname}} {{user?.lastname}}</td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"role\">\r\n    <th mat-header-cell *matHeaderCellDef> Ruolo </th>\r\n    <td mat-cell *matCellDef=\"let user\"> {{user?.role}} </td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"delete\">\r\n    <th mat-header-cell *matHeaderCellDef></th>\r\n    <td mat-cell *matCellDef=\"let user\">\r\n      <button mat-flat-button (click)=\"removeUser(user?._id)\"><i class=\"material-icons\">delete</i></button>\r\n    </td>\r\n  </ng-container>\r\n\r\n  <tr mat-header-row *matHeaderRowDef=\"['username','name','role','delete']\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: ['username','name','role','delete'];\"></tr>\r\n</table>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\r\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/Components/backoffice/backoffice.component.css":
/*!****************************************************************!*\
  !*** ./src/app/Components/backoffice/backoffice.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvYmFja29mZmljZS9iYWNrb2ZmaWNlLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/Components/backoffice/backoffice.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/Components/backoffice/backoffice.component.ts ***!
  \***************************************************************/
/*! exports provided: BackofficeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackofficeComponent", function() { return BackofficeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var BackofficeComponent = /** @class */ (function () {
    function BackofficeComponent() {
    }
    BackofficeComponent.prototype.ngOnInit = function () {
    };
    BackofficeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-backoffice',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./backoffice.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/backoffice/backoffice.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./backoffice.component.css */ "./src/app/Components/backoffice/backoffice.component.css")).default]
        })
    ], BackofficeComponent);
    return BackofficeComponent;
}());



/***/ }),

/***/ "./src/app/Components/dashboard/dashboard.component.css":
/*!**************************************************************!*\
  !*** ./src/app/Components/dashboard/dashboard.component.css ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@-webkit-keyframes color {\r\n  0% {\r\n    background-color: yellow;\r\n  }\r\n  50% {\r\n    background-color: chocolate;\r\n  }\r\n  100% {\r\n    background-color: orangered;\r\n  }\r\n}\r\n\r\n@keyframes color {\r\n  0% {\r\n    background-color: yellow;\r\n  }\r\n  50% {\r\n    background-color: chocolate;\r\n  }\r\n  100% {\r\n    background-color: orangered;\r\n  }\r\n}\r\n\r\n.pulseColor {\r\n    background-color: yellow;\r\n    -webkit-animation-name: color;\r\n            animation-name: color;\r\n    -webkit-animation-duration: 2s;\r\n            animation-duration: 2s;\r\n    -webkit-animation-iteration-count: infinite;\r\n            animation-iteration-count: infinite;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtJQUNFLHdCQUF3QjtFQUMxQjtFQUNBO0lBQ0UsMkJBQTJCO0VBQzdCO0VBQ0E7SUFDRSwyQkFBMkI7RUFDN0I7QUFDRjs7QUFWQTtFQUNFO0lBQ0Usd0JBQXdCO0VBQzFCO0VBQ0E7SUFDRSwyQkFBMkI7RUFDN0I7RUFDQTtJQUNFLDJCQUEyQjtFQUM3QjtBQUNGOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLDZCQUFxQjtZQUFyQixxQkFBcUI7SUFDckIsOEJBQXNCO1lBQXRCLHNCQUFzQjtJQUN0QiwyQ0FBbUM7WUFBbkMsbUNBQW1DO0FBQ3ZDIiwiZmlsZSI6InNyYy9hcHAvQ29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAa2V5ZnJhbWVzIGNvbG9yIHtcclxuICAwJSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XHJcbiAgfVxyXG4gIDUwJSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjaG9jb2xhdGU7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlcmVkO1xyXG4gIH1cclxufVxyXG5cclxuLnB1bHNlQ29sb3Ige1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IGNvbG9yO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAycztcclxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/Components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/Components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Models */ "./src/app/Models/index.ts");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_table_dialog_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dialog-table/dialog-table.component */ "./src/app/Components/dialog-table/dialog-table.component.ts");
/* harmony import */ var _dialog_payment_dialog_payment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dialog-payment/dialog-payment.component */ "./src/app/Components/dialog-payment/dialog-payment.component.ts");








var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(tableHttp, foodHttp, drinkHttp, userHttp, orderHttp, router, tableDialog, snackBar, sio) {
        this.tableHttp = tableHttp;
        this.foodHttp = foodHttp;
        this.drinkHttp = drinkHttp;
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.router = router;
        this.tableDialog = tableDialog;
        this.snackBar = snackBar;
        this.sio = sio;
        this.tables = [];
        this.foodAndDrinkState = [];
        this.users = [];
        this.orders = [];
        this.suborders = [];
        this.COL_SMALL = 3;
        this.COL_MEDIUM = 5;
        this.COL_LARGE = 7;
        this.COL_XSMALL = 2;
        this.Roles = null;
        this.role = this.userHttp.getRole();
        this.user_id = this.userHttp.getUser_id();
        this.Roles = _Models__WEBPACK_IMPORTED_MODULE_2__["Role"];
    }
    DashboardComponent.prototype.getCol = function (windowSize) {
        if (windowSize <= 420) {
            return this.COL_XSMALL;
        }
        else if (windowSize <= 768) {
            return this.COL_SMALL;
        }
        else if (windowSize <= 992) {
            return this.COL_MEDIUM;
        }
        else {
            return this.COL_LARGE;
        }
    };
    DashboardComponent.prototype.filtraTavoli = function () {
        var _this = this;
        this.tables = this.tables.sort(function (x, y) { return x.table_number - y.table_number; });
        if (this.role === this.Roles.cameriere) {
            // un cameriere vede solo i tavoli liberi e quelli da lui gestiti
            this.tables = this.tables.filter(function (x) { return x.available || x.waiter_id === _this.user_id; });
        }
    };
    DashboardComponent.prototype.getTables = function () {
        var _this = this;
        this.tableHttp.getTables().subscribe(function (data) {
            _this.tables = data;
            _this.tables.forEach(function (t) {
                _this.foodAndDrinkState.push({ table_id: t._id, drinks_state: '', foods_state: '' });
            });
            _this.filtraTavoli();
        });
    };
    DashboardComponent.prototype.getOrders = function () {
        var _this = this;
        this.orderHttp.getOrders().subscribe(function (data) {
            var e_1, _a;
            _this.orders = data;
            _this.suborders = [];
            try {
                for (var data_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var order = data_1_1.value;
                    _this.orderHttp.getSubOrders(order._id).subscribe(function (suborders) {
                        var e_2, _a;
                        try {
                            for (var suborders_1 = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborders)), suborders_1_1 = suborders_1.next(); !suborders_1_1.done; suborders_1_1 = suborders_1.next()) {
                                var suborder = suborders_1_1.value;
                                _this.suborders.push(suborder);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (suborders_1_1 && !suborders_1_1.done && (_a = suborders_1.return)) _a.call(suborders_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nuoviOrdini = false;
        this.breakpoint = this.getCol(window.innerWidth);
        this.getOrders();
        if (this.role === this.Roles.cassa) {
            this.userHttp.getUsers().subscribe(function (users) {
                _this.users = users;
            });
        }
        if (this.role === this.Roles.cameriere || this.role === this.Roles.cassa) {
            this.userHttp.getCurrentUser().subscribe(function (user) {
                _this.user = user;
            });
            this.getTables();
            this.sio.modified_table().subscribe(function (table) {
                if (table) {
                    var index = _this.tables.findIndex(function (x) { return x._id === table._id; });
                    if (index === -1) {
                        _this.tables.push(table);
                    }
                    else {
                        _this.tables[index] = table;
                    }
                    _this.filtraTavoli();
                }
                else {
                    _this.getTables();
                }
            });
            this.sio.order_deleted().subscribe(function (orderId) {
                var index = _this.tables.findIndex(function (x) { return x.order_id === orderId; });
                _this.tables[index].order_id = null;
                _this.tables[index].waiter_id = null;
                _this.tables[index].available = true;
                _this.tables[index].clients = 0;
            });
            this.sio.modified_suborder().subscribe(function (suborders) {
                var e_3, _a;
                var _loop_1 = function (suborder) {
                    var index = _this.suborders.findIndex(function (x) { return x._id === suborder._id; });
                    if (index !== -1) {
                        _this.suborders[index] = suborder;
                    }
                    else {
                        _this.suborders.push(suborder);
                    }
                    _this.orderHttp.getOrder(suborder.order_id).subscribe(function (order) {
                        var tIndex = _this.tables.findIndex(function (x) { return x._id === order.table_id; });
                        _this.tables[tIndex].order_id = suborder.order_id;
                        _this.getSuborderStateFoods(suborder.order_id, order.table_id);
                        _this.getSuborderStateDrinks(suborder.order_id, order.table_id);
                    });
                };
                try {
                    for (var suborders_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborders), suborders_2_1 = suborders_2.next(); !suborders_2_1.done; suborders_2_1 = suborders_2.next()) {
                        var suborder = suborders_2_1.value;
                        _loop_1(suborder);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (suborders_2_1 && !suborders_2_1.done && (_a = suborders_2.return)) _a.call(suborders_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            });
            this.sio.modified_suborder_food().subscribe(function (data) {
                var index = _this.suborders.findIndex(function (x) { return x._id === data._id; });
                if (index !== -1) {
                    _this.suborders[index] = data;
                }
                else {
                    _this.suborders.push(data);
                }
                _this.getSuborderStateFoods(data.order_id, _this.getTableIdOrdine(data.order_id));
            });
            this.sio.modified_suborder_drink().subscribe(function (data) {
                var index = _this.suborders.findIndex(function (x) { return x._id === data._id; });
                if (index !== -1) {
                    _this.suborders[index] = data;
                }
                else {
                    _this.suborders.push(data);
                }
                _this.getSuborderStateDrinks(data.order_id, _this.getTableIdOrdine(data.order_id));
            });
        }
    };
    DashboardComponent.prototype.getTableIdOrdine = function (order_id) {
        return this.tables.find(function (x) { return x.order_id === order_id; })._id;
    };
    DashboardComponent.prototype.getCameriereDelTavolo = function (waiter_id) {
        var waiter = this.users.find(function (user) { return user._id === waiter_id; });
        if (waiter) {
            return waiter.firstname + ' ' + waiter.lastname;
        }
        else {
            return '';
        }
    };
    DashboardComponent.prototype.getSuborderStateFoods = function (order_id, table_id) {
        var subs = this.suborders.filter(function (x) { return x.ordered_foods.length > 0 && x.order_id === order_id && x.state_foods; });
        subs = subs.sort(function (x, y) { return new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime(); });
        var table = this.foodAndDrinkState.find(function (x) { return x.table_id === table_id; });
        if (subs && subs.length > 0) {
            if (subs[0].state_foods === _Models__WEBPACK_IMPORTED_MODULE_2__["SuborderState"].pronto) {
                console.log("ciaooo");
                this.nuoviOrdini = true;
            }
            table.foods_state = 'Cibo ' + subs[0].state_foods;
            console.log(table.foods_state);
        }
        return table.foods_state;
    };
    DashboardComponent.prototype.getSuborderStateDrinks = function (order_id, table_id) {
        var subs = this.suborders.filter(function (x) { return x.ordered_drinks.length > 0 && x.order_id === order_id; });
        subs = subs.sort(function (x, y) { return new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime(); });
        var table = this.foodAndDrinkState.find(function (x) { return x.table_id === table_id; });
        if (subs && subs.length > 0) {
            if (subs[0].state_drinks === _Models__WEBPACK_IMPORTED_MODULE_2__["SuborderState"].pronto) {
                this.nuoviOrdini = true;
            }
            table.drinks_state = 'Bibite ' + subs[0].state_drinks;
        }
        return table.drinks_state;
    };
    DashboardComponent.prototype.onResize = function (event) {
        this.breakpoint = this.getCol(event.target.innerWidth);
    };
    DashboardComponent.prototype.openTableDialog = function (id, maxseats, table) {
        var dialogRef = this.tableDialog.open(_dialog_table_dialog_table_component__WEBPACK_IMPORTED_MODULE_6__["DialogTableComponent"], {
            data: {
                numeroClienti: 0,
                idCameriere: '',
                table_id: id,
                maxSeats: maxseats,
                minSeats: 0,
                addTable: false
            }
        });
    };
    DashboardComponent.prototype.freeTable = function (tableId, table) {
        this.tableHttp.freeTable(tableId).subscribe(function (res) {
            table = res;
        }, function (err) {
            console.log(err);
        });
    };
    DashboardComponent.prototype.deleteOrder = function (orderId) {
        var _this = this;
        this.orderHttp.deleteOrder(orderId).subscribe(function (data) {
            _this.openSnackBar('Ordine eliminato', 200);
        });
    };
    DashboardComponent.prototype.addTable = function () {
        var dialogRef = this.tableDialog.open(_dialog_table_dialog_table_component__WEBPACK_IMPORTED_MODULE_6__["DialogTableComponent"], {
            data: {
                addTable: true
            }
        });
    };
    DashboardComponent.prototype.deleteTable = function (tableId) {
        this.tableHttp.deleteTable(tableId).subscribe();
    };
    DashboardComponent.prototype.goToOrders = function (tableId) {
        this.router.navigate(['orders/' + tableId]);
    };
    DashboardComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time,
        });
    };
    DashboardComponent.prototype.payment = function (tableId, orderId, liberaTavolo) {
        var _this = this;
        this.tableDialog.open(_dialog_payment_dialog_payment_component__WEBPACK_IMPORTED_MODULE_7__["DialogPaymentComponent"], {
            data: {
                idTable: tableId,
                idOrder: orderId
            }
        }).afterClosed().subscribe(function (res) {
            // this.openSnackBar('Ordine pagato sul tavolo n. ' + res.table_number, 2000);
            if (liberaTavolo) {
                _this.freeTable(res._id, res);
            }
        }, function (err) {
            _this.openSnackBar('Errore pagamento', 2000);
        });
    };
    DashboardComponent.ctorParameters = function () { return [
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["TableService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["FoodService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["DrinkService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["OrderService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["SocketIOService"] }
    ]; };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dashboard/dashboard.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dashboard.component.css */ "./src/app/Components/dashboard/dashboard.component.css")).default]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/Components/dialog-payment/dialog-payment.component.css":
/*!************************************************************************!*\
  !*** ./src/app/Components/dialog-payment/dialog-payment.component.css ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvZGlhbG9nLXBheW1lbnQvZGlhbG9nLXBheW1lbnQuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/dialog-payment/dialog-payment.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/Components/dialog-payment/dialog-payment.component.ts ***!
  \***********************************************************************/
/*! exports provided: DialogPaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogPaymentComponent", function() { return DialogPaymentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");




var DialogPaymentComponent = /** @class */ (function () {
    function DialogPaymentComponent(dialogRef, data, tableHttp, orderHttp) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.tableHttp = tableHttp;
        this.orderHttp = orderHttp;
        this.subOrders = [];
    }
    DialogPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableHttp.getTable(this.data.idTable).subscribe(function (data) {
            _this.table = data;
        }, function (err) {
            console.log(err);
        });
        this.orderHttp.getSubOrders(this.data.idOrder).subscribe(function (data) {
            _this.subOrders = data;
        });
    };
    DialogPaymentComponent.prototype.pay = function () {
        this.orderHttp.pay(this.data.idOrder).subscribe(function (data) { });
    };
    DialogPaymentComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    Object.defineProperty(DialogPaymentComponent.prototype, "total", {
        get: function () {
            var e_1, _a, e_2, _b, e_3, _c;
            var tot = 0;
            try {
                for (var _d = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.subOrders), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var so = _e.value;
                    try {
                        for (var _f = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](so.ordered_foods)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var f = _g.value;
                            tot += f.price * f.quantity;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    try {
                        for (var _h = (e_3 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](so.ordered_drinks)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var d = _j.value;
                            tot += d.price * d.quantity;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return tot;
        },
        enumerable: true,
        configurable: true
    });
    DialogPaymentComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["TableService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["OrderService"] }
    ]; };
    DialogPaymentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dialog-payment',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dialog-payment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dialog-payment/dialog-payment.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dialog-payment.component.css */ "./src/app/Components/dialog-payment/dialog-payment.component.css")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
    ], DialogPaymentComponent);
    return DialogPaymentComponent;
}());



/***/ }),

/***/ "./src/app/Components/dialog-table/dialog-table.component.css":
/*!********************************************************************!*\
  !*** ./src/app/Components/dialog-table/dialog-table.component.css ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvZGlhbG9nLXRhYmxlL2RpYWxvZy10YWJsZS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/Components/dialog-table/dialog-table.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/Components/dialog-table/dialog-table.component.ts ***!
  \*******************************************************************/
/*! exports provided: DialogTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogTableComponent", function() { return DialogTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Services */ "./src/app/Services/index.ts");
/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Models */ "./src/app/Models/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");






var DialogTableComponent = /** @class */ (function () {
    function DialogTableComponent(dialogRef, data, tableHttp, userHttp, orderHttp, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.tableHttp = tableHttp;
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.snackBar = snackBar;
        this.Roles = _Models__WEBPACK_IMPORTED_MODULE_4__["Role"];
        this.waiters = [];
        this.role = this.userHttp.getRole();
    }
    DialogTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.role === this.Roles.cassa) {
            this.userHttp.getUsers().subscribe(function (res) {
                _this.waiters = res.filter(function (x) { return x.role === 'cameriere'; });
            });
        }
    };
    DialogTableComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    DialogTableComponent.prototype.takeTable = function () {
        var _this = this;
        if (!this.idCameriere) {
            this.idCameriere = localStorage.getItem('id');
        }
        this.tableHttp.takeTable(this.data.table_id, this.numeroClienti, this.idCameriere).subscribe(function (data) {
            _this.table = data;
        });
    };
    DialogTableComponent.prototype.addTable = function () {
        var _this = this;
        this.tableHttp.addTable(this.tableNumber, this.maxSeats).subscribe(function (data) {
            _this.table = data;
        });
    };
    DialogTableComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time,
        });
    };
    DialogTableComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["TableService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["OrderService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }
    ]; };
    DialogTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dialog-table',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dialog-table.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/dialog-table/dialog-table.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dialog-table.component.css */ "./src/app/Components/dialog-table/dialog-table.component.css")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
    ], DialogTableComponent);
    return DialogTableComponent;
}());



/***/ }),

/***/ "./src/app/Components/drink/drink.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/drink/drink.component.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvZHJpbmsvZHJpbmsuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/drink/drink.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/drink/drink.component.ts ***!
  \*****************************************************/
/*! exports provided: DrinkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrinkComponent", function() { return DrinkComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");






var DrinkComponent = /** @class */ (function () {
    function DrinkComponent(drinkHttp, router, formBuilder, snackBar, sio) {
        this.drinkHttp = drinkHttp;
        this.router = router;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.sio = sio;
        this.drinks = [];
    }
    DrinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getDrinks();
        this.sio.modified_drink().subscribe(function (drink) {
            if (drink) {
                var index = _this.drinks.findIndex(function (x) { return x._id === drink._id; });
                if (index === -1) {
                    _this.drinks.push(drink);
                }
                else {
                    _this.drinks[index] = drink;
                }
                console.log(_this.drinks);
                // this.drinks = this.drinks.sort((a, b) => a.name.localeCompare(b.name));
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.drinks);
            }
            else {
                _this.getDrinks();
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
            nome: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            categoria: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]
        });
    };
    DrinkComponent.prototype.getDrinks = function () {
        var _this = this;
        this.drinkHttp.getDrinks().subscribe(function (data) {
            _this.drinks = data;
            _this.drinks = _this.drinks.sort(function (a, b) { return a.name.localeCompare(b.name); });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.drinks);
        });
    };
    DrinkComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    DrinkComponent.prototype.updateDrink = function (id, available) {
        var _this = this;
        this.drinkHttp
            .updateDrink(this.drinks.find(function (x) { return x._id === id; }), available)
            .subscribe(function (data) {
            _this.ngOnInit();
        });
    };
    DrinkComponent.prototype.deleteDrink = function (id) {
        var _this = this;
        this.drinkHttp.deleteDrink(id).subscribe(function (data) {
            _this.drinks = _this.drinks.filter(function (x) { return x._id !== id; });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.drinks);
        });
    };
    DrinkComponent.prototype.createDrink = function () {
        var _this = this;
        this.drinkHttp.createDrink(this.drink).subscribe(function (data) {
            _this.drinks.push(data);
            _this.drinks = _this.drinks.sort(function (a, b) { return a.name.localeCompare(b.name); });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.drinks);
        }, function (err) {
            if (err.status === 304) {
                _this.openSnackBar('Bevanda già presente', 2000);
            }
        });
    };
    DrinkComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time
        });
    };
    DrinkComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["DrinkService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["SocketIOService"] }
    ]; };
    DrinkComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-drink",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./drink.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/drink/drink.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./drink.component.css */ "./src/app/Components/drink/drink.component.css")).default]
        })
    ], DrinkComponent);
    return DrinkComponent;
}());



/***/ }),

/***/ "./src/app/Components/food/food.component.css":
/*!****************************************************!*\
  !*** ./src/app/Components/food/food.component.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvZm9vZC9mb29kLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/Components/food/food.component.ts":
/*!***************************************************!*\
  !*** ./src/app/Components/food/food.component.ts ***!
  \***************************************************/
/*! exports provided: FoodComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodComponent", function() { return FoodComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");






var FoodComponent = /** @class */ (function () {
    function FoodComponent(foodHttp, router, formBuilder, snackBar, sio) {
        this.foodHttp = foodHttp;
        this.router = router;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.sio = sio;
        this.foods = [];
    }
    FoodComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getFoods();
        this.sio.modified_food().subscribe(function (food) {
            if (food) {
                var index = _this.foods.findIndex(function (x) { return x._id === food._id; });
                if (index === -1) {
                    _this.foods.push(food);
                }
                else {
                    _this.foods[index] = food;
                }
                _this.foods = _this.foods.sort(function (a, b) { return a.name.localeCompare(b.name); });
                console.log(_this.foods);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.foods);
            }
            else {
                _this.getFoods();
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
    };
    FoodComponent.prototype.getFoods = function () {
        var _this = this;
        this.foodHttp.getFoods().subscribe(function (data) {
            _this.foods = data;
            _this.foods = _this.foods.sort(function (a, b) { return a.name.localeCompare(b.name); });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.foods);
        });
    };
    FoodComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    FoodComponent.prototype.updateFood = function (id, available) {
        var _this = this;
        this.foodHttp.updateFood(this.foods.find(function (x) { return x._id === id; }), available).subscribe(function (data) {
            _this.ngOnInit();
        });
    };
    FoodComponent.prototype.deleteFood = function (id) {
        var _this = this;
        this.foodHttp.deleteFood(id).subscribe(function (data) {
            _this.foods = _this.foods.filter(function (x) { return x._id !== id; });
            _this.foods = _this.foods.sort(function (a, b) { return a.name.localeCompare(b.name); });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.foods);
        });
    };
    FoodComponent.prototype.createFood = function () {
        var _this = this;
        this.foodHttp.createFood(this.food).subscribe(function (data) {
            _this.foods.push(data);
            _this.foods = _this.foods.sort(function (a, b) { return a.name.localeCompare(b.name); });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.foods);
        }, function (err) {
            if (err.status === 304) {
                _this.openSnackBar("Cibo già presente", 2000);
            }
        });
    };
    FoodComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, "chiudi", {
            duration: time
        });
    };
    FoodComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["FoodService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["SocketIOService"] }
    ]; };
    FoodComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-food",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./food.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/food/food.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./food.component.css */ "./src/app/Components/food/food.component.css")).default]
        })
    ], FoodComponent);
    return FoodComponent;
}());



/***/ }),

/***/ "./src/app/Components/index.ts":
/*!*************************************!*\
  !*** ./src/app/Components/index.ts ***!
  \*************************************/
/*! exports provided: OrderComponent, BackofficeComponent, DashboardComponent, LoginComponent, RegisterComponent, NavbarComponent, DialogTableComponent, PreparationQueueComponent, StatsComponent, CookStatsComponent, WaiterStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _backoffice_backoffice_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./backoffice/backoffice.component */ "./src/app/Components/backoffice/backoffice.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BackofficeComponent", function() { return _backoffice_backoffice_component__WEBPACK_IMPORTED_MODULE_1__["BackofficeComponent"]; });

/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/Components/dashboard/dashboard.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"]; });

/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/Components/login/login.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]; });

/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register/register.component */ "./src/app/Components/register/register.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return _register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"]; });

/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/Components/navbar/navbar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__["NavbarComponent"]; });

/* harmony import */ var _dialog_table_dialog_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dialog-table/dialog-table.component */ "./src/app/Components/dialog-table/dialog-table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogTableComponent", function() { return _dialog_table_dialog_table_component__WEBPACK_IMPORTED_MODULE_6__["DialogTableComponent"]; });

/* harmony import */ var _order_order_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./order/order.component */ "./src/app/Components/order/order.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return _order_order_component__WEBPACK_IMPORTED_MODULE_7__["OrderComponent"]; });

/* harmony import */ var _preparation_queue_preparation_queue_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preparation-queue/preparation-queue.component */ "./src/app/Components/preparation-queue/preparation-queue.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreparationQueueComponent", function() { return _preparation_queue_preparation_queue_component__WEBPACK_IMPORTED_MODULE_8__["PreparationQueueComponent"]; });

/* harmony import */ var _stats_stats_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stats/stats.component */ "./src/app/Components/stats/stats.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatsComponent", function() { return _stats_stats_component__WEBPACK_IMPORTED_MODULE_9__["StatsComponent"]; });

/* harmony import */ var _stats_cook_stats_cook_stats_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stats/cook-stats/cook-stats.component */ "./src/app/Components/stats/cook-stats/cook-stats.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookStatsComponent", function() { return _stats_cook_stats_cook_stats_component__WEBPACK_IMPORTED_MODULE_10__["CookStatsComponent"]; });

/* harmony import */ var _stats_waiter_stats_waiter_stats_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stats/waiter-stats/waiter-stats.component */ "./src/app/Components/stats/waiter-stats/waiter-stats.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WaiterStatsComponent", function() { return _stats_waiter_stats_waiter_stats_component__WEBPACK_IMPORTED_MODULE_11__["WaiterStatsComponent"]; });















/***/ }),

/***/ "./src/app/Components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/login/login.component.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");






var LoginComponent = /** @class */ (function () {
    function LoginComponent(userHttp, router, formBuilder, snackBar) {
        this.userHttp = userHttp;
        this.router = router;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.userHttp.login(this.username, btoa(this.password)).subscribe(function (data) {
            localStorage.setItem('id', data._id);
            // localStorage.setItem('role', data.role);
            _this.userHttp.setToken(data.token);
            _this.userHttp.setRefreshToken(data.refresh_token);
            _this.router.navigate(['dashboard']);
        }, function (err) {
            _this.openSnackBar('Email o/e password errati!', 2000);
        });
    };
    LoginComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time,
        });
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }
    ]; };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/login/login.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.css */ "./src/app/Components/login/login.component.css")).default]
        })
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/Components/navbar/navbar.component.css":
/*!********************************************************!*\
  !*** ./src/app/Components/navbar/navbar.component.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/Components/navbar/navbar.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/Components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Models */ "./src/app/Models/index.ts");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Services */ "./src/app/Services/index.ts");





var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, userHttp) {
        this.router = router;
        this.userHttp = userHttp;
        this.Roles = null;
        this.role = '';
        this.userLoggedIn = false;
        this.Roles = _Models__WEBPACK_IMPORTED_MODULE_3__["Role"];
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userHttp.getCurrentUser().subscribe(function (res) {
            _this.user = res;
        });
        this.role = this.userHttp.getRole();
    };
    NavbarComponent.prototype.logout = function () {
        this.userHttp.logout();
    };
    NavbarComponent.prototype.isThatPage = function (name) {
        return this.router.url.indexOf(name) > -1;
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_4__["UserService"] }
    ]; };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./navbar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/navbar/navbar.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./navbar.component.css */ "./src/app/Components/navbar/navbar.component.css")).default]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/Components/order/order.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/order/order.component.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvb3JkZXIvb3JkZXIuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/order/order.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/order/order.component.ts ***!
  \*****************************************************/
/*! exports provided: OrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return OrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Models */ "./src/app/Models/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");






var OrderComponent = /** @class */ (function () {
    function OrderComponent(tableHttp, orderHttp, foodHttp, drinkHttp, router, snackBar, sio) {
        this.tableHttp = tableHttp;
        this.orderHttp = orderHttp;
        this.foodHttp = foodHttp;
        this.drinkHttp = drinkHttp;
        this.router = router;
        this.snackBar = snackBar;
        this.sio = sio;
        this.suborders = [];
        this.categorieCibi = [];
        this.categoriaCibo = '';
        this.categorieBibite = [];
        this.categoriaBibite = '';
        this.orders = [];
        this.foods = [];
        this.cibi = []; // cibi contiene il valore di foods, ma foods viene mofifata quando si applicano i filtri
        this.bevande = [];
        this.drinks = [];
        this.tableId = this.router.url.split('/')[2];
    }
    OrderComponent.prototype.initFoods = function (foods) {
        var e_1, _a;
        this.foods = [];
        try {
            for (var foods_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](foods), foods_1_1 = foods_1.next(); !foods_1_1.done; foods_1_1 = foods_1.next()) {
                var food = foods_1_1.value;
                this.foods.push({
                    _id: food._id,
                    name: food.name,
                    quantita: null,
                    price: food.price,
                    categoria: food.category
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (foods_1_1 && !foods_1_1.done && (_a = foods_1.return)) _a.call(foods_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    OrderComponent.prototype.initDrinks = function (drinks) {
        var e_2, _a;
        this.drinks = [];
        try {
            for (var drinks_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](drinks), drinks_1_1 = drinks_1.next(); !drinks_1_1.done; drinks_1_1 = drinks_1.next()) {
                var drink = drinks_1_1.value;
                this.drinks.push({
                    _id: drink._id,
                    name: drink.name,
                    quantita: null,
                    price: drink.price,
                    categoria: drink.category
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (drinks_1_1 && !drinks_1_1.done && (_a = drinks_1.return)) _a.call(drinks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    OrderComponent.prototype.getFoodsAndDrinks = function () {
        var _this = this;
        this.foodHttp.getFoods().subscribe(function (data2) {
            data2 = data2.filter(function (x) { return x.available; });
            _this.initFoods(data2);
            _this.cibi = _this.foods;
        });
        this.drinkHttp.getDrinks().subscribe(function (data3) {
            data3 = data3.filter(function (x) { return x.available; });
            _this.initDrinks(data3);
            _this.bevande = _this.drinks;
        });
    };
    OrderComponent.prototype.getSuborders = function () {
        var _this = this;
        this.orderHttp.getSubOrders(this.table.order_id).subscribe(function (data) {
            _this.suborders = data;
            _this.foodHttp.getFoods().subscribe(function (data2) {
                var e_3, _a;
                data2 = data2.filter(function (x) { return x.available; });
                _this.initFoods(data2);
                _this.cibi = _this.foods;
                var prevFoods = null;
                var index = -1;
                if (_this.suborders.length > 0) {
                    index = _this.suborders.findIndex(function (x) { return x.state_foods === src_app_Models__WEBPACK_IMPORTED_MODULE_4__["SuborderState"].incoda; });
                    if (index > -1) {
                        prevFoods = _this.suborders[index].ordered_foods;
                        var _loop_1 = function (p) {
                            index = _this.cibi.findIndex(function (x) { return x._id === p.food_id; });
                            _this.cibi[index].quantita = p.quantity;
                        };
                        try {
                            for (var prevFoods_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](prevFoods), prevFoods_1_1 = prevFoods_1.next(); !prevFoods_1_1.done; prevFoods_1_1 = prevFoods_1.next()) {
                                var p = prevFoods_1_1.value;
                                _loop_1(p);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (prevFoods_1_1 && !prevFoods_1_1.done && (_a = prevFoods_1.return)) _a.call(prevFoods_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            });
            _this.drinkHttp.getDrinks().subscribe(function (data3) {
                var e_4, _a;
                data3 = data3.filter(function (x) { return x.available; });
                _this.initDrinks(data3);
                _this.bevande = _this.drinks;
                var prevDrinks = null;
                var index = -1;
                if (_this.suborders.length > 0) {
                    index = _this.suborders.findIndex(function (x) { return x.state_drinks === src_app_Models__WEBPACK_IMPORTED_MODULE_4__["SuborderState"].incoda; });
                    if (index > -1) {
                        prevDrinks = _this.suborders[index].ordered_drinks;
                        var _loop_2 = function (p) {
                            index = _this.bevande.findIndex(function (x) { return x._id === p.drink_id; });
                            _this.bevande[index].quantita = p.quantity;
                        };
                        try {
                            // prevDrinks = prevDrinks.filter(x => x.available);
                            for (var prevDrinks_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](prevDrinks), prevDrinks_1_1 = prevDrinks_1.next(); !prevDrinks_1_1.done; prevDrinks_1_1 = prevDrinks_1.next()) {
                                var p = prevDrinks_1_1.value;
                                _loop_2(p);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (prevDrinks_1_1 && !prevDrinks_1_1.done && (_a = prevDrinks_1.return)) _a.call(prevDrinks_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            });
        });
    };
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableHttp.getTable(this.tableId).subscribe(function (table) {
            _this.table = table;
            if (table.order_id && table.order_id !== null) {
                _this.getSuborders();
            }
            else {
                _this.getFoodsAndDrinks();
            }
        });
        this.foodHttp.getCategories().subscribe(function (data2) {
            _this.categorieCibi = data2;
        });
        this.drinkHttp.getCategories().subscribe(function (data2) {
            _this.categorieBibite = data2;
        });
        // this.sio.modified_food().subscribe(food => {
        //   if (food) {
        //     const index = this.foods.findIndex(x => x._id === food._id);
        //     if (index === -1) {
        //       food.quantita = 0;
        //       this.foods.push(food);
        //     } else {
        //       food.quantita = foods[index].quantita;
        //       this.foods[index] = food;
        //     }
        //   } else {
        //     this.getFoods();
        //   }
        // });
    };
    Object.defineProperty(OrderComponent.prototype, "cibiCarrello", {
        get: function () {
            return this.foods.findIndex(function (x) { return x.quantita > 0; }) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderComponent.prototype, "bibiteCarrello", {
        get: function () {
            return this.drinks.findIndex(function (x) { return x.quantita > 0; }) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderComponent.prototype, "cibiOrdinatiFiltrati", {
        get: function () {
            return this.foods.filter(function (x) { return x.quantita > 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderComponent.prototype, "bibiteOrdinateFiltrate", {
        get: function () {
            return this.drinks.filter(function (x) { return x.quantita > 0; });
        },
        enumerable: true,
        configurable: true
    });
    OrderComponent.prototype.categoriaCiboModificata = function () {
        var _this = this;
        this.foods = this.cibi;
        if (this.categoriaCibo !== '') {
            this.foods = this.foods.filter(function (x) { return x.categoria === _this.categoriaCibo; });
        }
    };
    OrderComponent.prototype.categoriaBibiteModificata = function () {
        var _this = this;
        this.drinks = this.bevande;
        if (this.categoriaBibite !== "") {
            this.drinks = this.drinks.filter(function (x) { return x.categoria === _this.categoriaBibite; });
        }
    };
    OrderComponent.prototype.creaSubOrder = function () {
        var _this = this;
        var orderedFoods = [];
        var orderedDrinks = [];
        var i = 0;
        if (this.table.order_id === null) {
            this.orderHttp.addOrder(this.table._id, this.table.clients, this.table.waiter_id).subscribe(function (order) {
                _this.table.order_id = order._id;
                for (i = 0; i < _this.cibiOrdinatiFiltrati.length; i++) {
                    orderedFoods.push({
                        food_id: _this.cibiOrdinatiFiltrati[i]._id,
                        quantity: _this.cibiOrdinatiFiltrati[i].quantita
                    });
                }
                for (i = 0; i < _this.bibiteOrdinateFiltrate.length; i++) {
                    orderedDrinks.push({
                        drink_id: _this.bibiteOrdinateFiltrate[i]._id,
                        quantity: _this.bibiteOrdinateFiltrate[i].quantita
                    });
                }
                _this.orderHttp.addSuborder(_this.table.order_id, orderedFoods, orderedDrinks).subscribe(function (data) {
                    _this.openSnackBar('Ordine aggiunto', 2000);
                    _this.router.navigate(['']);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            for (i = 0; i < this.cibiOrdinatiFiltrati.length; i++) {
                orderedFoods.push({
                    food_id: this.cibiOrdinatiFiltrati[i]._id,
                    quantity: this.cibiOrdinatiFiltrati[i].quantita
                });
            }
            for (i = 0; i < this.bibiteOrdinateFiltrate.length; i++) {
                orderedDrinks.push({
                    drink_id: this.bibiteOrdinateFiltrate[i]._id,
                    quantity: this.bibiteOrdinateFiltrate[i].quantita
                });
            }
            this.orderHttp.addSuborder(this.table.order_id, orderedFoods, orderedDrinks).subscribe(function (data) {
                _this.openSnackBar('Ordine aggiunto', 2000);
                _this.router.navigate(['']);
            }, function (err) {
                console.log(err);
            });
        }
    };
    OrderComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time
        });
    };
    OrderComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["TableService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["OrderService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["FoodService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["DrinkService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["SocketIOService"] }
    ]; };
    OrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-order",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./order.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/order/order.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./order.component.css */ "./src/app/Components/order/order.component.css")).default]
        })
    ], OrderComponent);
    return OrderComponent;
}());



/***/ }),

/***/ "./src/app/Components/preparation-queue/preparation-queue.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/Components/preparation-queue/preparation-queue.component.css ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-toolbar{\r\n    background-color: transparent !important;\r\n}\r\nbody::-webkit-scrollbar {\r\n  display: none;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9wcmVwYXJhdGlvbi1xdWV1ZS9wcmVwYXJhdGlvbi1xdWV1ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7RUFDRSxhQUFhO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9Db21wb25lbnRzL3ByZXBhcmF0aW9uLXF1ZXVlL3ByZXBhcmF0aW9uLXF1ZXVlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LXRvb2xiYXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG59XHJcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59Il19 */");

/***/ }),

/***/ "./src/app/Components/preparation-queue/preparation-queue.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/Components/preparation-queue/preparation-queue.component.ts ***!
  \*****************************************************************************/
/*! exports provided: PreparationQueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreparationQueueComponent", function() { return PreparationQueueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Models */ "./src/app/Models/index.ts");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Services */ "./src/app/Services/index.ts");





var PreparationQueueComponent = /** @class */ (function () {
    function PreparationQueueComponent(orderHttp, userHttp, snackBar, sio) {
        this.orderHttp = orderHttp;
        this.userHttp = userHttp;
        this.snackBar = snackBar;
        this.sio = sio;
        this.Roles = _Models__WEBPACK_IMPORTED_MODULE_3__["Role"];
        this.suborders = [];
        this.allReady = [];
        this.checkBoxSingleOrder = [];
        this.checkBoxSingleFood = null;
        this.role = userHttp.getRole();
    }
    PreparationQueueComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.role === _Models__WEBPACK_IMPORTED_MODULE_3__["Role"].cuoco) {
            this.getSuborderFoods();
            this.sio.modified_suborder_food().subscribe(function (suborder) {
                if (suborder.ordered_foods.length > 0) {
                    var indexSub = _this.suborders.findIndex(function (x) { return x._id === suborder._id; });
                    var indexFood = _this.suborders[indexSub].ordered_foods.findIndex(function (x) { return x.food_id === suborder.ordered_foods[0].food_id; });
                    _this.suborders[indexSub].ordered_foods = suborder.ordered_foods;
                }
            });
        }
        else if (this.role === _Models__WEBPACK_IMPORTED_MODULE_3__["Role"].barista) {
            this.getSuborderDrinks();
            this.sio.modified_suborder_drink().subscribe(function (suborder) {
                if (suborder.ordered_drinks.length > 0) {
                    var indexSub = _this.suborders.findIndex(function (x) { return x._id === suborder._id; });
                    var indexDrink = _this.suborders[indexSub].ordered_drinks.findIndex(function (x) { return x.drink_id === suborder.ordered_drinks[0].drink_id; });
                    _this.suborders[indexSub].ordered_drinks = suborder.ordered_drinks;
                }
            });
        }
        this.sio.modified_suborder().subscribe(function (suborder) {
            var e_1, _a;
            if (suborder) {
                var _loop_1 = function (s) {
                    if (_this.role === _Models__WEBPACK_IMPORTED_MODULE_3__["Role"].cuoco && s.ordered_foods.length === 0) {
                        s = null;
                    }
                    if (_this.role === _Models__WEBPACK_IMPORTED_MODULE_3__["Role"].barista && s.ordered_drinks.length === 0) {
                        s = null;
                    }
                    if (s) {
                        var index = _this.suborders.findIndex(function (x) { return x._id === s._id; });
                        if (index === -1) {
                            _this.suborders.push(s);
                        }
                        else {
                            _this.suborders[index] = s;
                        }
                    }
                };
                try {
                    for (var suborder_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborder), suborder_1_1 = suborder_1.next(); !suborder_1_1.done; suborder_1_1 = suborder_1.next()) {
                        var s = suborder_1_1.value;
                        _loop_1(s);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (suborder_1_1 && !suborder_1_1.done && (_a = suborder_1.return)) _a.call(suborder_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                if (_this.role === _Models__WEBPACK_IMPORTED_MODULE_3__["Role"].cuoco) {
                    _this.getSuborderFoods();
                }
                else if (_this.role === _Models__WEBPACK_IMPORTED_MODULE_3__["Role"].barista) {
                    _this.getSuborderDrinks();
                }
            }
        });
    };
    PreparationQueueComponent.prototype.getSuborderFoods = function () {
        var _this = this;
        this.orderHttp.getSuborderFoods().subscribe(function (data) {
            _this.suborders = data.filter(function (x) { return x.ordered_foods.length > 0; });
            console.log(_this.suborders);
        });
    };
    PreparationQueueComponent.prototype.getSuborderDrinks = function () {
        var _this = this;
        this.orderHttp.getSuborderDrinks().subscribe(function (data) {
            _this.suborders = data.filter(function (x) { return x.ordered_drinks.length > 0; });
        });
    };
    PreparationQueueComponent.prototype.setFoodReady = function (order_id, suborder_id, food_id, ready) {
        this.orderHttp.setFoodReady(food_id, order_id, suborder_id, ready).subscribe(function (data) {
        });
    };
    PreparationQueueComponent.prototype.setDrinkReady = function (order_id, suborder_id, drink_id, ready) {
        this.orderHttp.setDrinkReady(drink_id, order_id, suborder_id, ready).subscribe(function (data) {
        });
    };
    PreparationQueueComponent.prototype.setAllFoodsReady = function (order_id, suborder_id, food_id, ready) {
        var _this = this;
        this.orderHttp.setAllFoodsReady(order_id, suborder_id).subscribe(function (data) {
            var index = _this.suborders.findIndex(function (x) { return x._id === suborder_id; });
            if (index > -1) {
                _this.suborders.splice(index, 1);
            }
        });
    };
    PreparationQueueComponent.prototype.setAllDrinksReady = function (order_id, suborder_id, drink_id, ready) {
        var _this = this;
        this.orderHttp.setAllDrinksReady(order_id, suborder_id).subscribe(function (data) {
            var index = _this.suborders.findIndex(function (x) { return x._id === suborder_id; });
            if (index > -1) {
                _this.suborders.splice(index, 1);
            }
        });
    };
    PreparationQueueComponent.prototype.isAllSetToReadyFood = function (suborder) {
        return suborder.ordered_foods.findIndex(function (x) { return x.prepared_by === null; }) === -1;
    };
    PreparationQueueComponent.prototype.isAllSetToReadyDrink = function (suborder) {
        return suborder.ordered_drinks.findIndex(function (x) { return x.prepared_by === null; }) === -1;
    };
    PreparationQueueComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time,
        });
    };
    PreparationQueueComponent.ctorParameters = function () { return [
        { type: _Services__WEBPACK_IMPORTED_MODULE_4__["OrderService"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"] },
        { type: _Services__WEBPACK_IMPORTED_MODULE_4__["SocketIOService"] }
    ]; };
    PreparationQueueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-preparation-queue',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./preparation-queue.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/preparation-queue/preparation-queue.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./preparation-queue.component.css */ "./src/app/Components/preparation-queue/preparation-queue.component.css")).default]
        })
    ], PreparationQueueComponent);
    return PreparationQueueComponent;
}());



/***/ }),

/***/ "./src/app/Components/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/Components/register/register.component.css ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/Components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(http, formBuilder, snackBar, router) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.router = router;
        this.roles = ['cassa', 'cameriere', 'cuoco', 'barista'];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            lastname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            role: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.http.register(this.username, this.firstname, this.lastname, this.role.toLowerCase(), btoa(this.password)).subscribe(function (data) {
            _this.openSnackBar(data.username + ' con ruolo ' + data.role + ' registrato', 2000);
            _this.registerForm.reset();
        }, function (err) {
            if (err.status === 304) {
                _this.openSnackBar('Utente già registrato', 2000);
            }
            else if (err.status === 401) {
                _this.openSnackBar('Non autorizzato', 2000);
            }
        });
    };
    RegisterComponent.prototype.openSnackBar = function (message, time) {
        this.snackBar.open(message, 'chiudi', {
            duration: time,
        });
    };
    RegisterComponent.ctorParameters = function () { return [
        { type: _Services__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./register.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/register/register.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./register.component.css */ "./src/app/Components/register/register.component.css")).default]
        })
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/Components/serve-queue/serve-queue.component.css":
/*!******************************************************************!*\
  !*** ./src/app/Components/serve-queue/serve-queue.component.css ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-toolbar{\r\n    background-color: transparent !important;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zZXJ2ZS1xdWV1ZS9zZXJ2ZS1xdWV1ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksd0NBQXdDO0FBQzVDIiwiZmlsZSI6InNyYy9hcHAvQ29tcG9uZW50cy9zZXJ2ZS1xdWV1ZS9zZXJ2ZS1xdWV1ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC10b29sYmFye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/Components/serve-queue/serve-queue.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/Components/serve-queue/serve-queue.component.ts ***!
  \*****************************************************************/
/*! exports provided: ServeQueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServeQueueComponent", function() { return ServeQueueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");



var ServeQueueComponent = /** @class */ (function () {
    function ServeQueueComponent(orderHttp, tableHttp, userHttp, sio) {
        this.orderHttp = orderHttp;
        this.tableHttp = tableHttp;
        this.userHttp = userHttp;
        this.sio = sio;
        this.suborders = [];
        this.subordersDrinks = [];
        this.tables = [];
        this.orders = [];
    }
    ServeQueueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getReadySuborderFoods();
        this.getReadySuborderDrinks();
        this.sio.modified_suborder().subscribe(function (suborder) {
            _this.getReadySuborderFoods();
            _this.getReadySuborderDrinks();
        });
        this.orderHttp.getOrders().subscribe(function (ordini) { return _this.orders = ordini; });
    };
    ServeQueueComponent.prototype.getReadySuborderFoods = function () {
        var _this = this;
        this.suborders = [];
        this.orderHttp.getReadySuborderFoods().subscribe(function (sottoordini) {
            _this.userHttp.getCurrentUser().subscribe(function (utente_attuale) {
                var e_1, _a;
                var _loop_1 = function (subordine) {
                    _this.orderHttp.getOrder(subordine.order_id).subscribe(function (ordine_attuale) {
                        if (subordine.state_foods === 'Pronto' && utente_attuale._id === ordine_attuale.waiter_id) {
                            _this.suborders.push(subordine);
                            _this.tableHttp.getTable(ordine_attuale.table_id).subscribe(function (tavolo) { return _this.tables.push(tavolo); });
                        }
                    });
                };
                try {
                    for (var sottoordini_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](sottoordini), sottoordini_1_1 = sottoordini_1.next(); !sottoordini_1_1.done; sottoordini_1_1 = sottoordini_1.next()) {
                        var subordine = sottoordini_1_1.value;
                        _loop_1(subordine);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (sottoordini_1_1 && !sottoordini_1_1.done && (_a = sottoordini_1.return)) _a.call(sottoordini_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
    };
    ServeQueueComponent.prototype.getReadySuborderDrinks = function () {
        var _this = this;
        this.subordersDrinks = [];
        this.orderHttp.getReadySuborderDrinks().subscribe(function (sottoordini) {
            _this.userHttp.getCurrentUser().subscribe(function (utente_attuale) {
                var e_2, _a;
                var _loop_2 = function (subordine) {
                    _this.orderHttp.getOrder(subordine.order_id).subscribe(function (ordine_attuale) {
                        if (subordine.state_drinks === 'Pronto' && utente_attuale._id === ordine_attuale.waiter_id) {
                            _this.subordersDrinks.push(subordine);
                            _this.tableHttp.getTable(ordine_attuale.table_id).subscribe(function (tavolo) { return _this.tables.push(tavolo); });
                        }
                    });
                };
                try {
                    for (var sottoordini_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](sottoordini), sottoordini_2_1 = sottoordini_2.next(); !sottoordini_2_1.done; sottoordini_2_1 = sottoordini_2.next()) {
                        var subordine = sottoordini_2_1.value;
                        _loop_2(subordine);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (sottoordini_2_1 && !sottoordini_2_1.done && (_a = sottoordini_2.return)) _a.call(sottoordini_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        });
    };
    ServeQueueComponent.prototype.setSuborderDelivered = function (order_id, suborder_id) {
        this.orderHttp.setFoodSuborderDelivered(order_id, suborder_id).subscribe(function (data) {
        });
    };
    ServeQueueComponent.prototype.setDrinkSuborderDelivered = function (order_id, suborder_id) {
        this.orderHttp.setDrinkSuborderDelivered(order_id, suborder_id).subscribe(function (data) {
        });
    };
    ServeQueueComponent.prototype.getTavoloDelSuborder = function (order_id) {
        return this.tables.find(function (tavolo) { return tavolo.order_id === order_id; });
    };
    ServeQueueComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["OrderService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["TableService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["SocketIOService"] }
    ]; };
    ServeQueueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-serve-queue',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./serve-queue.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/serve-queue/serve-queue.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./serve-queue.component.css */ "./src/app/Components/serve-queue/serve-queue.component.css")).default]
        })
    ], ServeQueueComponent);
    return ServeQueueComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/barman-stats/barman-stats.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/Components/stats/barman-stats/barman-stats.component.css ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("th.mat-header-cell {\r\n    text-align: center !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9iYXJtYW4tc3RhdHMvYmFybWFuLXN0YXRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw2QkFBNkI7RUFDL0IiLCJmaWxlIjoic3JjL2FwcC9Db21wb25lbnRzL3N0YXRzL2Jhcm1hbi1zdGF0cy9iYXJtYW4tc3RhdHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRoLm1hdC1oZWFkZXItY2VsbCB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICB9Il19 */");

/***/ }),

/***/ "./src/app/Components/stats/barman-stats/barman-stats.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Components/stats/barman-stats/barman-stats.component.ts ***!
  \*************************************************************************/
/*! exports provided: BarmanStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarmanStatsComponent", function() { return BarmanStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Models */ "./src/app/Models/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");





var BarmanStatsComponent = /** @class */ (function () {
    function BarmanStatsComponent(userHttp, orderHttp) {
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.barmans = [];
        this.barmanStats = [];
    }
    BarmanStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userHttp.getUsers().subscribe(function (users) {
            _this.barmans = users.filter(function (x) { return x.role === src_app_Models__WEBPACK_IMPORTED_MODULE_2__["Role"].barista; });
            _this.orderHttp.getAllSuborders().subscribe(function (suborders) {
                var e_1, _a, e_2, _b, e_3, _c;
                try {
                    for (var _d = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](_this.barmans), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var barman = _e.value;
                        var numeroDrink = 0;
                        try {
                            for (var suborders_1 = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborders)), suborders_1_1 = suborders_1.next(); !suborders_1_1.done; suborders_1_1 = suborders_1.next()) {
                                var suborder = suborders_1_1.value;
                                try {
                                    for (var _f = (e_3 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborder.ordered_drinks)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var drink = _g.value;
                                        if (drink.prepared_by === barman._id) {
                                            numeroDrink += drink.quantity;
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (suborders_1_1 && !suborders_1_1.done && (_b = suborders_1.return)) _b.call(suborders_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        _this.barmanStats.push({ nrDrink: numeroDrink, barman_id: barman._id, barman_name: barman.firstname, barman_surname: barman.lastname });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.barmanStats);
            });
        });
    };
    BarmanStatsComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_4__["OrderService"] }
    ]; };
    BarmanStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-barman-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./barman-stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/barman-stats/barman-stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./barman-stats.component.css */ "./src/app/Components/stats/barman-stats/barman-stats.component.css")).default]
        })
    ], BarmanStatsComponent);
    return BarmanStatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/cook-stats/cook-stats.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/Components/stats/cook-stats/cook-stats.component.css ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("th.mat-header-cell {\r\n    text-align: center !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9jb29rLXN0YXRzL2Nvb2stc3RhdHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDZCQUE2QjtFQUMvQiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvc3RhdHMvY29vay1zdGF0cy9jb29rLXN0YXRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0aC5tYXQtaGVhZGVyLWNlbGwge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "./src/app/Components/stats/cook-stats/cook-stats.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/Components/stats/cook-stats/cook-stats.component.ts ***!
  \*********************************************************************/
/*! exports provided: CookStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookStatsComponent", function() { return CookStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var src_app_Models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Models */ "./src/app/Models/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var CookStatsComponent = /** @class */ (function () {
    function CookStatsComponent(userHttp, orderHttp) {
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.chefs = [];
        this.cookstats = [];
    }
    CookStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userHttp.getUsers().subscribe(function (users) {
            _this.chefs = users.filter(function (x) { return x.role === src_app_Models__WEBPACK_IMPORTED_MODULE_3__["Role"].cuoco; });
            _this.orderHttp.getAllSuborders().subscribe(function (suborders) {
                var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
                var ordered_foods = [];
                try {
                    for (var suborders_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborders), suborders_1_1 = suborders_1.next(); !suborders_1_1.done; suborders_1_1 = suborders_1.next()) {
                        var s = suborders_1_1.value;
                        try {
                            for (var _e = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](s.ordered_foods)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var f = _f.value;
                                ordered_foods.push(f);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (suborders_1_1 && !suborders_1_1.done && (_a = suborders_1.return)) _a.call(suborders_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _g = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](_this.chefs), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var cook = _h.value;
                        var nrPiatti = 0;
                        try {
                            for (var ordered_foods_1 = (e_4 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](ordered_foods)), ordered_foods_1_1 = ordered_foods_1.next(); !ordered_foods_1_1.done; ordered_foods_1_1 = ordered_foods_1.next()) {
                                var o = ordered_foods_1_1.value;
                                if (o.prepared_by === cook._id) {
                                    nrPiatti += o.quantity;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (ordered_foods_1_1 && !ordered_foods_1_1.done && (_d = ordered_foods_1.return)) _d.call(ordered_foods_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        _this.cookstats.push({ nrPiatti: nrPiatti, cook_id: cook._id, cook_name: cook.firstname, cook_surname: cook.lastname });
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.cookstats);
            });
        });
    };
    CookStatsComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["OrderService"] }
    ]; };
    CookStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cook-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./cook-stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/cook-stats/cook-stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./cook-stats.component.css */ "./src/app/Components/stats/cook-stats/cook-stats.component.css")).default]
        })
    ], CookStatsComponent);
    return CookStatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/drink-stats/drink-stats.component.css":
/*!************************************************************************!*\
  !*** ./src/app/Components/stats/drink-stats/drink-stats.component.css ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("th.mat-header-cell {\r\n    text-align: center !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9kcmluay1zdGF0cy9kcmluay1zdGF0cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksNkJBQTZCO0VBQy9CIiwiZmlsZSI6InNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9kcmluay1zdGF0cy9kcmluay1zdGF0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGgubWF0LWhlYWRlci1jZWxsIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "./src/app/Components/stats/drink-stats/drink-stats.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/Components/stats/drink-stats/drink-stats.component.ts ***!
  \***********************************************************************/
/*! exports provided: DrinkStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrinkStatsComponent", function() { return DrinkStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");




var DrinkStatsComponent = /** @class */ (function () {
    function DrinkStatsComponent(userHttp, orderHttp, drinkHttp) {
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.drinkHttp = drinkHttp;
        this.drinks = [];
        this.drinkStats = [];
    }
    DrinkStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drinkHttp.getDrinks().subscribe(function (users) {
            _this.drinks = users;
            _this.orderHttp.getAllSuborders().subscribe(function (suborders) {
                var e_1, _a, e_2, _b, e_3, _c;
                try {
                    for (var _d = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](_this.drinks), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var drink = _e.value;
                        var numeroDrink = 0;
                        try {
                            for (var suborders_1 = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborders)), suborders_1_1 = suborders_1.next(); !suborders_1_1.done; suborders_1_1 = suborders_1.next()) {
                                var suborder = suborders_1_1.value;
                                try {
                                    for (var _f = (e_3 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborder.ordered_drinks)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var bevanda = _g.value;
                                        if (bevanda.drink_id === drink._id) {
                                            numeroDrink += bevanda.quantity;
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (suborders_1_1 && !suborders_1_1.done && (_b = suborders_1.return)) _b.call(suborders_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        _this.drinkStats.push({ nrDrink: numeroDrink, drink_id: drink._id, drink_name: drink.name });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.drinkStats);
                _this.drinkStats.sort(function (a, b) { return b.nrDrink - a.nrDrink; });
            });
        });
    };
    DrinkStatsComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["OrderService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["DrinkService"] }
    ]; };
    DrinkStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-drink-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./drink-stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/drink-stats/drink-stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./drink-stats.component.css */ "./src/app/Components/stats/drink-stats/drink-stats.component.css")).default]
        })
    ], DrinkStatsComponent);
    return DrinkStatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/food-stats/food-stats.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/Components/stats/food-stats/food-stats.component.css ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("th.mat-header-cell {\r\n    text-align: center !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9mb29kLXN0YXRzL2Zvb2Qtc3RhdHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDZCQUE2QjtFQUMvQiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvc3RhdHMvZm9vZC1zdGF0cy9mb29kLXN0YXRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0aC5tYXQtaGVhZGVyLWNlbGwge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "./src/app/Components/stats/food-stats/food-stats.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/Components/stats/food-stats/food-stats.component.ts ***!
  \*********************************************************************/
/*! exports provided: FoodStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodStatsComponent", function() { return FoodStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");




var FoodStatsComponent = /** @class */ (function () {
    function FoodStatsComponent(userHttp, orderHttp, foodHttp) {
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.foodHttp = foodHttp;
        this.foods = [];
        this.foodStats = [];
    }
    FoodStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.foodHttp.getFoods().subscribe(function (users) {
            _this.foods = users;
            _this.orderHttp.getAllSuborders().subscribe(function (suborders) {
                var e_1, _a, e_2, _b, e_3, _c;
                try {
                    for (var _d = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](_this.foods), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var food = _e.value;
                        var numeroFood = 0;
                        try {
                            for (var suborders_1 = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborders)), suborders_1_1 = suborders_1.next(); !suborders_1_1.done; suborders_1_1 = suborders_1.next()) {
                                var suborder = suborders_1_1.value;
                                try {
                                    for (var _f = (e_3 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](suborder.ordered_foods)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var cibo = _g.value;
                                        if (cibo.food_id === food._id) {
                                            numeroFood += cibo.quantity;
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (suborders_1_1 && !suborders_1_1.done && (_b = suborders_1.return)) _b.call(suborders_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        _this.foodStats.push({ nrfood: numeroFood, food_id: food._id, food_name: food.name });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.foodStats.sort(function (a, b) { return b.nrfood - a.nrfood; });
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.foodStats);
            });
        });
    };
    FoodStatsComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["OrderService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_3__["FoodService"] }
    ]; };
    FoodStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-food-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./food-stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/food-stats/food-stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./food-stats.component.css */ "./src/app/Components/stats/food-stats/food-stats.component.css")).default]
        })
    ], FoodStatsComponent);
    return FoodStatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/money-stats/money-stats.component.css":
/*!************************************************************************!*\
  !*** ./src/app/Components/stats/money-stats/money-stats.component.css ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("th.mat-header-cell {\r\n    text-align: center !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9tb25leS1zdGF0cy9tb25leS1zdGF0cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksNkJBQTZCO0VBQy9CIiwiZmlsZSI6InNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy9tb25leS1zdGF0cy9tb25leS1zdGF0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGgubWF0LWhlYWRlci1jZWxsIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "./src/app/Components/stats/money-stats/money-stats.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/Components/stats/money-stats/money-stats.component.ts ***!
  \***********************************************************************/
/*! exports provided: MoneyStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoneyStatsComponent", function() { return MoneyStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");




var MoneyStatsComponent = /** @class */ (function () {
    function MoneyStatsComponent(orderHttp) {
        this.orderHttp = orderHttp;
        this.moneyStats = [];
    }
    MoneyStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderHttp.getOrders().subscribe(function (orders) {
            var soldi = 0;
            var clienti = 0;
            orders.forEach(function (x) { return clienti += x.clients; });
            orders.forEach(function (x) { return soldi += x.amount; });
            _this.moneyStats.push({ soldi: soldi, nrClients: clienti });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.moneyStats);
        });
    };
    MoneyStatsComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["OrderService"] }
    ]; };
    MoneyStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-money-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./money-stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/money-stats/money-stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./money-stats.component.css */ "./src/app/Components/stats/money-stats/money-stats.component.css")).default]
        })
    ], MoneyStatsComponent);
    return MoneyStatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/stats.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/stats/stats.component.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvc3RhdHMvc3RhdHMuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/stats/stats.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/stats/stats.component.ts ***!
  \*****************************************************/
/*! exports provided: StatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsComponent", function() { return StatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var StatsComponent = /** @class */ (function () {
    function StatsComponent() {
    }
    StatsComponent.prototype.ngOnInit = function () {
    };
    StatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./stats.component.css */ "./src/app/Components/stats/stats.component.css")).default]
        })
    ], StatsComponent);
    return StatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/stats/waiter-stats/waiter-stats.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/Components/stats/waiter-stats/waiter-stats.component.css ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("th.mat-header-cell {\r\n    text-align: center !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9zdGF0cy93YWl0ZXItc3RhdHMvd2FpdGVyLXN0YXRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw2QkFBNkI7RUFDL0IiLCJmaWxlIjoic3JjL2FwcC9Db21wb25lbnRzL3N0YXRzL3dhaXRlci1zdGF0cy93YWl0ZXItc3RhdHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRoLm1hdC1oZWFkZXItY2VsbCB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICB9Il19 */");

/***/ }),

/***/ "./src/app/Components/stats/waiter-stats/waiter-stats.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Components/stats/waiter-stats/waiter-stats.component.ts ***!
  \*************************************************************************/
/*! exports provided: WaiterStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterStatsComponent", function() { return WaiterStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var src_app_Models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Models */ "./src/app/Models/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var WaiterStatsComponent = /** @class */ (function () {
    function WaiterStatsComponent(userHttp, orderHttp) {
        this.userHttp = userHttp;
        this.orderHttp = orderHttp;
        this.waiters = [];
        this.waiterStats = [];
    }
    WaiterStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userHttp.getUsers().subscribe(function (users) {
            _this.waiters = users.filter(function (x) { return x.role === src_app_Models__WEBPACK_IMPORTED_MODULE_3__["Role"].cameriere; });
            _this.orderHttp.getOrders().subscribe(function (orders) {
                var e_1, _a, e_2, _b;
                try {
                    for (var _c = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](_this.waiters), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var waiter = _d.value;
                        var numeroOrdini = 0;
                        try {
                            for (var orders_1 = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](orders)), orders_1_1 = orders_1.next(); !orders_1_1.done; orders_1_1 = orders_1.next()) {
                                var order = orders_1_1.value;
                                if (order.waiter_id === waiter._id) {
                                    numeroOrdini++;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (orders_1_1 && !orders_1_1.done && (_b = orders_1.return)) _b.call(orders_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        _this.waiterStats.push({ nrOrdini: numeroOrdini, waiter_id: waiter._id, waiter_name: waiter.firstname, waiter_surname: waiter.lastname });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.waiterStats);
            });
        });
    };
    WaiterStatsComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["OrderService"] }
    ]; };
    WaiterStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-waiter-stats',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./waiter-stats.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/stats/waiter-stats/waiter-stats.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./waiter-stats.component.css */ "./src/app/Components/stats/waiter-stats/waiter-stats.component.css")).default]
        })
    ], WaiterStatsComponent);
    return WaiterStatsComponent;
}());



/***/ }),

/***/ "./src/app/Components/users/users.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/users/users.component.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvdXNlcnMvdXNlcnMuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/Components/users/users.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/users/users.component.ts ***!
  \*****************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var UsersComponent = /** @class */ (function () {
    function UsersComponent(userHttp, sio, router) {
        this.userHttp = userHttp;
        this.sio = sio;
        this.router = router;
        this.users = [];
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUsers();
        this.sio.modified_user().subscribe(function (user) {
            if (user) {
                var index = _this.users.findIndex(function (x) { return x._id === user._id; });
                if (index === -1) {
                    _this.users.push(user);
                }
                else {
                    _this.users[index] = user;
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.users.filter(function (x) { return x.delation_date === null; }));
            }
            else {
                _this.getUsers();
            }
        });
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.userHttp.getUsers().subscribe(function (data) {
            _this.users = data.filter(function (x) { return x.delation_date === null; });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](data.filter(function (x) { return x.delation_date === null; }));
        }, function (err) {
            console.log(err);
        });
    };
    UsersComponent.prototype.removeUser = function (id) {
        var _this = this;
        this.userHttp.deleteUser(id).subscribe(function (data) {
            _this.users = _this.users.filter(function (x) { return x._id !== id; });
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.users);
        });
    };
    UsersComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    UsersComponent.ctorParameters = function () { return [
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: src_app_Services__WEBPACK_IMPORTED_MODULE_2__["SocketIOService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-users",
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./users.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/Components/users/users.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./users.component.css */ "./src/app/Components/users/users.component.css")).default]
        })
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/Models/drink.ts":
/*!*********************************!*\
  !*** ./src/app/Models/drink.ts ***!
  \*********************************/
/*! exports provided: DrinkModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrinkModel", function() { return DrinkModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var DrinkModel = /** @class */ (function () {
    function DrinkModel() {
    }
    return DrinkModel;
}());



/***/ }),

/***/ "./src/app/Models/food.ts":
/*!********************************!*\
  !*** ./src/app/Models/food.ts ***!
  \********************************/
/*! exports provided: FoodModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodModel", function() { return FoodModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var FoodModel = /** @class */ (function () {
    function FoodModel() {
    }
    return FoodModel;
}());



/***/ }),

/***/ "./src/app/Models/index.ts":
/*!*********************************!*\
  !*** ./src/app/Models/index.ts ***!
  \*********************************/
/*! exports provided: DrinkModel, FoodModel, OrderModel, SuborderModel, SuborderState, TableModel, UserModel, Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _drink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drink */ "./src/app/Models/drink.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrinkModel", function() { return _drink__WEBPACK_IMPORTED_MODULE_1__["DrinkModel"]; });

/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./food */ "./src/app/Models/food.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoodModel", function() { return _food__WEBPACK_IMPORTED_MODULE_2__["FoodModel"]; });

/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order */ "./src/app/Models/order.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderModel", function() { return _order__WEBPACK_IMPORTED_MODULE_3__["OrderModel"]; });

/* harmony import */ var _suborder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./suborder */ "./src/app/Models/suborder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuborderModel", function() { return _suborder__WEBPACK_IMPORTED_MODULE_4__["SuborderModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuborderState", function() { return _suborder__WEBPACK_IMPORTED_MODULE_4__["SuborderState"]; });

/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table */ "./src/app/Models/table.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableModel", function() { return _table__WEBPACK_IMPORTED_MODULE_5__["TableModel"]; });

/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user */ "./src/app/Models/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserModel", function() { return _user__WEBPACK_IMPORTED_MODULE_6__["UserModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return _user__WEBPACK_IMPORTED_MODULE_6__["Role"]; });










/***/ }),

/***/ "./src/app/Models/order.ts":
/*!*********************************!*\
  !*** ./src/app/Models/order.ts ***!
  \*********************************/
/*! exports provided: OrderModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderModel", function() { return OrderModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    return OrderModel;
}());



/***/ }),

/***/ "./src/app/Models/suborder.ts":
/*!************************************!*\
  !*** ./src/app/Models/suborder.ts ***!
  \************************************/
/*! exports provided: SuborderModel, SuborderState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuborderModel", function() { return SuborderModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuborderState", function() { return SuborderState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var SuborderModel = /** @class */ (function () {
    function SuborderModel() {
    }
    return SuborderModel;
}());

var SuborderState;
(function (SuborderState) {
    SuborderState["incoda"] = "In coda";
    SuborderState["inpreparazione"] = "In preparazione";
    SuborderState["pronto"] = "Pronto";
    SuborderState["servito"] = "Servito";
})(SuborderState || (SuborderState = {}));


/***/ }),

/***/ "./src/app/Models/table.ts":
/*!*********************************!*\
  !*** ./src/app/Models/table.ts ***!
  \*********************************/
/*! exports provided: TableModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableModel", function() { return TableModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var TableModel = /** @class */ (function () {
    function TableModel() {
    }
    return TableModel;
}());



/***/ }),

/***/ "./src/app/Models/user.ts":
/*!********************************!*\
  !*** ./src/app/Models/user.ts ***!
  \********************************/
/*! exports provided: UserModel, Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModel", function() { return UserModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    return UserModel;
}());

var Role;
(function (Role) {
    Role["cassa"] = "cassa";
    Role["cameriere"] = "cameriere";
    Role["cuoco"] = "cuoco";
    Role["barista"] = "barista";
})(Role || (Role = {}));


/***/ }),

/***/ "./src/app/Services/auth-guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/Services/auth-guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/Services/user.service.ts");




var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(userHttp, router) {
        this.userHttp = userHttp;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (!this.userHttp.isAuthenticated() && this.userHttp.isRefreshTokenExpired()) {
            this.router.navigate(['login']);
            // this.userHttp.setEmitter(false);
            return false;
        }
        // this.userHttp.setEmitter(true);
        return true;
    };
    AuthGuardService.ctorParameters = function () { return [
        { type: _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    AuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/Services/drink.service.ts":
/*!*******************************************!*\
  !*** ./src/app/Services/drink.service.ts ***!
  \*******************************************/
/*! exports provided: DrinkService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrinkService", function() { return DrinkService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");




var DrinkService = /** @class */ (function () {
    function DrinkService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl + 'drinks/';
        this.token = localStorage.getItem('token');
    }
    DrinkService.prototype.getDrinks = function () {
        return this.http.get(this.url);
    };
    DrinkService.prototype.getDrink = function (id) {
        return this.http.get(this.url.concat('/' + id));
    };
    DrinkService.prototype.getCategories = function () {
        return this.http.get(this.url.concat('categories'));
    };
    DrinkService.prototype.createDrink = function (drink) {
        var body = {
            name: drink.name,
            price: drink.price,
            time: drink.time,
            category: drink.category,
            available: drink.available
        };
        return this.http.post(this.url, JSON.stringify(body));
    };
    DrinkService.prototype.deleteDrink = function (id) {
        return this.http.delete(this.url.concat(id));
    };
    DrinkService.prototype.updateDrink = function (drink, availableDrink) {
        var body = {
            name: drink.name,
            price: drink.price,
            time: drink.time,
            category: drink.category,
            available: availableDrink
        };
        return this.http.put(this.url.concat(drink._id), JSON.stringify(body));
    };
    DrinkService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    DrinkService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], DrinkService);
    return DrinkService;
}());



/***/ }),

/***/ "./src/app/Services/food.service.ts":
/*!******************************************!*\
  !*** ./src/app/Services/food.service.ts ***!
  \******************************************/
/*! exports provided: FoodService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodService", function() { return FoodService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");




var FoodService = /** @class */ (function () {
    function FoodService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl + 'foods/';
        this.token = localStorage.getItem('token');
    }
    FoodService.prototype.getFoods = function () {
        return this.http.get(this.url);
    };
    FoodService.prototype.getFood = function (id) {
        return this.http.get(this.url + id);
    };
    FoodService.prototype.getCategories = function () {
        return this.http.get(this.url.concat('categories'));
    };
    FoodService.prototype.createFood = function (food) {
        var body = {
            name: food.name,
            price: food.price,
            time: food.time,
            category: food.category,
            available: food.available
        };
        return this.http.post(this.url, JSON.stringify(body));
    };
    FoodService.prototype.deleteFood = function (id) {
        return this.http.delete(this.url.concat(id));
    };
    FoodService.prototype.updateFood = function (food, availableFood) {
        var body = {
            name: food.name,
            price: food.price,
            time: food.time,
            category: food.category,
            available: availableFood
        };
        return this.http.put(this.url.concat(food._id), JSON.stringify(body));
    };
    FoodService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    FoodService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], FoodService);
    return FoodService;
}());



/***/ }),

/***/ "./src/app/Services/index.ts":
/*!***********************************!*\
  !*** ./src/app/Services/index.ts ***!
  \***********************************/
/*! exports provided: DrinkService, FoodService, OrderService, TableService, UserService, ReqInterceptorService, SocketIOService, AuthGuardService, NoAuthGuardService, RoleGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _drink_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drink.service */ "./src/app/Services/drink.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrinkService", function() { return _drink_service__WEBPACK_IMPORTED_MODULE_1__["DrinkService"]; });

/* harmony import */ var _food_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./food.service */ "./src/app/Services/food.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoodService", function() { return _food_service__WEBPACK_IMPORTED_MODULE_2__["FoodService"]; });

/* harmony import */ var _order_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order.service */ "./src/app/Services/order.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderService", function() { return _order_service__WEBPACK_IMPORTED_MODULE_3__["OrderService"]; });

/* harmony import */ var _table_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table.service */ "./src/app/Services/table.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableService", function() { return _table_service__WEBPACK_IMPORTED_MODULE_4__["TableService"]; });

/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user.service */ "./src/app/Services/user.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]; });

/* harmony import */ var _req_interceptor_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./req-interceptor.service */ "./src/app/Services/req-interceptor.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReqInterceptorService", function() { return _req_interceptor_service__WEBPACK_IMPORTED_MODULE_6__["ReqInterceptorService"]; });

/* harmony import */ var _socketIO_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./socketIO.service */ "./src/app/Services/socketIO.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocketIOService", function() { return _socketIO_service__WEBPACK_IMPORTED_MODULE_7__["SocketIOService"]; });

/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth-guard.service */ "./src/app/Services/auth-guard.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return _auth_guard_service__WEBPACK_IMPORTED_MODULE_8__["AuthGuardService"]; });

/* harmony import */ var _no_auth_guard_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./no-auth-guard.service */ "./src/app/Services/no-auth-guard.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoAuthGuardService", function() { return _no_auth_guard_service__WEBPACK_IMPORTED_MODULE_9__["NoAuthGuardService"]; });

/* harmony import */ var _role_guard_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./role-guard.service */ "./src/app/Services/role-guard.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoleGuardService", function() { return _role_guard_service__WEBPACK_IMPORTED_MODULE_10__["RoleGuardService"]; });












// export * from './socketio.service';


/***/ }),

/***/ "./src/app/Services/no-auth-guard.service.ts":
/*!***************************************************!*\
  !*** ./src/app/Services/no-auth-guard.service.ts ***!
  \***************************************************/
/*! exports provided: NoAuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoAuthGuardService", function() { return NoAuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/Services/user.service.ts");




var NoAuthGuardService = /** @class */ (function () {
    function NoAuthGuardService(userHttp, router) {
        this.userHttp = userHttp;
        this.router = router;
    }
    NoAuthGuardService.prototype.canActivate = function () {
        if (this.userHttp.isAuthenticated() || (!this.userHttp.isAuthenticated() && !this.userHttp.isRefreshTokenExpired())) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    };
    NoAuthGuardService.ctorParameters = function () { return [
        { type: _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    NoAuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], NoAuthGuardService);
    return NoAuthGuardService;
}());



/***/ }),

/***/ "./src/app/Services/order.service.ts":
/*!*******************************************!*\
  !*** ./src/app/Services/order.service.ts ***!
  \*******************************************/
/*! exports provided: OrderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderService", function() { return OrderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");




var OrderService = /** @class */ (function () {
    function OrderService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl + 'orders/';
    }
    OrderService.prototype.getOrders = function () {
        return this.http.get(this.url);
    };
    OrderService.prototype.getOrder = function (id) {
        return this.http.get(this.url.concat(id));
    };
    OrderService.prototype.getAllSuborders = function () {
        return this.http.get(this.url.concat('suborders'));
    };
    // TODO modifica in getSubOrdersById
    OrderService.prototype.getSubOrders = function (orderId) {
        return this.http.get(this.url.concat(orderId + '/suborders'));
    };
    OrderService.prototype.getSuborderFoods = function () {
        return this.http.get(this.url.concat('suborders?type=food'));
    };
    OrderService.prototype.getSuborderDrinks = function () {
        return this.http.get(this.url.concat('suborders?type=drink'));
    };
    OrderService.prototype.getReadySuborderFoods = function () {
        return this.http.get(this.url.concat('suborders?type=food&ready=true'));
    };
    OrderService.prototype.getReadySuborderDrinks = function () {
        return this.http.get(this.url.concat('suborders?type=drink&ready=true'));
    };
    OrderService.prototype.setFoodReady = function (idFood, idOrder, idSuborder, ready) {
        var body = { ready: ready };
        // tslint:disable-next-line: max-line-length
        return this.http.put(this.url.concat(idOrder + '/suborders/' + idSuborder + '/foods/' + idFood), body);
    };
    OrderService.prototype.setDrinkReady = function (idDrink, idOrder, idSuborder, ready) {
        var body = { ready: ready };
        // tslint:disable-next-line: max-line-length
        return this.http.put(this.url.concat(idOrder + '/suborders/' + idSuborder + '/drinks/' + idDrink), body);
    };
    OrderService.prototype.addOrder = function (tableid, clients, waiter_id) {
        var body = {
            table_id: tableid,
            clients: clients,
            waiter_id: waiter_id
        };
        return this.http.post(this.url, JSON.stringify(body));
    };
    OrderService.prototype.addSuborder = function (orderId, orderedFoods, orderedDrinks) {
        var body = {
            orderId: orderId,
            ordered_foods: orderedFoods,
            ordered_drinks: orderedDrinks
        };
        return this.http.post(this.url.concat(orderId + '/suborders'), JSON.stringify(body));
    };
    OrderService.prototype.pay = function (id) {
        var body = {
            paid: true
        };
        return this.http.put(this.url.concat(id), body);
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        return this.http.delete(this.url.concat(orderId));
    };
    OrderService.prototype.setAllFoodsReady = function (order_id, suborder_id) {
        var body = {
            foods_ready: true
        };
        return this.http.put(this.url.concat(order_id + '/suborders/' + suborder_id), body);
    };
    OrderService.prototype.setAllDrinksReady = function (order_id, suborder_id) {
        var body = {
            drinks_ready: true
        };
        return this.http.put(this.url.concat(order_id + '/suborders/' + suborder_id), body);
    };
    OrderService.prototype.setFoodSuborderDelivered = function (order_id, suborder_id) {
        var body = {
            foods_served: true
        };
        return this.http.put(this.url.concat(order_id + '/suborders/' + suborder_id), body);
    };
    OrderService.prototype.setDrinkSuborderDelivered = function (order_id, suborder_id) {
        var body = {
            drinks_served: true
        };
        return this.http.put(this.url.concat(order_id + '/suborders/' + suborder_id), body);
    };
    OrderService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    OrderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], OrderService);
    return OrderService;
}());



/***/ }),

/***/ "./src/app/Services/req-interceptor.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/Services/req-interceptor.service.ts ***!
  \*****************************************************/
/*! exports provided: ReqInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReqInterceptorService", function() { return ReqInterceptorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user.service */ "./src/app/Services/user.service.ts");
// https://github.com/IntertechInc/http-interceptor-refresh-token/blob/master/src/app/request-interceptor.service.ts








var ReqInterceptorService = /** @class */ (function () {
    function ReqInterceptorService(userHttp, router) {
        this.userHttp = userHttp;
        this.router = router;
        this.isRefreshingToken = false;
        this.tokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].backendUrl;
    }
    ReqInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.url.includes('login')) {
            return next.handle(req);
        }
        return next.handle(this.cloneRequest(req)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (err) {
            if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpErrorResponse"]) {
                switch (err.status) {
                    // case 400:
                    //     return this.handle400Error(err);
                    case 401:
                        return _this.handle401Error(req, next);
                    default:
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err);
                }
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err);
            }
        }));
    };
    ReqInterceptorService.prototype.handle401Error = function (req, next) {
        var _this = this;
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            return this.userHttp.renewToken().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (data) {
                if (data) {
                    _this.tokenSubject.next(data.token);
                    _this.userHttp.setToken(data.token);
                    _this.userHttp.setRefreshToken(data.refresh_token);
                    return next.handle(_this.cloneRequest(req));
                }
                return _this.logoutUser();
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
                // Se l'utente non esiste più nel database riceve errore 404
                if (error.status === 404) {
                    return _this.logoutUser();
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(error);
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["finalize"])(function () {
                console.log('Refresh finito');
                _this.isRefreshingToken = false;
            }));
        }
        else {
            return this.tokenSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (token) { return token != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (token) {
                _this.userHttp.setToken(token);
                return next.handle(_this.cloneRequest(req));
            }));
        }
    };
    ReqInterceptorService.prototype.cloneRequest = function (req) {
        return req.clone({
            headers: req.headers
                .set('authorization', 'Bearer ' + this.userHttp.getToken())
                .set('Content-Type', 'application/json')
                .set('cache-control', 'no-cache')
        });
    };
    ReqInterceptorService.prototype.logoutUser = function () {
        console.log('LOGOUT');
        this.userHttp.logout();
        // Route to the login page (implementation up to you)
        this.router.navigate(['login']);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])('');
    };
    ReqInterceptorService.ctorParameters = function () { return [
        { type: _user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    ReqInterceptorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        })
    ], ReqInterceptorService);
    return ReqInterceptorService;
}());



/***/ }),

/***/ "./src/app/Services/role-guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/Services/role-guard.service.ts ***!
  \************************************************/
/*! exports provided: RoleGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleGuardService", function() { return RoleGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/Services/user.service.ts");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_4__);





var RoleGuardService = /** @class */ (function () {
    function RoleGuardService(userHttp, router) {
        this.userHttp = userHttp;
        this.router = router;
    }
    RoleGuardService.prototype.canActivate = function (route) {
        var expectedRole = route.data.expectedRole;
        var token = this.userHttp.getToken();
        var tokenPayload = jwt_decode__WEBPACK_IMPORTED_MODULE_4___default()(token);
        if ((!this.userHttp.isAuthenticated() && this.userHttp.isRefreshTokenExpired()) || tokenPayload.role !== expectedRole) {
            this.router.navigate(['login']);
            // this.userHttp.setEmitter(false);
            return false;
        }
        // this.userHttp.setEmitter(true);
        return true;
    };
    RoleGuardService.ctorParameters = function () { return [
        { type: _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    RoleGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], RoleGuardService);
    return RoleGuardService;
}());



/***/ }),

/***/ "./src/app/Services/socketIO.service.ts":
/*!**********************************************!*\
  !*** ./src/app/Services/socketIO.service.ts ***!
  \**********************************************/
/*! exports provided: SocketIOService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketIOService", function() { return SocketIOService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





var SocketIOService = /** @class */ (function () {
    function SocketIOService() {
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl;
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1__(this.url);
    }
    SocketIOService.prototype.modified_table = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on("modified_table", function (table) {
                observer.next(table);
            });
        });
    };
    SocketIOService.prototype.modified_food = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on("modified_food", function (food) {
                observer.next(food);
            });
        });
    };
    SocketIOService.prototype.modified_drink = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on("modified_drink", function (drink) {
                observer.next(drink);
            });
        });
    };
    SocketIOService.prototype.modified_user = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on("modified_user", function (user) {
                observer.next(user);
            });
        });
    };
    SocketIOService.prototype.order_deleted = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on('order_deleted', function (orderId) {
                observer.next(orderId);
            });
        });
    };
    SocketIOService.prototype.modified_suborder = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on('modified_suborder', function (suborder) {
                observer.next(suborder);
            });
        });
    };
    SocketIOService.prototype.modified_suborder_food = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on('modified_suborder_food', function (suborder) {
                observer.next(suborder);
            });
        });
    };
    SocketIOService.prototype.modified_suborder_drink = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            _this.socket.on("modified_suborder_drink", function (suborder) {
                observer.next(suborder);
            });
        });
    };
    SocketIOService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"])()
    ], SocketIOService);
    return SocketIOService;
}());

/** */
// todo
// return {unsubscribe(){
//     this.socket.disconnect();
// }};


/***/ }),

/***/ "./src/app/Services/table.service.ts":
/*!*******************************************!*\
  !*** ./src/app/Services/table.service.ts ***!
  \*******************************************/
/*! exports provided: TableService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableService", function() { return TableService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");




var TableService = /** @class */ (function () {
    function TableService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl + 'tables/';
        this.token = localStorage.getItem('token');
    }
    TableService.prototype.getTables = function () {
        return this.http.get(this.url);
    };
    TableService.prototype.getTable = function (id) {
        return this.http.get(this.url.concat(id));
    };
    TableService.prototype.takeTable = function (tableid, clients, idCameriere) {
        var body = {
            clients: clients,
            waiter_id: idCameriere,
            available: false
        };
        return this.http.put(this.url.concat(tableid), JSON.stringify(body));
    };
    TableService.prototype.freeTable = function (tableId) {
        var body = {
            available: true
        };
        return this.http.put(this.url.concat(tableId), JSON.stringify(body));
    };
    TableService.prototype.deleteTable = function (tableId) {
        return this.http.delete(this.url.concat(tableId));
    };
    TableService.prototype.addTable = function (tableNumber, totalSeats) {
        var body = {
            table_number: tableNumber,
            total_seats: totalSeats
        };
        return this.http.post(this.url, JSON.stringify(body));
    };
    TableService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    TableService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], TableService);
    return TableService;
}());



/***/ }),

/***/ "./src/app/Services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/Services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/fesm5/auth0-angular-jwt.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_5__);






var UserService = /** @class */ (function () {
    function UserService(http, jwtHelper) {
        this.http = http;
        this.jwtHelper = jwtHelper;
        this.TOKEN = "token";
        this.REFRESHTOKEN = "refresh_token";
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].backendUrl + 'users/';
        this.token = this.getToken();
    }
    UserService.prototype.getToken = function () {
        return localStorage.getItem(this.TOKEN);
    };
    UserService.prototype.setToken = function (value) {
        return localStorage.setItem(this.TOKEN, value);
    };
    UserService.prototype.getRefreshToken = function () {
        return localStorage.getItem(this.REFRESHTOKEN);
    };
    UserService.prototype.setRefreshToken = function (value) {
        return localStorage.setItem(this.REFRESHTOKEN, value);
    };
    UserService.prototype.getUserId = function () {
        return localStorage.getItem('id');
    };
    UserService.prototype.getUsers = function () {
        return this.http.get(this.url);
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.url.concat(id));
    };
    UserService.prototype.getCurrentUser = function () {
        return this.http.get(this.url.concat("current"));
    };
    UserService.prototype.deleteUser = function (id) {
        return this.http.delete(this.url.concat(id));
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem(this.TOKEN);
        localStorage.removeItem(this.REFRESHTOKEN);
    };
    UserService.prototype.login = function (username, password) {
        var body = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        body = body.set('username', username);
        body = body.set('password', atob(password));
        return this.http.post(this.url.concat('login'), body);
    };
    UserService.prototype.register = function (username, firstname, lastname, role, password) {
        var body = {
            username: username,
            password: atob(password),
            role: role,
            lastname: lastname,
            firstname: firstname
        };
        return this.http.post(this.url, JSON.stringify(body));
    };
    /* api per controllare il token */
    // isTokenValid(token: string) {
    //   // return this.http.get<boolean>(this.url.concat('user?token=' + token));
    //   return true;
    // }
    UserService.prototype.getRole = function () {
        var token = this.getToken();
        var tokenPayload = jwt_decode__WEBPACK_IMPORTED_MODULE_5___default()(token);
        return tokenPayload.role;
    };
    UserService.prototype.getUser_id = function () {
        var token = this.getToken();
        var tokenPayload = jwt_decode__WEBPACK_IMPORTED_MODULE_5___default()(token);
        return tokenPayload.sub;
    };
    UserService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        if (!token) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(token);
    };
    UserService.prototype.isRefreshTokenExpired = function () {
        var refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return true;
        }
        return this.jwtHelper.isTokenExpired(refreshToken);
    };
    UserService.prototype.renewToken = function () {
        var body = {
            refresh_token: this.getRefreshToken(),
            user_id: this.getUserId()
        };
        return this.http.post(this.url.concat("refresh"), JSON.stringify(body));
    };
    UserService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"] }
    ]; };
    UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        })
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components */ "./src/app/Components/index.ts");
/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Models */ "./src/app/Models/index.ts");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Services */ "./src/app/Services/index.ts");






var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        canActivate: [_Services__WEBPACK_IMPORTED_MODULE_5__["AuthGuardService"]]
    },
    {
        path: 'login',
        component: _Components__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"],
        canActivate: [_Services__WEBPACK_IMPORTED_MODULE_5__["NoAuthGuardService"]]
    },
    {
        path: 'dashboard',
        component: _Components__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
        canActivate: [_Services__WEBPACK_IMPORTED_MODULE_5__["AuthGuardService"]],
    },
    {
        path: 'backoffice',
        component: _Components__WEBPACK_IMPORTED_MODULE_3__["BackofficeComponent"],
        canActivate: [_Services__WEBPACK_IMPORTED_MODULE_5__["RoleGuardService"]],
        data: {
            expectedRole: _Models__WEBPACK_IMPORTED_MODULE_4__["Role"].cassa
        }
    },
    {
        path: 'backoffice/stats',
        component: _Components__WEBPACK_IMPORTED_MODULE_3__["StatsComponent"],
        canActivate: [_Services__WEBPACK_IMPORTED_MODULE_5__["RoleGuardService"]],
        data: {
            expectedRole: _Models__WEBPACK_IMPORTED_MODULE_4__["Role"].cassa
        }
    },
    {
        path: 'orders/:id',
        component: _Components__WEBPACK_IMPORTED_MODULE_3__["OrderComponent"],
        canActivate: [_Services__WEBPACK_IMPORTED_MODULE_5__["RoleGuardService"]],
        data: {
            expectedRole: _Models__WEBPACK_IMPORTED_MODULE_4__["Role"].cameriere
        }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'WATTENE';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/fesm5/auth0-angular-jwt.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components */ "./src/app/Components/index.ts");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Services */ "./src/app/Services/index.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _Components_users_users_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Components/users/users.component */ "./src/app/Components/users/users.component.ts");
/* harmony import */ var _Components_order_order_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Components/order/order.component */ "./src/app/Components/order/order.component.ts");
/* harmony import */ var _Components_food_food_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Components/food/food.component */ "./src/app/Components/food/food.component.ts");
/* harmony import */ var _Components_drink_drink_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Components/drink/drink.component */ "./src/app/Components/drink/drink.component.ts");
/* harmony import */ var _Components_stats_barman_stats_barman_stats_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Components/stats/barman-stats/barman-stats.component */ "./src/app/Components/stats/barman-stats/barman-stats.component.ts");
/* harmony import */ var _Components_stats_food_stats_food_stats_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Components/stats/food-stats/food-stats.component */ "./src/app/Components/stats/food-stats/food-stats.component.ts");
/* harmony import */ var _Components_stats_drink_stats_drink_stats_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Components/stats/drink-stats/drink-stats.component */ "./src/app/Components/stats/drink-stats/drink-stats.component.ts");
/* harmony import */ var _Components_stats_money_stats_money_stats_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Components/stats/money-stats/money-stats.component */ "./src/app/Components/stats/money-stats/money-stats.component.ts");
/* harmony import */ var _Components_dialog_payment_dialog_payment_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Components/dialog-payment/dialog-payment.component */ "./src/app/Components/dialog-payment/dialog-payment.component.ts");
/* harmony import */ var _Components_serve_queue_serve_queue_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Components/serve-queue/serve-queue.component */ "./src/app/Components/serve-queue/serve-queue.component.ts");























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["BackofficeComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["StatsComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["WaiterStatsComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["CookStatsComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["DashboardComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["RegisterComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["NavbarComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["DialogTableComponent"],
                _Components__WEBPACK_IMPORTED_MODULE_8__["PreparationQueueComponent"],
                _Components_order_order_component__WEBPACK_IMPORTED_MODULE_13__["OrderComponent"],
                _Components_users_users_component__WEBPACK_IMPORTED_MODULE_12__["UsersComponent"],
                _Components_food_food_component__WEBPACK_IMPORTED_MODULE_14__["FoodComponent"],
                _Components_drink_drink_component__WEBPACK_IMPORTED_MODULE_15__["DrinkComponent"],
                _Components_stats_barman_stats_barman_stats_component__WEBPACK_IMPORTED_MODULE_16__["BarmanStatsComponent"],
                _Components_stats_food_stats_food_stats_component__WEBPACK_IMPORTED_MODULE_17__["FoodStatsComponent"],
                _Components_stats_drink_stats_drink_stats_component__WEBPACK_IMPORTED_MODULE_18__["DrinkStatsComponent"],
                _Components_stats_money_stats_money_stats_component__WEBPACK_IMPORTED_MODULE_19__["MoneyStatsComponent"],
                _Components_dialog_payment_dialog_payment_component__WEBPACK_IMPORTED_MODULE_20__["DialogPaymentComponent"],
                _Components_serve_queue_serve_queue_component__WEBPACK_IMPORTED_MODULE_21__["ServeQueueComponent"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatChipsModule"],
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_4__["JwtModule"].forRoot({
                    config: {
                        tokenGetter: function () {
                            return localStorage.getItem('token');
                        },
                        whitelistedDomains: ['http://localhost:4000'],
                        blacklistedRoutes: []
                    }
                })
            ],
            entryComponents: [_Components__WEBPACK_IMPORTED_MODULE_8__["DialogTableComponent"], _Components_dialog_payment_dialog_payment_component__WEBPACK_IMPORTED_MODULE_20__["DialogPaymentComponent"]],
            providers: [
                _Services__WEBPACK_IMPORTED_MODULE_9__["SocketIOService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"], useClass: _Services__WEBPACK_IMPORTED_MODULE_9__["ReqInterceptorService"], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var environment = {
    production: true,
    backendUrl: 'https://wattene-backend.herokuapp.com/'
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");






if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! H:\Scuola\Unive\FileCorsi\anno2\Tecnologie Web\ProgettoFinale\frontend\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map