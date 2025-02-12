import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventosComponent } from "./components/eventos/eventos.component";
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventosComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProEventos-App';
}
