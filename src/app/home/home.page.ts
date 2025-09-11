import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterModule,CommonModule,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle],
  
})
export class HomePage implements OnInit {

  email: string = "";

  constructor(private activateRoute: ActivatedRoute, 
              private router: Router) {}

  // Metodo que se ejecuta cuando se crea el componente
  ngOnInit() {
    

    // Se lee los parametros que vienen desde la url
    this.activateRoute.queryParams.subscribe(params => {

      // Se asigna el dato desde los parametros
      this.email = params['email'];

      // Si email esta vacío redirecciona al login
      if (this.email === "") {
        this.router.navigateByUrl('/login');
      }
    });
  }
}

