import { Component, OnInit } from '@angular/core';
import { StoryService } from './story.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  storys: any[];
  domain:any;
  editiStory: any; // the Story currently being edited
  public editorData ="";
  waiting:Boolean=true;

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.setTokenValue();
    this.setAuth();
    this.getDomain();
    this.getStorys();
    
  }

  edit(story:any):void{
    this.editiStory=story;
    //console.log(this.editiStory);
    this.editorData=this.editiStory.story;
    console.log(this.editorData);
    //this.editorData=this.editiStory.story.replace(new RegExp("\n", "g"), "<br>");       
  }

 

  getStorys(): void {
    this.storyService.getStoryData()
      .subscribe({
        next:i => {this.storys = i},
        error:err=>{alert("系統錯誤");},
        complete:()=>{
          this.waiting=false;
          this.edit(this.storys[0]);

        }
      });
  }


  getDomain(): void {

    this.storyService.getDomainData()
      .subscribe({
        next:i => {this.domain = i},
        error:err=>{alert("系統錯誤");},
        complete:()=>{
        //  this.waiting=false;
         // this.edit(this.storys[0]);
         console.log("載入Domain api Success");
         //this.domain=this.domain.replace(new RegExp("\n", "g"), "<br>");       
         

        }
      });
  }


  updatestory(data:string):void{
    //data=data.replace(new RegExp("<br>", "g"), "\n"); 
    //data=data.replace(new RegExp("<p>", "g"), ""); 
    //data=data.replace(new RegExp("</p>", "g"), "");
    this.editorData="更新成功";
    this.storyService.updateStory(this.editiStory.id, data)
        .subscribe({
          next:i => {},
          error:err=>{alert("系統錯誤");},
          complete:()=>{
            //this.editorData=this.editiStory.story;
           
           console.log("update success");
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
    this.storyService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }

  setTokenValue():void{
    let tokendata=localStorage.getItem("access_token");
    this.storyService.setTokenValue(tokendata);
  }

  

}
