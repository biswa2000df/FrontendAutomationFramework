import { HttpErrorResponse } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js library
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  userName: any = sessionStorage.getItem('username');

  constructor(private router:Router, private tableDataService: TableDataService,) { }

  navigate: any = 'framework'
  onItemChange(event: any) {
    console.log("EVENT", event.target.value);
    this.navigate = event.target.value;
  }

  startProject(){
    if(this.navigate == 'framework'){
      this.router.navigate(['main-controller'])
    }
    else{
      this.tableDataService.Apmosys_IDE().subscribe(
        (res: any) => { // Explicitly specify the type of 'res'
          console.log("Console Value:", res);
        },
        (error: HttpErrorResponse) => { // Specify HttpErrorResponse type for error parameter
          console.error("Error fetching console value:", error);
        }
      );
      
    }
  }

  ngAfterViewInit(): void {
    // Initialize the anime.js timeline
    const stars = anime.timeline({});

    stars
  .add({
    targets: ".fade",
    translateY: [
      { value: "-100vh", duration: 680, easing: "easeOutExpo" },
      { value: "-200vh", duration: 680, delay: 0, easing: "easeInExpo" },
    ],
    opacity: 1,
    // delay: 100,
  })

  .add({
    targets: ".screen",
    opacity: 0,
    duration: 5,
    easing: "easeOutExpo",
    offset: "-=800",
  })

  .add({
    targets: ".bossWrapp",
    scale: ["0.9", "1"],
    translateY: ["25px", "0"],
    duration: 50,
    easing: "easeOutExpo",
    offset: "-=800",
  })

  .add({
    opacity: [{ value: 1, duration: 0, delay: 0 }],
    targets: ".bg",
    scale: ["1", "1.1"],
    translateY: ["25px", "0"],
    duration: 50,
    easing: "easeOutExpo",
    offset: "-=700",
  })

  .add({
    targets: ".star3",
    translateY: ["60px", "0"],
    opacity: 1,
    duration: 50,

    offset: "-=300",
  })

  .add({
    targets: ".star2",
    translateY: ["40px", "0"],
    opacity: 1,
    duration: 50,

    offset: "-=2050",
  })

  .add({
    targets: ".star1",
    opacity: 1,
    duration: 50,
    translateY: ["25px", "0"],

    offset: "-=2000",
  })
  .add({
    targets: "h1",
    translateY: ["105px", "0"],
    opacity: 1,
    duration: 680,
    easing: "easeOutExpo",
    offset: "-=2800",
  })
  .add({
    targets: "span",
    translateY: ["100px", "10px"],
    opacity: 1,
    duration: 10,
    easing: "easeOutExpo",
    offset: "-=2750",
  });
  }
}