import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-new-page-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,    
  ],
  templateUrl: './new-page-dialog.component.html',
  styleUrl: './new-page-dialog.component.css'
})
export class NewPageDialogComponent {
  constructor (
    public dialogRef: MatDialogRef<NewPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newPageName: string,    
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
