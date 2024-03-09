import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);
  }

  getOlympicById(id: number): Observable<Olympic> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      map((olympics: Olympic[]) => [...olympics].filter(olympic => olympic.id === id)[0])
    );
  }

}
