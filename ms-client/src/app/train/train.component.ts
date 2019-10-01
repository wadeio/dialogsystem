import { Component, OnInit } from '@angular/core';
import { TrainService } from './train.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  constructor(private trainService: TrainService) { }

  result: any[];
  ngOnInit() {
    this.setAuth();
  }


  starttrain(): void {
    this.trainService.traindata()
      .subscribe(i => this.result=i);    
  }

  setAuth():void{
    let tokendata=localStorage.getItem("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': tokendata
      })
    };
    this.trainService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }

}
