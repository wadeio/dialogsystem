import { Component, OnInit } from '@angular/core';

import { IntentsService } from './intents.service';
import { Intents } from './intents';

import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-intents',
  templateUrl: './intents.component.html',
  styleUrls: ['./intents.component.css']
})
export class IntentsComponent implements OnInit {
  intents: Intents[];
  editiIntent: Intents; // the Intents currently being edited
  waiting:Boolean=true;

  constructor(private intentsService: IntentsService) { }

  ngOnInit() {
    this.setAuth();
    this.getIntentlist(); 
  }

  onKeytext(msr:string):void{
    this.editiIntent.text=msr
  }

  onKeyintent(msr:string):void{
    this.editiIntent.intent=msr
  }

 
  getIntentlist(): void {
    this.intentsService.getIntentsData()
      .subscribe({
            next:intents => {this.intents = intents;
          },error:err=>{
            alert("系統錯誤");
          },complete:()=>{
              this.waiting=false;
          }
      });
  }
  

  delete(intent: Intents): void {
    this.intents = this.intents.filter(h => h !== intent); //過濾intent 返回新陣列
    this.intentsService.deleteIntentsData(intent.id).subscribe();
     
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }


  add(name: string,message:string): void {
    //alert(name+"\n"+message);
     
    //this.editHero = undefined;
    name = name.trim();
    if (!name) { return; }

    message = message.trim();
    if (!message) { return; }

    let newTrainintent={intent:name,text:message,project_id:"default",team:"rasa",entities:[]};

    this.intentsService.addtrainintent(newTrainintent)
      .subscribe(i => this.intents.push(i));

      //$('#TrainDataModal').modal('hide')     
      
  }

  edit(intents) {
    this.editiIntent = intents;
  }

  update() {
    if (this.editiIntent) {

      this.intentsService.updatetrainintent(this.editiIntent)
        .subscribe(i => {
          // replace the intent in the intents list with update from server
          const ix = i ? this.intents.findIndex(h => h.id === i.id) : -1;
          if (ix > -1) { this.intents[ix] = i; }
        });
        //reset data
       // this.editiIntent = undefined;
    }
  }

  setAuth():void{
    let tokendata=localStorage.getItem("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': tokendata
      })
    };
    this.intentsService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }
 

}
