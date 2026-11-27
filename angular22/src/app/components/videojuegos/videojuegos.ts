import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// PARA QUE VAYA AL GENERAL
@Component({
  imports: [FormsModule],
  selector: 'app-videojuegos',
  styleUrl: './videojuegos.css',
  templateUrl: './videojuegos.html',
})
export class Videojuegos {

public videojuegos: string[] = [];

nuevoJuego: string = "";

public addJuego(){
  if(this.nuevoJuego && this.nuevoJuego.trim()){
    this.videojuegos.push(this.nuevoJuego.trim());
  }
  this.nuevoJuego = "";
}

public removeUltimoJuego(): void {
  if (this.videojuegos.length > 0) {
    this.videojuegos.pop();
  }
}



}
