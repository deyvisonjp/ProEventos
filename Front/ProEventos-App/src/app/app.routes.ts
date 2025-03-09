import { Routes  } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'eventos', redirectTo: 'eventos/lista'},
    {
        path: 'eventos', component: EventosComponent,
        children: [
            {path: 'detalhe', component: EventoDetalheComponent},
            {path: 'detalhe/:id', component: EventoDetalheComponent},
            {path: 'lista', component: EventoListaComponent}
        ]
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'palestrantes', component: PalestrantesComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'contatos', component: ContatosComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
