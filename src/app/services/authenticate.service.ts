import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private users = [
    { email: 'elbab@gmail.com', password: '1234', roles: ['ADMIN', 'USER'] },
    { email: 'hugo@gmail.com', password: '1234', roles: ['USER'] },
  ];
  // Clé secrète pour le chiffrement/déchiffrement (devrait idéalement provenir d'une variable d'environnement).
  private secretKey = 'mySuperSecretKey123!';
  constructor() { }

  // Chiffrer les données avant de les stocker dans le localStorage.
  private encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  // Déchiffrer les données lors de la récupération depuis le localStorage
  private decryptData(cipherText: string): any {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    return user?.roles?.includes('ADMIN') || false;
  }

  login(credentials: { username: string; password: string }): boolean {

    const user = this.users.find(
      u => u.email === credentials.username && u.password === credentials.password
    );

    if (user) {
      // Chiffrer et stocker les informations de l'utilisateur
      localStorage.setItem('user', this.encryptData(user));
      return true;
    }
    return false;
  }


  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  getLoggedInUser(): any {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      return this.decryptData(encryptedUser);
    }
    return null;
  }
}
