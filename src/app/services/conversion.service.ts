import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  url: string = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

  constructor(private http: HttpClient) {}
  // get results of conversion
  // aplicar interfaz
  /**
   * Petición http Devuelve todos los tipos de cambio
   * @returns Observable 
   */
  getChange(): Observable<any> {
    let result = this.http.get<any>(this.url);
    console.log(result);
    return result;
  }
}
