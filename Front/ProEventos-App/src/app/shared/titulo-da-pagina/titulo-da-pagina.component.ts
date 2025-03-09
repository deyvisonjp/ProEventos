import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo-da-pagina',
  imports: [CommonModule],
  templateUrl: './titulo-da-pagina.component.html',
  styleUrl: './titulo-da-pagina.component.scss'
})
export class TituloDaPaginaComponent {

  constructor(private router: Router) {}

  @Input() iconClass = 'fa-regular fa-thumbs-up';
  @Input() titulo?: string;
  @Input() subtitulo? = 'Desde 2025';
  @Input() botaoListar = false;

  Listar(): void {
    this.router.navigate([`/${this.titulo?.toLocaleLowerCase()}/lista`])
  }

}
