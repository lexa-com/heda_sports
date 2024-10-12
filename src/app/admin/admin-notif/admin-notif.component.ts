import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-notif',
  templateUrl: './admin-notif.component.html',
  styleUrl: './admin-notif.component.css'
})
export class AdminNotifComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminNotifComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router
  ) {}

  message:any

  ngOnInit(): void {
    this.message = this.Data
  }

  goBack(verdict:string) {
    this.dialogRef.close({ event: 'close', data: verdict });
  }}