import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  configdata: any;
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.getConfigData();
    console.log("測試"+this.configdata);
    
  }

  getConfigData(): void {
    this.settingsService.getConfigData()
      .subscribe(i => this.configdata==i);
  }
}
