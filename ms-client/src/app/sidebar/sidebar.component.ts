import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  sidebarobj = [{id:1,title:'機器人',icon:'app-menu__icon fa fa-android',class:'app-menu__item active'}, 
              {id:2,title:'意圖',icon:'app-menu__icon fa fa-bars',class:'app-menu__item'}, 
              {id:3,title:'實體',icon:'app-menu__icon fa fa-th-list',class:'app-menu__item'}, 
              {id:9,title:'定義回應',icon:'app-menu__icon fa fa-pencil-square-o',class:'app-menu__item'},
              {id:5,title:'故事',icon:'app-menu__icon fa fa-sticky-note',class:'app-menu__item'}, 
              {id:6,title:'訓練',icon:'app-menu__icon fa fa-rocket',class:'app-menu__item'}, 
              {id:7,title:'對話測試',icon:'app-menu__icon fa fa-commenting-o',class:'app-menu__item'}, 
              {id:4,title:'控制',icon:'app-menu__icon fa fa-cog',class:'app-menu__item'},
              {id:8,title:'API服務',icon:'app-menu__icon fa fa-file-text',class:'app-menu__item'},
              ];

  currentstate="app-menu__item";
  view1:boolean=true;
  view2:boolean=false;
  view3:boolean=false;
  view4:boolean=false;
  view5:boolean=false;
  view6:boolean=false;
  view7:boolean=false;
  view8:boolean=false;
  view9:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  changeview(id:number){
    event.preventDefault();
    
    if(id===1){
      this.view1=true;
      this.view2=false;
      this.view3=false;
      this.view4=false;
      this.view5=false;
      this.view6=false;
      this.view7=false;
      this.view8=false;
      this.view9=false;
    }else if(id==2){
      this.view1=false;
      this.view2=true;
      this.view3=false;
      this.view4=false;
      this.view5=false;
      this.view6=false;
      this.view7=false;
      this.view8=false;
      this.view9=false;
    }else if(id==3){
      this.view1=false;
      this.view2=false;
      this.view3=true;
      this.view4=false;
      this.view5=false;
      this.view6=false;
      this.view7=false;
      this.view8=false;
      this.view9=false;
    }else if(id==4){
      this.view1=false;
      this.view2=false;
      this.view3=false;
      this.view4=true;
      this.view5=false;
      this.view6=false;
      this.view7=false;
      this.view8=false;
      this.view9=false;
    }else if(id==5){
      this.view1=false;
      this.view2=false;
      this.view3=false;
      this.view4=false;
      this.view5=true;
      this.view6=false;
      this.view7=false;
      this.view8=false;
      this.view9=false;
    }else if(id==6){
      this.view1=false;
      this.view2=false;
      this.view3=false;
      this.view4=false;
      this.view5=false;
      this.view6=true;
      this.view7=false;
      this.view8=false;
      this.view9=false;
    }else if(id==7){
      this.view1=false;
      this.view2=false;
      this.view3=false;
      this.view4=false;
      this.view5=false;
      this.view6=false;
      this.view7=true;
      this.view8=false;
      this.view9=false;
    }else if(id==8){
      this.view1=false;
      this.view2=false;
      this.view3=false;
      this.view4=false;
      this.view5=false;
      this.view6=false;
      this.view7=false;
      this.view8=true;
      this.view9=false;
    }else if(id==9){
      this.view1=false;
      this.view2=false;
      this.view3=false;
      this.view4=false;
      this.view5=false;
      this.view6=false;
      this.view7=false;
      this.view8=false;
      this.view9=true;
    }

}

  
 
}
