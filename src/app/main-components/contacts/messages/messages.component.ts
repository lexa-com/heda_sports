import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  email:any;
  message:any;

  constructor(
    public dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    
  ) {}

  ngOnInit(): void {
    this.email = this.Data.email
    this.message = this.Data.message
    
  }

}
