import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptographyService {

  private key = CryptoJS.enc.Utf8.parse('123456$#@$^@1ERF');
  private option: any;

  constructor() {
    this.option = {
                    keySize: 128 / 8,
                    iv: this.key,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                  };
  }

  encrypt = (plain: string): string => CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plain), this.key, this.option).toString();
  decrypt = (cipher: string): string => CryptoJS.AES.decrypt(cipher, this.key, this.option).toString(CryptoJS.enc.Utf8);

}
