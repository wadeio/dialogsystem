import { Component, OnInit } from '@angular/core';
import { TrainService } from './train.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  modelsAll: any[];
  waiting:Boolean=true;
 // editiTemplate: any; // the template currently being edited
  result: any[];
  currentmodel:any;


  constructor(private trainService: TrainService) { }

  ngOnInit() {
    this.setAuth();
    this.getModels();
  
  }
  
  getModels(): void {
    this.trainService.getModels()
      .subscribe({
        next:tm => {this.modelsAll = tm;},
        error:err=>{alert("系統錯誤");},
        complete:()=>{
          //this.waiting=false;
          
            for (var index = 0; index <  this.modelsAll.length; index++) {
              var date=this.processdate(this.modelsAll[index].trained_at);
              this.modelsAll[index].trained_at_=date;
            }
           this.waiting=false;
        }
      });
  }
 
  getcurrentModel(): void {
    this.trainService.getcureentModel()
      .subscribe({
        next:tm => {this.currentmodel = tm;},
        error:err=>{alert("系統錯誤");},
        complete:()=>{
          //this.waiting=false;
       
          //this.currentmodel.trained_at_=this.processdate(this.currentmodel.trained_at);
          //this.modelsAll.push(this.currentmodel);
        }
      });
  }
  

  processdate(undata:any):any{
          var readdate =new Date(undata);
          return readdate;
  }

  starttrain(): void {
    this.trainService.traindata()
      .subscribe({
        next:i=>{
          this.result=i;


          /*
          var ix = i ? this.modelsAll.findIndex(h => h.model === i.model) : -1;
          console.log(this.modelsAll.length);
              if (ix > -1) { 
                ix=this.modelsAll.length+1;
                this.modelsAll[ix] = i;
              }
        */
        },
        error:err=>{alert("系統錯誤");},
        complete:()=>{
          alert("訓練完成");
       
        }
      
      });    
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
