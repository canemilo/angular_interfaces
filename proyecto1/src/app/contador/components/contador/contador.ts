import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

type EvasiveButton = 'minus' | 'plus';

type ButtonPosition = {
  position: 'static' | 'fixed';
  top?: string;
  left?: string;
  transition?: string;
  zIndex?: number;
};

@Component({
  selector: 'app-contador',
  standalone: false,
  styleUrl: './contador.css',
  template: `
    <section class="counter" aria-label="Controles del contador">
      <p class="counter-caption">Valor actual</p>
      <output class="counter-value" aria-live="polite">{{ contador }}</output>

      <div class="counter-actions">
        <button
          class="counter-button counter-button--step"
          type="button"
          #minusButton
          aria-label="Disminuir contador"
          [style.position]="posicionMinus.position"
          [style.top]="posicionMinus.top"
          [style.left]="posicionMinus.left"
          [style.transition]="posicionMinus.transition"
          [style.z-index]="posicionMinus.zIndex"
          (click)="decrementar()">
          −
        </button>
        <button
          class="counter-button counter-button--reset"
          type="button"
          (click)="resetear()">
          Reiniciar
        </button>
        <button
          class="counter-button counter-button--step"
          type="button"
          #plusButton
          aria-label="Aumentar contador"
          [style.position]="posicionPlus.position"
          [style.top]="posicionPlus.top"
          [style.left]="posicionPlus.left"
          [style.transition]="posicionPlus.transition"
          [style.z-index]="posicionPlus.zIndex"
          (click)="incrementar()">
          +
        </button>
      </div>
    </section>
  `,
})
export class ContadorComponent {
  public contador = 0;
  public valorX = 1;
  public posicionMinus: ButtonPosition = { position: 'static' };
  public posicionPlus: ButtonPosition = { position: 'static' };

  @ViewChild('minusButton') private minusButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('plusButton') private plusButton?: ElementRef<HTMLButtonElement>;

  incrementar(): void {
    this.contador += this.valorX;
  }

  decrementar(): void {
    this.contador -= this.valorX;
  }

  resetear(): void {
    this.contador = 0;
    this.posicionMinus = { position: 'static' };
    this.posicionPlus = { position: 'static' };
  }

  @HostListener('document:pointermove', ['$event'])
  evadirPuntero(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      return;
    }

    this.moverSiCerca('minus', this.minusButton, this.plusButton, event);
    this.moverSiCerca('plus', this.plusButton, this.minusButton, event);
  }

  private moverSiCerca(
    boton: EvasiveButton,
    referencia: ElementRef<HTMLButtonElement> | undefined,
    otraReferencia: ElementRef<HTMLButtonElement> | undefined,
    event: PointerEvent,
  ): void {
    const element = referencia?.nativeElement;
    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const distance = Math.hypot(
      event.clientX - (bounds.left + bounds.width / 2),
      event.clientY - (bounds.top + bounds.height / 2),
    );

    if (distance >= 120) {
      return;
    }

    const padding = 12;
    const maxLeft = Math.max(padding, window.innerWidth - bounds.width - padding);
    const maxTop = Math.max(padding, window.innerHeight - bounds.height - padding);
    const otherBounds = otraReferencia?.nativeElement.getBoundingClientRect();
    let bestPosition = { left: padding, top: padding };
    let bestDistance = -1;

    for (let attempt = 0; attempt < 20; attempt++) {
      const left = padding + Math.random() * (maxLeft - padding);
      const top = padding + Math.random() * (maxTop - padding);
      const pointerDistance = Math.hypot(
        event.clientX - (left + bounds.width / 2),
        event.clientY - (top + bounds.height / 2),
      );
      const overlapsOtherButton = otherBounds
        && left < otherBounds.right
        && left + bounds.width > otherBounds.left
        && top < otherBounds.bottom
        && top + bounds.height > otherBounds.top;

      if (pointerDistance > bestDistance) {
        bestDistance = pointerDistance;
        bestPosition = { left, top };
      }

      if (pointerDistance >= 120 && !overlapsOtherButton) {
        bestPosition = { left, top };
        break;
      }
    }

    const position: ButtonPosition = {
      position: 'fixed',
      top: `${bestPosition.top}px`,
      left: `${bestPosition.left}px`,
      transition: 'top 120ms ease-out, left 120ms ease-out',
      zIndex: 10,
    };

    if (boton === 'minus') {
      this.posicionMinus = position;
    } else {
      this.posicionPlus = position;
    }
  }
}
