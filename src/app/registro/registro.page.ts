import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';

// Importamos los componentes visuales de Ionic
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton,
  IonIcon,
  IonInputPasswordToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
  IonToast,
  ToastController // Importante para mostrar mensajes
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
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
    IonInputPasswordToggle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonList,
    IonToast
  ]
})
export class RegistroPage implements OnInit {
  
  // Variables del formulario
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // Variable para validar la confirmación

  // Inyección de dependencias
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() { 
    addIcons({ personOutline, mailOutline, lockClosedOutline });
  }

  ngOnInit() {}

  async registrarse() {
    // 1. Validaciones básicas
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.mostrarMensaje('Por favor, completa todos los campos.', 'warning');
      return;
    }

    // 2. Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.mostrarMensaje('Las contraseñas no coinciden.', 'danger');
      return;
    }

    // 3. Intentar registrar en el servidor (JSON Server)
    try {
      const user = await this.authService.register(this.email, this.password);
      
      if(user) {
        console.log('Usuario creado:', user);
        this.mostrarMensaje('¡Cuenta creada con éxito!', 'success');
        
        // Redirigir al login después de un momento
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error al registrar:', error);
      // Mostrar el error que viene del servicio (ej: "Email ya registrado")
      const mensajeError = error.message || 'Error al conectar con el servidor.';
      this.mostrarMensaje(mensajeError, 'danger');
    }
  }

  // Función auxiliar para mostrar Toasts (Mensajes abajo)
  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}