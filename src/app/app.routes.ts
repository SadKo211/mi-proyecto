import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// 1. IMPORTAR LA CLASE GUARDIA AQUÍ (Usamos el nombre de la Clase: AuthGuard)
import { AuthGuard } from './guards/auth.guard'; // <-- Corregido para usar el nombre de la Clase (Mayúscula)

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // Usamos el nombre de la CLASE como token de inyección
    canActivate: [AuthGuard], 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    canActivate: [AuthGuard], 
  },
  {
    path: 'perfil', // <--- ESTA ES LA RUTA IMPORTANTE
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'config',
    loadComponent: () => import('./config/config.page').then( m => m.ConfigPage),
    canActivate: [AuthGuard], 
  }, 
  {
    path: 'detalle',
    loadComponent: () => import('./detalle/detalle.page').then( m => m.DetallePage),
    canActivate: [AuthGuard], 
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./recuperar/recuperar.page').then( m => m.RecuperarPage)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}