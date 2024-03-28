import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthService } from '../auth.service';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-otp-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgOtpInputModule
  ],
  templateUrl: './otp-page.component.html',
  styleUrl: './otp-page.component.css'
})
export class OtpPageComponent implements OnInit {

  otp: any;
  isOtpValid: boolean = false;
  isBUttonClicked: boolean = false;
  userData: any;
  message: any;

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '40px',
      'font-size': '20px',
      'color': '#3f51b5'
    }
  };

  constructor(private router: Router, private authService: AuthService, private tableDataService: TableDataService) {
  }

  ngOnInit() {
    this.authService.userAuthData.subscribe(res => {
      console.log("DATA IN OTP PAGE", res);
      this.userData = res;
    })
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (otp.length == 6) {
      this.isOtpValid = true;
    }
    else {
      this.isOtpValid = false;
    }
  }

  resendOTP() {

  }

  onOtpSubmit() {
    this.isBUttonClicked = true;
    this.userData.otp = this.otp;
    console.log("USERDATA", this.userData);

    if (this.userData && this.userData.sapCode) {
      this.authService.loginWithOTP(this.userData).subscribe((res: any) => {
        console.log("!!!!!!!!", res);
        if (res) {
          this.message = res?.message
          sessionStorage.setItem('SessionID', res.sessionId);
          this.tableDataService.openSnackBar(this.message);
          sessionStorage.setItem('username', res.username);
          sessionStorage.setItem('sapCode', this.userData.sapCode);
          this.isBUttonClicked = false;
          this.router.navigate(['home']);
        }
        else {
          this.message = "Invalid OTP"
          this.tableDataService.openSnackBar(this.message);
          this.isBUttonClicked = false;
        }
      },
        (err) => {
          if (err.status != 200) {
            this.message = "Invalid OTP"
            this.tableDataService.openSnackBar(this.message);
            this.isBUttonClicked = false;
          }
          else if (err.status == 200) {
            this.message = "Welcome user!!"
            this.tableDataService.openSnackBar(this.message);
            sessionStorage.setItem('sapCode', this.userData.sapCode);
            this.isBUttonClicked = false;
            this.router.navigate(['home']);
          }
        })
    }

    else if (this.userData && this.userData.username) {
      this.authService.signupWithOTP(this.userData).subscribe((res) => {
        console.log(res);
      },
        (err) => {
          if (err.status != 200) {
            this.message = "Invalid OTP!!"
            this.tableDataService.openSnackBar(this.message);
          }
          else if (err.status == 200) {
            this.message = "User Registered Successfully!!"
            this.tableDataService.openSnackBar(this.message);
            this.router.navigate(['']);
          }
        })
    }
  }
}
