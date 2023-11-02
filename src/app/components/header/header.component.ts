import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/interfaces/list-exchange-rate';
import { GetExchangeRateService } from 'src/app/services/getExchangeRate.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public dollar: Rate
  public euro: Rate
  public currentDate: Date = new Date()
  public $isSmallScreen!: boolean

  constructor(
    public getExchangeRateService: GetExchangeRateService,
    public breakpoint: BreakpointObserver
    ) {}

  ngOnInit(): void {
    this.subscribeOnListOfRate()
    this.isSmallScreen()
  }

  private subscribeOnListOfRate(){
    this.getExchangeRateService.listOfRate.subscribe((listOfRate) => {
      this.dollar = listOfRate.find(item => item.txt == 'Долар США')
      this.euro = listOfRate.find(item => item.txt == 'Євро')
    })
  }

  public isSmallScreen(): void {
     this.breakpoint.observe('(max-width: 769px)').subscribe((isSmall) => {
      this.$isSmallScreen = isSmall.matches
      console.log(this.$isSmallScreen)
     })
  }

}
