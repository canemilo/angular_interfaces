import { Component } from '@angular/core';

@Component({
  selector: 'app-heroe',
  standalone: false,
  styleUrl: './heroe.css',
  templateUrl: './heroe.html',
})
export class Heroe {
  public nombre: string = 'Goku';
  public edad: number = 35;

  public get nombreCapitalizado(): string {
    return this.nombre.toUpperCase();
  }

  public getDescripcionHeroe(): string {
    return `${this.nombre} - ${this.edad}`;
  }

  private cambiarNombrePrivado(): void {
    this.nombre = 'Kakarot';
  }

  public cambiarNombre(): void {
    this.nombre = 'Vegeta';
  }

  public cambiarEdad(): void {
    this.edad = 39;
  }
}
