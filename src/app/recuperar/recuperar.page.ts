import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons'; 
import { mailOutline, arrowBackOutline } from 'ionicons/icons'; 

import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  ToastController 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html', // ✅ CORREGIDO: Apunta a su propio HTML
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton
  ]
})
export class RecuperarPage { // ✅ CORREGIDO: Nombre correcto de la clase

  email: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({ mailOutline, arrowBackOutline });
  }

  async recuperar() {
    if (!this.email) {
      this.mostrarMensaje('Ingresa tu correo por favor', 'warning');
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      
      this.mostrarMensaje('Correo enviado. Redirigiendo...', 'success');

      setTimeout(() => {
        this.router.navigate(['/login']); 
      }, 2000); 

    } catch (error) {
      this.mostrarMensaje('Error al solicitar recuperación', 'danger');
    }
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}