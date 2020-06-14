import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  set(key, value): Promise<any>{
    return this.storage.set(key,value);
  }

  get(key): Promise<any>{
    return this.storage.get(key);
  }

  remove(key): Promise<any>{
    return this.storage.remove(key);
  }
}
