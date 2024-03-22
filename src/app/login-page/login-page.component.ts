import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-login-page',
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
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  message = "Invalid Username or Password!!"
  isBUttonClicked: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tableDataService: TableDataService) {
  }

  loginForm = this.fb.group({
    sapCode: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/)]]
  })

  gotoSignUp() {
    this.router.navigate(['signup']);
  }

  onSubmit() {
    this.isBUttonClicked = true;
    console.log("Form value", this.loginForm.value);
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe((res) => {
        if (res) {

        }
      },
        (err) => {
          console.log("error", err);
          if (err.status != 200) {
            this.tableDataService.openSnackBar(this.message);
            this.isBUttonClicked = false;
          }
          else if (err.status == 200) {
            this.authService.sendData(this.loginForm.value);
            this.isBUttonClicked = false;
            this.router.navigate(['otp-validation']);
          }
        })
    }

  }



  forgetPassword() {

  }

  openExtensionTab() {

     window.open('chrome-extension://hbjkbkioeknibpgpifhffbpkogfglgmp/index.html', '_blank');
    // this.authService.openExtensionTab('chrome-extension://hbjkbkioeknibpgpifhffbpkogfglgmp/index.html');
  }

}
