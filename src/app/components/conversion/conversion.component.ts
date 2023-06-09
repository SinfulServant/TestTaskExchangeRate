import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/interfaces/list-exchange-rate';
import { GetExchangeRateService } from 'src/app/services/getExchangeRate.service';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {
  public firstCurrency: Rate
  public secondCurrency: Rate
  public inputFirst: string = '100.00';
  public inputSecond: string = '100.00';
  public firstInputLabel: string
  public secondInputLabel: string



  setFirstCurrency(i: string){
     this.firstCurrency = this.getExchangeRate.listOfRate.value[+i]
     this.firstInputLabel = this.getExchangeRate.listOfRate.value[+i].cc
     this.getSumInSecondInput()
  }

  setSecondCurrency(i: string){
    this.secondCurrency = this.getExchangeRate.listOfRate.value[+i]
    this.secondInputLabel = this.getExchangeRate.listOfRate.value[+i].cc
    this.getSumInFirstInput()
 }

  getSumInSecondInput(): void {
    if(this.getExchangeRate.listOfRate.value[0]) {
      let result: number = (+this.inputFirst * this.firstCurrency.rate) / this.secondCurrency.rate
      this.inputSecond = result.toFixed(2)
  }}

  getSumInFirstInput(): void {
    if(this.getExchangeRate.listOfRate.value[0]) {
      let result: number = (+this.inputSecond * this.secondCurrency.rate) / this.firstCurrency.rate
      this.inputFirst = result.toFixed(2)
  }}

  constructor(public getExchangeRate: GetExchangeRateService) { }

  ngOnInit(): void {
    this.getExchangeRate.listOfRate.subscribe((listOfRate) => {
      this.firstCurrency = listOfRate[0]
      this.secondCurrency = listOfRate[0]
      this.firstInputLabel = this.firstCurrency.cc
      this.secondInputLabel = this.secondCurrency.cc
      this.getSumInSecondInput()
    })
  }

}
