import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-page-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-page-dialog.component.html',
  styleUrl: './delete-page-dialog.component.css'
})
export class DeletePageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public pageName: string
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }


}
