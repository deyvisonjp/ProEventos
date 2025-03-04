import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-da-pagina',
  imports: [],
  templateUrl: './titulo-da-pagina.component.html',
  styleUrl: './titulo-da-pagina.component.scss'
})
export class TituloDaPaginaComponent {

  @Input() titulo?: string ;

}
