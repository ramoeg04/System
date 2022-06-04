import { Component, OnInit } from '@angular/core';
import { csf } from 'src/app/core/global';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public csf = csf;
  constructor() { }

  ngOnInit(): void {
  }

  sesion(){
    
  }
}
