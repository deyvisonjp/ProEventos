import { Routes  } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { ContatosComponent } from './components/contatos/contatos.component';

import { EventosComponent } from './components/eventos/eventos.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';

import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    {
        path: 'user', component: UserComponent,
        children: [
            { path: 'login', component: LoginComponent},
            { path: 'registration', component: RegistrationComponent}
        ]
    },
    { path: 'user/perfil', component: PerfilComponent },

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
    { path: 'contatos', component: ContatosComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
