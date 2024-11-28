import { Injectable } from '@angular/core';
import { Training } from '../model/Training.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getTrainings() {
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  public getTraining(id: number) {
    return this.http.get<Training>(environment.host + "/trainings/" + id);
  }

  addTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(`${environment.host}/trainings`, training).pipe(
      catchError(this.handleError)
    );
  }

  updateTraining(training: Training): Observable<Training> {
    return this.http.put<Training>(`${environment.host}/trainings/${training.id}`, training).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteTraining(trainingId: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.host}/trainings/${trainingId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur s\'est produite :', error);
    return throwError(
      'Quelque chose s\'est mal passé ; veuillez réessayer plus tard.'
    );
  }
}
