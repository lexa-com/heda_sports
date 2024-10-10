import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router
  ) {}

  message:any

  ngOnInit(): void {
    this.message = this.Data
  }

  goBack() {
    this.dialogRef.close();
    this.router.navigate(['/auth'])
  }}