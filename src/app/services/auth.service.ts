import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs'; // ✅ Importación correcta

const AUTH_TOKEN_KEY = 'auth-token';
const USER_EMAIL_KEY = 'user-email';
const API_BASE_URL = 'http://localhost:3000'; // Tu servidor local

@Injectable({
  providedIn: 'root'
})
export class AuthService { // ✅ Exportado correctamente

  private storage = inject(Storage);
  private http = inject(HttpClient);
  private _storage: Storage | null = null;
  
  // Observable para ver si el usuario está logueado
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.initStorage().then(() => {
      this.loadToken();
    });
  }

  async initStorage() {
    this._storage = await this.storage.create();
  }

  private async loadToken() {
    const token = await this.getToken();
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async getToken(): Promise<string | null> {
    if (!this._storage) { await this.initStorage(); }
    return await this._storage?.get(AUTH_TOKEN_KEY) || null;
  }
  
  async getUserEmail(): Promise<string | null> {
    if (!this._storage) { await this.initStorage(); }
    return await this._storage?.get(USER_EMAIL_KEY) || null;
  }

  // === 1. LOGIN (Adaptado para JSON Server) ===
  async login(email: string, password: string): Promise<any> {
    try {
      // JSON Server no tiene /login. Buscamos el usuario por filtro:
      // GET http://localhost:3000/users?email=X&password=Y
      const users: any = await firstValueFrom(
        this.http.get(`${API_BASE_URL}/users?email=${email}&password=${password}`)
      );

      // Si el array tiene datos, el usuario existe y la contraseña es correcta
      if (users.length > 0) {
          const user = users[0];
          const token = 'token-simulado-' + Date.now();
          
          await this.setToken(token); 
          await this._storage?.set(USER_EMAIL_KEY, user.email);
          
          return { user: user }; 
      } else {
        throw new Error('Credenciales incorrectas');
      }

    } catch (error: any) {
      throw error; 
    }
  }

  // === 2. REGISTRO (Adaptado para JSON Server) ===
  async register(email: string, password: string): Promise<any> {
    const newUser = { email, password };
    
    try {
        // CORRECCIÓN CLAVE: Enviamos a /users, NO a /register
        const response = await firstValueFrom(
            this.http.post(`${API_BASE_URL}/users`, newUser)
        );
        return response; 
    } catch (error) {
        throw error;
    }
  }

  // === 3. RESET PASSWORD (Simulado) ===
  async resetPassword(email: string): Promise<void> {
    console.log('Simulando reset para:', email);
    // Aquí podrías validar si el usuario existe con un GET primero
    return; 
  }

  async logout(): Promise<void> {
    if (!this._storage) { await this.initStorage(); }
    await this._storage?.remove(AUTH_TOKEN_KEY);
    await this._storage?.remove(USER_EMAIL_KEY); 
    this.isAuthenticated.next(false);
  }

  private async setToken(token: string) {
    if (!this._storage) { await this.initStorage(); }
    await this._storage?.set(AUTH_TOKEN_KEY, token);
    this.isAuthenticated.next(true);
  }
}