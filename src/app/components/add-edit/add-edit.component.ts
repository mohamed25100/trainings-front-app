import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/model/Training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {
  training: Training = { id: 0, name: '', description: '', price: 0, quantity: 0 };
  isEditMode = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true; // Edit mode
      this.apiService.getTraining(+id).subscribe({
        next: (data) => (this.training = data),
        error: (err) => alert(`Error fetching training details: ${err.message}`)
      });
    } else {
      this.isEditMode = false; // Add mode
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.apiService.updateTraining(this.training).subscribe({
        next: () => {
          alert('Training updated successfully!');
          this.router.navigate(['/admin']);
        },
        error: (err) => alert(`Error updating training: ${err.message}`)
      });
    } else {
      this.apiService.addTraining(this.training).subscribe({
        next: () => {
          alert('Training added successfully!');
          this.router.navigate(['/admin']);
        },
        error: (err) => alert(`Error adding training: ${err.message}`)
      });
    }
  }
}