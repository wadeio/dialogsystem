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
  editiStory: any; // the Story currently being edited
  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.setAuth();
    this.getStorys();
  }

  edit(story:any):void{
    this.editiStory=story;
    this.editiStory.story=this.editiStory.story.replace(new RegExp("\n", "g"), "<br>"); 
  }

 

  getStorys(): void {
    this.storyService.getStoryData()
      .subscribe(i => this.storys = i);
  }

  setAuth():void{
    let tokendata=localStorage.getItem("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': tokendata
      })
    };
    this.storyService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }

}
