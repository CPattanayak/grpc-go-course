
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GreetServiceClient, Status} from '../app/proto/greetpb/greet_pb_service';
import {GreetManyTimeRequest, GreetManyTimeResponse, Greeting, GreetRequest,
  GreetResponse, GreetEveryOneRequest, GreetEveryOneResponse, LongGreetRequest, LongGreetResponse
} from '../app/proto/greetpb/greet_pb';
@Injectable({
  providedIn: 'root'
})
export class GreetService {
  client: GreetServiceClient;
  errorList: string[] = [];
  promoseList: Promise<string>[] = [];
  constructor() {
    this.client = new GreetServiceClient('http://localhost:50051');
  }

  async getGreatEveryOne(): Promise <string[]> {
      const stream = this.client.greetEveryOne();
      for (let i = 0; i < 5000; i++) {
      this.promoseList.push(new Promise((resolve, reject) => {
        const req = new GreetEveryOneRequest();
        const great = new Greeting();
        great.setFirstName('Chandan' + i);
        great.setLastName('Pattanayak');

        req.setGreeting(great);

        stream.write(req);
        resolve('Success' + i);
      }));
    }
      return await Promise.all(this.promoseList);

  }
  async processArrayPromiseReduce(): Promise<any>{
    const userIDs = Array.from(Array(500000).keys());
    const stream = this.client.greetEveryOne();
    return userIDs.reduce( async (previousPromise, nextID) => {
      await previousPromise;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const req = new GreetEveryOneRequest();
          const great = new Greeting();
          great.setFirstName('Chandan' + nextID);
          great.setLastName('Pattanayak');

          req.setGreeting(great);

          stream.write(req);
          resolve( nextID);
        }, 0.1);

      });
    }, Promise.resolve());
  }

  async  processArrayPromiseAll() : Promise <any[]>   {
    const array = Array.from(Array(100000).keys());
    const stream = this.client.greetEveryOne();
    const promises = array.map((item) => {
     return new Promise((resolve, reject) => {
      const req = new GreetEveryOneRequest();
      const great = new Greeting();
      great.setFirstName('Chandan' + item);
      great.setLastName('Pattanayak');

      req.setGreeting(great);

      stream.write(req);
      resolve('Success' + item);
     // tslint:disable-next-line: semicolon
     } )
    });

    // wait until all promises are resolved
    return await Promise.all(promises);

  }

  getGreat(): Promise <object> {
    return new Promise((resolve, reject) => {
      const req = new GreetRequest();
      const great = new Greeting();
      great.setFirstName('Chandan');
      great.setLastName('Pattanayak');
      req.setGreeting(great);
      this.client.greet(req, null, (err, response: GreetResponse) => {
        // console.log('ApiService.get.response', response.toObject());
        if (err) {
          return reject(err);
        }
        resolve(response.toObject());
      });
    }

    );
  }

  getGreatError(): Promise <object> {
    return new Promise((resolve, reject) => {
      const req = new GreetRequest();
      const great = new Greeting();
      great.setFirstName('');
      great.setLastName('Pattanayak');
      req.setGreeting(great);
      this.client.greet(req, null, (err, response: GreetResponse) => {
        // console.log('ApiService.get.response', response.toObject());
        if (err) {
          // console.log('ErrorMessage', err.message);
         // console.log('ErrorCode', err.code);
          if (err.code == 3) {
          this.errorList.push(err.message);
          }
          response = new GreetResponse();
          // return reject(err);
        }
        // console.log("out");
        resolve(response.toObject());
      });
    }

    );
  }
  getStream(): Observable <GreetManyTimeResponse> {
    return new Observable(obs => {
      const req = new GreetManyTimeRequest();
      const great = new Greeting();
      great.setFirstName('Chandan');
      great.setLastName('Pattanayak');
      req.setGreeting(great);
      const stream = this.client.greetManyTime(req);
      stream.on('status', (status: Status) => {
        // console.log('ApiService.getStream.status', status);
      });
      stream.on('data', (message: any) => {
        // console.log('ApiService.getStream.data', message.toObject());
        obs.next(message.toObject() as GreetManyTimeResponse);
      });
      stream.on('end', () => {
        // console.log('ApiService.getStream.end');
        obs.complete();
        // obs.error();
      });
     // stream.;
    });
  }
}
