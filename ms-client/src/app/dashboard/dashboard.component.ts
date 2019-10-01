import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule, Routes ,Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.verificationAuth();
  }


  verificationAuth():void{
    const state=localStorage.getItem("access_token");
    if(state==null){
      this.router.navigate(["/login"]);
    }else{
      this.router.navigate(["/dashboard"]);
    }
  }
  
}
