import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TituloDaPaginaComponent } from '../../shared/titulo-da-pagina/titulo-da-pagina.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TooltipModule,
    BsDropdownModule,
    NgxSpinnerModule,
    TituloDaPaginaComponent,
    RouterOutlet
],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  ngOnInit(): void { }
}
