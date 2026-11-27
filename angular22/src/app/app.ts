import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Videojuegos } from './components/videojuegos/videojuegos';
import { Persona } from './components/persona/persona';
@Component({
  imports: [RouterOutlet, Videojuegos, Persona],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',

})
export class App {
   nombre_proyecto = ('angular22');
   descripcion = " Prueba de proyecto de Angular 22" ;
   alumno = "Daniel Garrido";







}
