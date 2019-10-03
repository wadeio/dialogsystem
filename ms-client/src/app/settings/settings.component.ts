import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  configdata: any;
  waiting:Boolean=true;
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.setAuth();
    this.getConfigData(); 
  }


  getConfigData(): void {
    this.settingsService.getConfigData()
      .subscribe({
            next:i => {this.configdata=i;
          },error:err=>{
            alert("系統錯誤");
          },complete:()=>{
              this.waiting=false;
          }
      });
  }
  


  setAuth():void{
    let tokendata=localStorage.getItem("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': tokendata,
      })
    };
    this.settingsService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }

}
