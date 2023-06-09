import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rate } from '../interfaces/list-exchange-rate';
import { BehaviorSubject } from 'rxjs';

const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

@Injectable({
  providedIn: 'root'
})
export class GetExchangeRateService {
public listOfRate = new BehaviorSubject <Rate[]> ([])
getExchangeRate(){
  this.http.get<Rate[]>(URL).subscribe((res: Rate[]) => {
    res.push({
      r030: 980,
      txt: 'Гривня',
      rate: 1,
      cc: 'UAH',
      exchangedate: res[0].exchangedate
    })
    this.listOfRate.next(res.sort((a, b) => {
      let firstCurrency = a.txt.toLowerCase()
      let secondCurrency = b.txt.toLowerCase()
      return firstCurrency < secondCurrency ? -1 : firstCurrency > secondCurrency ? 1 : 0
      }))
      // console.log(this.listOfRate.value)
  })
}

  constructor(public http: HttpClient) { }
}
