import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular'; // Necesario para guardar la foto
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline, logOutOutline, arrowBackOutline, personCircleOutline, mailOutline } from 'ionicons/icons';

import { 
  IonContent, IonCard, IonCardContent, IonAvatar, IonButton, 
  IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonItem, IonLabel, IonNote, IonSkeletonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule,
    IonContent, IonCard, IonCardContent, IonAvatar, IonButton, 
    IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonItem, IonLabel, IonNote, IonSkeletonText
  ]
})
export class PerfilPage implements OnInit {

  usuario: string = 'Cargando...'; // Aquí pondremos el "Nombre"
  correo: string = '';             // Aquí pondremos el "Email"
  fotoPerfil: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'; // Foto por defecto

  private authService = inject(AuthService);
  private storage = inject(Storage); // Inyectamos Storage directamente
  private router = inject(Router);

  constructor() {
    addIcons({ cameraOutline, logOutOutline, arrowBackOutline, personCircleOutline, mailOutline });
    this.initStorage();
  }

  async initStorage() {
    // Aseguramos que el storage esté listo
    await this.storage.create();
  }

  async ngOnInit() {
    const email = await this.authService.getUserEmail();
    
    if (email) {
      this.correo = email;
      // Truco: Sacamos el nombre de la primera parte del correo (antes del @)
      // Ej: enzo.santibanez@duoc.cl -> enzo.santibanez
      this.usuario = email.split('@')[0]; 
      
      // CARGAR FOTO GUARDADA DEL USUARIO
      const keyFoto = `foto_perfil_${this.correo}`; // Clave única por usuario
      const fotoGuardada = await this.storage.get(keyFoto);
      
      if (fotoGuardada) {
        this.fotoPerfil = fotoGuardada;
      }
    } else {
      this.usuario = 'Invitado';
      this.correo = 'Sin correo';
    }
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        // IMPORTANTE: Usamos DataUrl para poder guardar la imagen como texto en la BD local
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Prompt
      });

      if (image.dataUrl) {
        this.fotoPerfil = image.dataUrl; // Mostrar inmediatamente
        
        // GUARDAR FOTO EN MEMORIA PERMANENTE
        if (this.correo) {
            const keyFoto = `foto_perfil_${this.correo}`;
            await this.storage.set(keyFoto, image.dataUrl);
            console.log('Foto guardada para:', this.correo);
        }
      }
    } catch (error) {
      console.log('Cancelado por el usuario');
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}