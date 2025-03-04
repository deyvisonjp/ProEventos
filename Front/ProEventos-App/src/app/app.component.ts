import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./shared/nav/nav.component";
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, NgxSpinnerModule],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  title = 'ProEventos-App';

  ngOnInit() {
    this.spinner.show();
  
    setTimeout(() => {
      this.spinner.hide();
    }, 1000); // Aguarda 5 segundos
  }
  
}
