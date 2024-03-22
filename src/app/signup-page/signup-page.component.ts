import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgOtpInputModule,
    CommonModule,
    MatCommonModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {

  isPasswordMatch: boolean = false;
  message: any;
  isBUttonClicked: boolean = false;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tableDataService: TableDataService) {

  }

  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/)]],
    username: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)]],
    mailId: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    confirmPassword: ['', [Validators.required]]
  })


  gotoLogIn() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.isBUttonClicked = true;
    console.log("Form value", this.signUpForm.value);
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).subscribe((res) => {
        if (res) {

        }
      },
        (err) => {
          console.log("error", err);
          if (err.status != 200) {
            this.message = "Something went Wrong!!"
            this.tableDataService.openSnackBar(this.message);
            this.isBUttonClicked = false;
          }
          else if (err.status == 200) {
            this.authService.sendData(this.signUpForm.value);
            this.isBUttonClicked = false;
            this.router.navigate(['otp-validation']);
          }
        })
    }

  }

  matchPassword(event: any) {
    console.log("match", event.target.value);
    console.log("match2", this.signUpForm.get('password')?.value);

    if (event.target.value && event.target.value === this.signUpForm.get('password')?.value) {
      this.isPasswordMatch = true
    }
    else {
      this.isPasswordMatch = false;
    }
  }
}
