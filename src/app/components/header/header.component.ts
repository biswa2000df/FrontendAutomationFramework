import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userName: any = sessionStorage.getItem('username');

  constructor(private router: Router, private authService: AuthService) { }

  gotoHome() {
    this.router.navigate(['home']);
  }

  gotoDataSheet() {
    this.router.navigate(['data-sheet']);
  }

  gotoResultPage() {
    this.router.navigate(['results']);
  }

  gotoMainController() {
    this.router.navigate(['main-controller']);
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      if (res) {
        console.log("logout", res);

      }
    },
      (err) => {
        console.log("error", err);
        if (err.status != 200) {
          console.log("ERROR WHILE LOGGING OUT");

        }
        else if (err.status == 200) {
          sessionStorage.removeItem('sapCode');
          sessionStorage.removeItem('SessionID');
          sessionStorage.removeItem('username');
          this.router.navigate(['']);
        }
      })

  }
}
