import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds (3 seconds in this case)
      panelClass: ['success-toast'], // Custom CSS class for styling
    });
  }
}
