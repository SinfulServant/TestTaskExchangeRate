import { Component, OnInit } from '@angular/core';
import { GetExchangeRateService } from './services/getExchangeRate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TestTask';

  ngOnInit(): void {
    this.getExchangeRate.getExchangeRate()
  }

  constructor(private getExchangeRate: GetExchangeRateService){

  }
}
