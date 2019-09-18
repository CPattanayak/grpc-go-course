import { Component, OnInit } from '@angular/core';
import {GreetService} from './greet.service';
import { GreetManyTimeResponse, GreetResponse, GreetEveryOneResponse} from '../app/proto/greetpb/greet_pb';
import { Observable, Subscription, of , BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public api: GreetService
  ) {}

  greet: GreetResponse;
  bidirectionalResponse : string;

 bidirectionalResponseObs1 : Observable<string[]>;
  title = 'ui-client';
  ngOnInit(): void {
    this.getSingle();

    this.api.getGreatError();
    const receivedList = new Array<string>();
    const bidirectionalResponseObs = new BehaviorSubject<string[]>([]);
    const startDate = new Date();
    this.api.processArrayPromiseReduce().then((data: any) => {
      const endDate = new Date();
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
      this.bidirectionalResponse = 'Server process data length ' + data + ' in ' + seconds + ' .sec';
      if(data <= 100000){
      this.api.getStream().subscribe(data1 => {
        receivedList.push(data1['result']);
        bidirectionalResponseObs.next(receivedList);
        this.bidirectionalResponseObs1 = bidirectionalResponseObs.asObservable();
      });
      }
     });


  }

  getSingle() {
    this.api.getGreat().then((data: GreetResponse) => {
      this.greet = data;

    });
  }
}
