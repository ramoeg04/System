import { Component, OnInit } from '@angular/core';
import { cr, csf, gp } from 'src/app/core/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public csf = csf;
  public cr = cr;
  public gp = gp;
  constructor() { }

  ngOnInit(): void {
  }

}
