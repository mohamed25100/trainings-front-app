import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/Training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listTrainings: Training[] | undefined;
  error: string | undefined | null;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllTrainings();
  }
  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next: (data) => this.listTrainings = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }

  onDelete(trainingId: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      this.apiService.deleteTraining(trainingId).subscribe({
        next: () => {
          alert(`La formation avec l'ID ${trainingId} a été supprimée avec succès.`);
          this.getAllTrainings(); // Refresh the list after deletion
        },
        error: (err) => alert(`Erreur lors de la suppression de la formation : ${err.message}`)
      });
    }
  }
}
