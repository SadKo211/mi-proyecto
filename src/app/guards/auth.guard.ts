// src/app/guards/auth.guard.ts

import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyección de dependencias
  private authService = inject(AuthService);
  private router = inject(Router);

  // Método principal que decide si la ruta puede activarse
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated.pipe(
      // 1. Tomamos el primer valor emitido y completamos
      take(1),
      // 2. Mapeamos el valor booleano a la decisión de navegación
      map(isLoggedIn => {
        if (isLoggedIn) {
          // Si el usuario está autenticado, permite el acceso (true)
          return true;
        } else {
          // Si NO está autenticado, lo redirige a la página de login
          this.router.navigate(['/login']); 
          return false;
        }
      })
    );
  }
}