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
  public firstInput: string = '100.00';
  public firstInputLabel: string
  public firstPlaceholder: string = '0.00'

  public secondCurrency: Rate
  public secondInput: string = '100.00';
  public secondInputLabel: string
  public secondPlaceholder: string = '0.00'

  setFirstCurrency(i: string): void{
     this.firstCurrency = this.getExchangeRate.listOfRate.value[+i]
     this.firstInputLabel = this.getExchangeRate.listOfRate.value[+i].cc
     this.getSumInSecondInput()
  }

  setSecondCurrency(i: string): void{
    this.secondCurrency = this.getExchangeRate.listOfRate.value[+i]
    this.secondInputLabel = this.getExchangeRate.listOfRate.value[+i].cc
    this.getSumInSecondInput()
 }

  getSumInSecondInput(): void {
    if(this.getExchangeRate.listOfRate.value.length) {
      let result: number = ((+this.firstInput * this.firstCurrency.rate) / this.secondCurrency.rate)
      this.secondInput = result.toFixed(2)
      if(isNaN(result)) {
        this.secondInput = ''
        this.secondPlaceholder = 'Введіть цифри'
      }
  }}

  getSumInFirstInput(): void {
    if(this.getExchangeRate.listOfRate.value.length) {
      let result: number = (+this.secondInput * this.secondCurrency.rate) / this.firstCurrency.rate
      this.firstInput = result.toFixed(2)
      if(isNaN(result)) {
        this.firstInput = ''
        this.firstPlaceholder = 'Введіть цифри'
      }
  }}

  constructor(public getExchangeRate: GetExchangeRateService) { }

  ngOnInit(): void {
    this.getExchangeRate.listOfRate.subscribe((listOfRate) => {
      if(this.getExchangeRate.listOfRate.value[0]){
      this.firstCurrency = listOfRate[0]
      this.secondCurrency = listOfRate[0]
      this.firstInputLabel = this.firstCurrency.cc
      this.secondInputLabel = this.secondCurrency.cc
      this.getSumInSecondInput()}
    })
  }

}
