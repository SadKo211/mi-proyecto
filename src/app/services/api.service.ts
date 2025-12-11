import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private http = inject(HttpClient);
  private storage = inject(Storage);
  private _storage: Storage | null = null;

  constructor() {
    this.init();
  }

  async init() {
    // Si falla la creación, atrapamos el error para que no rompa la app
    try {
      const storage = await this.storage.create();
      this._storage = storage;
    } catch (e) {
      console.error('Error inicializando storage', e);
    }
  }

  getProductos() {
    return this.http.get<any[]>('assets/data/productos.json');
  }

  async setUsuario(key: string, valor: any) {
    await this._storage?.set(key, valor);
  }

  async getUsuario(key: string) {
    return await this._storage?.get(key);
  }
}