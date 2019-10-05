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
  editiTemplate: any; // the template currently being edited
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

  edit(objtemp:any):void{
    this.editiTemplate=objtemp;
    //alert(this.editiTemplate.text+"\n"+this.editiTemplate.template);
  }

  onKeytemplate(msr:string):void{
    this.editiTemplate.template=msr;
  }

  onKeytext(msr:string):void{
    this.editiTemplate.text=msr;
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

  update() {
    if (this.editiTemplate) {

      var editortemp={
          text:this.editiTemplate.text,
          template:this.editiTemplate.template,
          id:this.editiTemplate.id};

      this.templatesService.updatetemplate(editortemp)
        .subscribe(i => {
          // replace the intent in the intents list with update from server
          const ix = i ? this.templatesAll.findIndex(h => h.id === i.id) : -1;
          if (ix > -1) { this.templatesAll[ix] = i; }
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
    this.templatesService.setToken(httpOptions);
    //alert("test"+localStorage.getItem("access_token"));
  }
 
  

}
