import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Heroe } from './components/heroe/heroe';
import { Lista } from './components/lista/lista';

@NgModule({
  declarations: [Heroe, Lista],
  exports: [Heroe, Lista],
  imports: [CommonModule],
})
export class HeroesModule {}
