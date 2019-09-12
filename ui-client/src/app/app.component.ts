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
  bidirectionalResponse : string;
 bidirectionalList: string[] = [];
  ngOnInit(): void {
    this.getSingle();

    this.api.getGreatError();
    this.api.getGreatEveryOne().then((data:string)=>{
     // alert(data);
      this.bidirectionalResponse=data;
      this.api.getStream().subscribe((data: object)=>{

        this.receivedList.push(data['result']);
      });
    });


  }
  getSingle() {
    this.api.getGreat().then((data: GreetResponse) => {
      this.greet = data;

    });
  }
  title = 'ui-client';
}
