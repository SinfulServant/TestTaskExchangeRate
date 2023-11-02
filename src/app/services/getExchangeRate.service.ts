import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rate } from '../interfaces/list-exchange-rate';
import { BehaviorSubject } from 'rxjs';

const urlOfRate: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

@Injectable({
  providedIn: 'root'
})
export class GetExchangeRateService {
public listOfRate = new BehaviorSubject <Rate[]> ([])

getExchangeRate(){
  this.http.get<Rate[]>(urlOfRate).subscribe((res: Rate[]) => {
    res.push({
      r030: 980,
      txt: 'Гривня',
      rate: 1,
      cc: 'UAH',
      exchangedate: res[0].exchangedate
    })
    this.listOfRate.next(res.sort((a, b) => {
      return a.txt.toLowerCase() < b.txt.toLowerCase() ? -1 : a.txt.toLowerCase() > b.txt.toLowerCase() ? 1 : 0
      }))
      console.log(this.listOfRate.value)
  })
}

  constructor(public http: HttpClient) { }
}
