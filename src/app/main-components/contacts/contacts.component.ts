import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TelegramComponent } from './telegram/telegram.component';
import { VvipService } from '../../Services/vip.service/vvip.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  dialogConfig: MatDialogConfig<any> | undefined;
  today: any;

  feedbackForm: FormGroup;
email: string = 'heda.devsinc@gmail.com';
inst: string = '@heda_sports';

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private messageService:VvipService
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      date: ['', Validators.required],
    
    });
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = todayDate.getFullYear();

    // Set today's date in YYYY-MM-DD format
    this.today = `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.dialogConfig = new MatDialogConfig();
  }

  onSubmit(form: any) {
    console.log(form.value)
    if (form.valid) {
      this.messageService.sendMessage([form.value]).subscribe((res)=>{
        alert('Thank you for contacting us! We will get back to you soon.');
        form.reset(); 
      })
    }
  }
  openDialog() {

    const dialogRef = this.dialog.open(TelegramComponent, {
      width: '400px',
      height:'520px'
    });
  }

  openEmail() {
    const email = this.email; // Get the email from your component's data
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailUrl, '_blank');
  }
  
}