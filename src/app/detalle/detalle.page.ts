import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonButton, 
  IonIcon, 
  IonTextarea // <--- IMPORTANTE: Agregamos esto
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonButton,
    IonIcon, 
    IonTextarea // <--- Y esto aquí
  ]
})
export class DetallePage implements OnInit {

  producto: any;
  notaCliente: string = ''; // <--- Variable para guardar la nota

  constructor(private router: Router) { 
    addIcons({ cartOutline });
    
    const navegacion = this.router.getCurrentNavigation();
    if (navegacion && navegacion.extras && navegacion.extras.state) {
      this.producto = navegacion.extras.state['productoEnviado'];
    }
  }

  ngOnInit() {
  }

  agregarAlCarrito() {
    console.log('Producto agregado:', this.producto.titulo);
    console.log('Nota del cliente:', this.notaCliente);
    // Aquí luego programaremos la lógica real del carro
  }

}