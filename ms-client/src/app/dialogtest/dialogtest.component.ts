import { Component, OnInit } from '@angular/core';
import { DialogtestService } from './dialogtest.service';

import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-dialogtest',
  templateUrl: './dialogtest.component.html',
  styleUrls: ['./dialogtest.component.css']
})
export class DialogtestComponent implements OnInit {
    messagelist:any[]=[];
    responsedata:any[]=[];
    response:any[]=[];
 
    
 
  constructor(private dialogtestService: DialogtestService) { }

  ngOnInit() {
    this.setAuth();
  }

  sendmessage(msr:string): void {
    

    msr = msr.trim();
     if (!msr) { return; }

    var usersession={
      id:1,
      user:"張庭浩",
      text:msr,
      project_id:"default",
      team:"rasa"};
      
     this.messagelist.push(usersession);
     //alert(sessionobj.text);

     let sessionobj={"message":usersession.text};

     this.dialogtestService.sendmessage(sessionobj)
       .subscribe({
          next:x=>{this.response=x;
          },
          error:err=> {
            alert("系統錯誤");
          },
          complete:()=>{
           // if(this.response['text']==null){
          //    alert("機器人錯誤 請重新整理");
            //  return ;
            //}else{

              //alert(this.response[0].text);
              //console.log(this.response[0].text);

              var usersession={
                id:0,
                user:"無敵破壞王",
                text:this.response[0].text,
                project_id:"default",
                team:"rasa"};

              this.messagelist.push(usersession);
              
              
           // }

          }
          





        });
      //if(this.responsedata.length>0){
          /*usersession={
          user:"機器人",
          text:this.responsedata[this.responsedata.length].text,
          project_id:"default",
          team:"rasa"};*/
            
          //this.messagelist.push(usersession);
   //   }
    
  }

  resetdialog():void{

    var usersession={
      id:1,
      user:"張庭浩",
      text:"/restart",
      project_id:"default",
      team:"rasa"};
      
     this.messagelist.push(usersession);
     //alert(sessionobj.text);

     let sessionobj={"message":usersession.text};

     this.dialogtestService.sendmessage(sessionobj)
       .subscribe({
          next:x=>{this.response=x;
          },
          error:err=> {
            alert("系統錯誤");
          },
          complete:()=>{
         
              var usersession={
                id:0,
                user:"無敵破壞王",
                text:"重置成功",
                project_id:"default",
                team:"rasa"};

              this.messagelist.push(usersession);
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
    this.dialogtestService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }

 
}
