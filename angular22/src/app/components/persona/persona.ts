import { Component, OnInit } from '@angular/core';
import { NgIf } from '../../../../node_modules/@angular/common/types/_common_module-chunk';
import { NgFor } from '@angular/common';

@Component({
  imports: [NgFor],
  selector: 'app-persona',
  styleUrl: './persona.css',
  templateUrl: './persona.html',
})
export class Persona {

  nombreDog : string = "Canela";
  edad : number;
  listaNombre : Array<string>;



  constructor(){
    this.edad = 15;
    this.listaNombre =["Daniel","Pepe","Kiko","Milo","Bimba","Tigtre"];
  }
  ngOnit():void{

  }




  public aumentarEdad():void{
    this.edad = this.edad + 1;
    console.log("AUMENTAR");
  }
  public disminuirEdad():void{
    this.edad = this.edad - 1;
  }
}
