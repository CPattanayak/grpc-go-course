import { Component, OnInit } from '@angular/core';
import {GreetService} from './greet.service';
import { GreetManyTimeResponse, GreetResponse, GreetEveryOneResponse,GreetEveryOneRequest,Greeting} from '../app/proto/greetpb/greet_pb';
import { Observable, Subscription, of , BehaviorSubject} from 'rxjs';
import {GreetServiceClient, Status} from '../app/proto/greetpb/greet_pb_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public api: GreetService
  ) {
    this._api=api;
  }

  greet: GreetResponse;
  bidirectionalResponse : string;
  _api :GreetService;

 bidirectionalResponseObs1 : Observable<string[]>;
  title = 'ui-client';
  ngOnInit(): void {
    this._api=this.api;
    // this.getSingle();

    // this.api.getGreatError();
    // const receivedList = new Array<string>();
    // const bidirectionalResponseObs = new BehaviorSubject<string[]>([]);
    // const startDate = new Date();
    // this.api.processArrayPromiseReduce().then((data: any) => {
    //   const endDate = new Date();
    //   const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    //   this.bidirectionalResponse = 'Server process data length ' + data + ' in ' + seconds + ' .sec';
    //   if(data <= 100000){
    //   this.api.getStream().subscribe(data1 => {
    //     receivedList.push(data1['result']);
    //     bidirectionalResponseObs.next(receivedList);
    //     this.bidirectionalResponseObs1 = bidirectionalResponseObs.asObservable();
    //   });
    //   }
    //  });


  }
  onFileLoad(fileLoadedEvent): void {
    const csvSeparator = ';';
    const textFromFileLoaded = fileLoadedEvent.target.result;

    const txt = textFromFileLoaded;

    const lines: Array<string> = txt.split('\n');

    const startDate = new Date();
    const client = new GreetServiceClient('http://localhost:50051');
    const stream = client.greetEveryOne();
    lines.reduce( async (previousPromise, element) => {
      await previousPromise;
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          const cols: string[] = element.split(',');
          const req = new GreetEveryOneRequest();
          const great = new Greeting();
          great.setFirstName(cols[0]);
          great.setLastName(cols[1]);

          req.setGreeting(great);

          stream.write(req);
          resolve( cols[0]);
        }, 0.1);

      });
    }, Promise.resolve()).then((data: any) => {
      const endDate = new Date();
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
      alert( 'Server process '+lines.length+' data in ' + seconds + ' .sec');


    });

   }

  public onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    //var content = this.csvContent;
    if (files && files.length) {
       /*
        console.log("Filename: " + files[0].name);
        console.log("Type: " + files[0].type);
        console.log("Size: " + files[0].size + " bytes");
        */

        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;

        fileReader.readAsText(fileToRead, "UTF-8");

    }

  }
  getSingle() {
    this.api.getGreat().then((data: GreetResponse) => {
      this.greet = data;

    });
  }
}
