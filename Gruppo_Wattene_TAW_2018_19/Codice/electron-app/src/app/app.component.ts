import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';​


//non sono sicuro che sta roba vada qui MATTEO
export class AppComponent {

    constructor(private _electronService: ElectronService) {}   // DI
  
    launchWindow() {
      this._electronService.shell.openExternal('http://google.co.uk');
    }
  
  }