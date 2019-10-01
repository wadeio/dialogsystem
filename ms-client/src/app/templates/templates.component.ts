import { Component, OnInit } from '@angular/core';
import { TemplatesService } from './templates.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  templatesAll: any[];
  waiting:Boolean=true;
  constructor(private templatesService: TemplatesService) { }

  ngOnInit() {
    this.setAuth();
    this.getTemplates();
  }

  getTemplates(): void {
    this.templatesService.getTemplatesData()
      .subscribe({
        next:tm => {this.templatesAll = tm;},
        error:err=>{alert("系統錯誤");},
        complete:()=>{
          this.waiting=false;
        }
      });
  }


  add(uttertext: string,message:string): void {
    uttertext = uttertext.trim();
    if (!uttertext) { return; }

    message = message.trim();
    if (!message) { return; }

    let newtemplate={text:message,template:uttertext};

    this.templatesService.addTemplates(newtemplate)
      .subscribe(i => this.templatesAll.push(i));

      //$('#TrainDataModal').modal('hide')     
      
  }

  delete(template: any): void {
    this.templatesAll = this.templatesAll.filter(h => h !== template); //過濾template 返回新陣列
    this.templatesService.deleteTemplateData(template.id).subscribe();
     
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }


  setAuth():void{
    let tokendata=localStorage.getItem("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': tokendata
      })
    };
    this.templatesService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }
 
  

}
