import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userPayload: any;
  role: string = "ABM";
  userEmail : string = "demouser@gmail.com";

  

  constructor(private auth: AuthService) { 
    // this.userPayload = auth.decodeToken();
    // console.log(this.userPayload)

    // this.role = this.userPayload.role;
    // this.userEmail = this.userPayload['unique_name']
    
  }
 
  ngOnInit() {

  }
}
