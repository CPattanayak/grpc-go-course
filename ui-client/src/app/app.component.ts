import { Component, OnInit } from '@angular/core';
import {GreetService} from './greet.service';
import { GreetManyTimeResponse, GreetResponse, GreetEveryOneResponse,GreetEveryOneRequest,Greeting} from '../app/proto/greetpb/greet_pb';
import { Observable, Subscription, of , BehaviorSubject} from 'rxjs';
import {GreetServiceClient, Status} from '../app/proto/greetpb/greet_pb_service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Cacheable } from 'ngx-cacheable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbAccordionConfig]
})
export class AppComponent implements OnInit {
  constructor(
    public api: GreetService, public config: NgbAccordionConfig,public spinner: NgxSpinnerService
  ) {
    config.closeOthers = true;
    config.type = 'info';
  }

  greet: GreetResponse;
  bidirectionalResponse : string;
  totalLength=0;
  progressLength = 0;

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
   // this.totalLength = 0;
    this.progressLength =0;
    const files = input.files;

    if (files && files.length) {
        this.spinner.show();
        const fileToRead = files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(fileToRead, 'UTF-8');
        fileReader.onload = (e) => {
          const csv: string = fileReader.result.toString();
          const allTextLines = csv.split('\n');
          this.totalLength += allTextLines.length;
          this.processCsv(allTextLines);
        };


    }

  }
  private processCsv(allTextLines: Array<string>) {

    const startDate = new Date();
    this.bidirectionalResponse=null;


    this.api.processArrayPromiseReduce(allTextLines).then((data: string) => {
      const endDate = new Date();
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
      this.bidirectionalResponse = 'Server process data length ' + allTextLines.length + ' in ' + seconds + ' .sec';
      this.spinner.hide();

    });
  }

 private loadDBRecords(){
  const receivedList = new Array<string>();
  const bidirectionalResponseObs = new BehaviorSubject<string[]>([]);
  this.bidirectionalResponseObs1=null;
  this.api.getStream().subscribe(data1 => {
    this.progressLength=this.api.incromentReceived;
   // console.log(data1['result']);
    receivedList.push(data1['result']);

    bidirectionalResponseObs.next(receivedList);
    this.bidirectionalResponseObs1 = bidirectionalResponseObs.asObservable();
    });

 }
  getSingle() {
    this.api.getGreat().then((data: GreetResponse) => {
      this.greet = data;

    });
  }
}
