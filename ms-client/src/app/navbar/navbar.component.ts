import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }
 
  bodyclass="app sidebar-mini rtl";
  ngOnInit() {
  }


  profile():void{
    event.preventDefault();
    
  }
  setting():void{
    event.preventDefault();
  }

  switchsidebar(){
    event.preventDefault();
    if(this.bodyclass=="app sidebar-mini rtl"){
      this.bodyclass="app sidebar-mini rtl sidenav-toggled";
    }else{
      this.bodyclass="app sidebar-mini rtl";
    }


  }

  logout():void{
    event.preventDefault();
    localStorage.removeItem("access_token");
    alert("登出成功");
    this.router.navigate(["/login"]);
  }
}
