import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule, Routes ,Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  users={username:"",password:""};
  config="";
  loginbox="login-box";
  error:any;
  constructor(private loginService:LoginService,private router:Router) { }
  
  ngOnInit() {
    this.verificationAuth();
  }
  
  forgetpass(){
    event.preventDefault();
    this.loginbox="login-box flipped";
  }

  goback(){
    event.preventDefault();
    this.loginbox="login-box";
  }

  onKeyemail(value: string) {
    this.users.username = value;
  }

  onKeypassword(value: string) {
    this.users.password = value;
  }
  
  
  login(){
    event.preventDefault();

    this.loginService.loginauth(this.users)
      .subscribe({
        next:x=>{this.config=x;
        },
        error:err=> {
          alert("系統錯誤");
        },
        complete:()=>{
          if(this.config['access_token']==null){
            alert("帳號密碼錯誤 請重新登入");
            return ;
          }else{
            
            //儲存token
            localStorage.setItem("access_token","Bearer "+this.config['access_token']);
            alert("登入成功"/*+this.config['access_token']*/);
            this.router.navigate(["/dashboard"]);
          }
          
        }
      }
     
      

        );
      //error => this.error = error;
      
  }

  verificationAuth():void{
    const state=localStorage.getItem("access_token");
    if(state==null){
      this.router.navigate(["/login"]);
    }else{
      this.router.navigate(["/dashboard"]);
    }
  }

  /*
  
  (data:any) => this.config={
        access_token: data['access_token']
      }
  */


/*
  showConfig() {
    event.preventDefault();
    this.loginService.getConfig()
      .subscribe((data: any) => this.config = {
          production: data['production'],
          worker:  data['worker']
      });
      error => this.error = error; // error path
      alert(this.config.worker.minimum_compatible_version);
  }

  postlogin() {
    event.preventDefault();
    this.loginService.getConfig()
      .subscribe((data: any) => this.config = {
          production: data['production'],
          worker:  data['worker']
      });

      alert(this.config.worker.minimum_compatible_version);
  }*/


}
