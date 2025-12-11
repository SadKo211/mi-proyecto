import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';

// Importamos SOLO los componentes necesarios para el LOGIN
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, 
  IonButton, IonIcon, IonText, IonSpinner, ToastController, 
  IonInputPasswordToggle 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, 
    IonButton, IonIcon, IonText, IonSpinner, IonInputPasswordToggle 
  ]
})
export class LoginPage {

  email: string = '';
  password: string = '';
  cargando: boolean = false; // Variable para mostrar spinner al iniciar

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({ personOutline, lockClosedOutline, logInOutline });
  }

  async login() {
    // Validación de campos vacíos
    if (!this.email || !this.password) {
      this.mostrarMensaje('Por favor ingresa correo y contraseña', 'warning');
      return;
    }

    this.cargando = true; // Activar spinner

    try {
      await this.authService.login(this.email, this.password);
      
      this.cargando = false;
      this.mostrarMensaje('¡Bienvenido!', 'success');
      this.router.navigate(['/home']); // Navegar al Home real

    } catch (error) {
      this.cargando = false;
      this.mostrarMensaje('Credenciales incorrectas', 'danger');
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