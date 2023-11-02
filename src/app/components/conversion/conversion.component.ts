import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/interfaces/list-exchange-rate';
import { GetExchangeRateService } from 'src/app/services/getExchangeRate.service';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {

  public firstCurrencyRate: Rate
  public firstInput: string = '100.00';
  public firstInputLabel: string
  public firstPlaceholder: string = '0.00'

  public secondCurrencyRate: Rate
  public secondInput: string = '100.00';
  public secondInputLabel: string
  public secondPlaceholder: string = '0.00'
  
  constructor(public getExchangeRate: GetExchangeRateService) { }

  ngOnInit(): void {
    this.initExchangeRate()
    const qwe = document.getElementById('firstCurrency')
  }

  private initExchangeRate(){
    this.getExchangeRate.listOfRate.subscribe((listOfRate) => {
      if(this.getExchangeRate.listOfRate.value[0]){
      this.firstCurrencyRate = listOfRate[0]
      this.secondCurrencyRate = listOfRate[0]
      this.firstInputLabel = this.firstCurrencyRate.cc
      this.secondInputLabel = this.secondCurrencyRate.cc
      this.getSumInSecondInput()
      this.setFirstCurrency('13')
      this.setSecondCurrency('10')
    }
    })
  }

  public setFirstCurrency(i: string): void{
     this.firstCurrencyRate = this.getExchangeRate.listOfRate.value[+i]
     this.firstInputLabel = this.getExchangeRate.listOfRate.value[+i].cc
     this.getSumInSecondInput()
  }

  public setSecondCurrency(i: string): void{
    this.secondCurrencyRate = this.getExchangeRate.listOfRate.value[+i]
    this.secondInputLabel = this.getExchangeRate.listOfRate.value[+i].cc
    this.getSumInSecondInput()
 }

  public getSumInSecondInput(): void {
    if(this.getExchangeRate.listOfRate.value.length) {
      let result: number = ((+this.firstInput * this.firstCurrencyRate.rate) / this.secondCurrencyRate.rate)
      this.secondInput = result.toFixed(2)
      if(isNaN(result)) {
        this.secondInput = ''
        this.secondPlaceholder = 'Введіть цифри'
      }
  }}

  public getSumInFirstInput(): void {
    if(this.getExchangeRate.listOfRate.value.length) {
      let result: number = (+this.secondInput * this.secondCurrencyRate.rate) / this.firstCurrencyRate.rate
      this.firstInput = result.toFixed(2)
      if(isNaN(result)) {
        this.firstInput = ''
        this.firstPlaceholder = 'Введіть цифри'
      }
  }}


}
