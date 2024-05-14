import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/services/person.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialog: MatDialog
  ) {}
  newPerson: Person = {
    social_media_link: '',
    social_media_name: '',
    description: '',
  };
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveData(): void {

    this.dialogRef.close(this.newPerson);
  }
}
