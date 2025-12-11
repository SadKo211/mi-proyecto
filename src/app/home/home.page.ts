import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // 1. IMPORTAMOS RouterLink
import { addIcons } from 'ionicons';
import { logOutOutline, cartOutline, heartOutline, personCircleOutline } from 'ionicons/icons';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonBadge,
  IonSpinner 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink, // 2. ¡IMPORTANTE! Agregamos RouterLink aquí para que el botón funcione
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, 
    IonBadge, IonSpinner
  ],
})
export class HomePage implements OnInit {

  private authService = inject(AuthService); 
  private apiService = inject(ApiService);
  private router = inject(Router);

  usuario: string = 'Cargando...';
  productos: any[] = [];
  cargando: boolean = true;

  constructor() {
    addIcons({ logOutOutline, cartOutline, heartOutline, personCircleOutline });
  }

  async ngOnInit() {
    const email = await this.authService.getUserEmail();
    this.usuario = email || 'Invitado';
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.apiService.getProductos().subscribe({
      next: (data: any) => { 
        this.productos = data;
        this.cargando = false;
      },
      error: (err: any) => { 
        console.error('Error API:', err);
        this.cargando = false;
      }
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  verDetalle(producto: any) {
    this.router.navigate(['/detalle'], { state: { productoEnviado: producto } });
  }
}