import { Component, OnInit } from '@angular/core';
import {GreetService} from './greet.service';
import { GreetManyTimeResponse,GreetResponse,GreetEveryOneResponse} from '../app/proto/greetpb/greet_pb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    public api: GreetService
  ) {}
 // response: Observable <GreetManyTimeResponse> ;
  receivedList: string[] = [];
  greet: GreetResponse;
 //bidirectionalResponse : Observable <GreetEveryOneResponse>;
 bidirectionalList: string[] = [];
  ngOnInit(): void {
    this.getSingle();
    this.api.getStream().subscribe((data: object)=>{

      this.receivedList.push(data['result']);
    });
    this.api.getGreatError();
    //this.bidirectionalResponse=this.api.getGreatEveryOne();
    this.api.getGreatEveryOne().subscribe((data: object)=>{
      // alert(data['result']);
      this.bidirectionalList.push(data['result']);
    });

  }
  getSingle() {
    this.api.getGreat().then((data: GreetResponse) => {
      this.greet = data;

    });
  }
  title = 'ui-client';
}
