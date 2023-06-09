import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/interfaces/list-exchange-rate';
import { GetExchangeRateService } from 'src/app/services/getExchangeRate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public dollar: Rate
  public euro: Rate
  
  constructor(public getExchangeRateService: GetExchangeRateService) {

  }

  ngOnInit(): void {
    this.getExchangeRateService.listOfRate.subscribe(() => {
      this.dollar = this.getExchangeRateService.listOfRate.value.find(item => item.txt == 'Долар США')
      this.euro = this.getExchangeRateService.listOfRate.value.find(item => item.txt == 'Євро')
    })
  }

}
