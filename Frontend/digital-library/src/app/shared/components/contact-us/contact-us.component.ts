import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../../api-client/api-client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit {
  supportEmail = 'support@digitallibrary.com';
  supoortTele = '+1 (234) 567-890';
  contactForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly feedbackService: FeedbackService, private readonly _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      this.feedbackService.postFeedback(formData).subscribe({
        next: (rsp: Feedback) => {
          if(rsp) {
            this._snackBar.open('Feedback added successfully', 'OK', {duration:3000});
            this.contactForm.reset();
          }
        },
        error: () => {
          this._snackBar.open('Error while saving feedback', 'OK', {duration:3000});
        }
      });
    } else {
      this._snackBar.open('Invalid feedback form.', 'OK', {duration:3000});
    }
  }
}
