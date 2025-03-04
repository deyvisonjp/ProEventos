import { Component } from '@angular/core';
import { TituloDaPaginaComponent } from "../../shared/titulo-da-pagina/titulo-da-pagina.component";

@Component({
  selector: 'app-dashboard',
  imports: [TituloDaPaginaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
