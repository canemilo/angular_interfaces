import { Component } from '@angular/core';
import { ContadorModule } from './contador/contador.module';
import { HeroesModule } from './heroes/heroes.module';

@Component({
  imports: [ContadorModule, HeroesModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  public title = 'Daniel Garrido';
}
