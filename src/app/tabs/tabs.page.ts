import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,              // 👈 importante
  imports: [IonicModule, CommonModule, RouterModule] // 👈 importa Ionic y Router
})
export class TabsPage {}
