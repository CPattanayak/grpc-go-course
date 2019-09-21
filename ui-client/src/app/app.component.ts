import { Component, OnInit } from '@angular/core';
import {GreetService} from './greet.service';
import { GreetManyTimeResponse, GreetResponse, GreetEveryOneResponse,GreetEveryOneRequest,Greeting} from '../app/proto/greetpb/greet_pb';
import { Observable, Subscription, of , BehaviorSubject} from 'rxjs';
import {GreetServiceClient, Status} from '../app/proto/greetpb/greet_pb_service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbAccordionConfig]
})
export class AppComponent implements OnInit {
  constructor(
    public api: GreetService, public config: NgbAccordionConfig
  ) {
    config.closeOthers = true;
    config.type = 'info';
  }

  greet: GreetResponse;
  bidirectionalResponse : string;
  //filter: any;


 bidirectionalResponseObs1 : Observable<string[]>;
  title = 'ui-client';
  ngOnInit(): void {

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


  public onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    // var content = this.csvContent;
    if (files && files.length) {
        const fileToRead = files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(fileToRead, 'UTF-8');
        fileReader.onload = (e) => {
          const csv: string = fileReader.result.toString();
          const allTextLines = csv.split('\n');
          this.processCsv(allTextLines);
        };

    }

  }
  private processCsv(allTextLines: Array<string>) {
    const receivedList = new Array<string>();
    const bidirectionalResponseObs = new BehaviorSubject<string[]>([]);
    const startDate = new Date();
    this.bidirectionalResponse=null;
    this.bidirectionalResponseObs1=null;
    this.api.processArrayPromiseReduce(allTextLines).then((data: string) => {
      const endDate = new Date();
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
      this.bidirectionalResponse = 'Server process data length ' + allTextLines.length + ' in ' + seconds + ' .sec';
      this.api.getStream().subscribe(data1 => {
          receivedList.push(data1['result']);
          bidirectionalResponseObs.next(receivedList);
          this.bidirectionalResponseObs1 = bidirectionalResponseObs.asObservable();
        });

    });
  }

  getSingle() {
    this.api.getGreat().then((data: GreetResponse) => {
      this.greet = data;

    });
  }
}
