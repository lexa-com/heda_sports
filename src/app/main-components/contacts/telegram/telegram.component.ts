import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrl: './telegram.component.css'
})
export class TelegramComponent {

  dialogConfig: MatDialogConfig<any> | undefined;

  telegram:any;

  constructor(
    public dialogRef: MatDialogRef<TelegramComponent>,
  ) {}

  closeDial() {
    this.dialogRef.close()
  }
}
