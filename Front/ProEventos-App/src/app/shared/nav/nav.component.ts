import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink, 
    RouterLinkActive, 
    CommonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  showMenu(): boolean {
    return this.router.url != '/user/login' && this.router.url !== '/user/registration';
  };

}
