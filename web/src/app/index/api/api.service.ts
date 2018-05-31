import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { NotificationsService } from '../notifications.service';
import { ThrowStmt } from '@angular/compiler';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

declare let require: any;
declare let window: any;
declare let Web3: any;

let tokenAbi = require('./abi.json');

const provider = window.web3.currentProvider;
const config = {
  networkId: 3
};


@Injectable()
export class ApiService {

  private _account: string = null;
  private _web3: any;
  public apiId: string;
  public amount: number
  public callCost: number;
  private _contract: any;
  private _contractAddress: string = environment.contractAddress;
  private uid: string;


  constructor(private http: HttpClient, private notifService: NotificationsService) {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(provider);
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }
    this._contract = this._web3.eth.contract(tokenAbi).at(this._contractAddress);
    const apikey = environment.firebase.apiKey;
    let token = JSON.parse(sessionStorage[`firebase:authUser:${apikey}:angular-auth-firebase`]);
    this.uid = token.uid;
  }

  public async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }
          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accs[0]);
        })
      }) as string;
      this._web3.eth.defaultAccount = this._account;

      this._contract.ChannelOpened({ client: this._account }, (err, res) => {
        //notify user
        let apiId = this._web3.toAscii(res.args.apiAdd)
        this.notifService.update('subscription succeeded');
        //api key
        console.log(`data : ${this.callCost.toString()}`);
        let hash = this._web3.sha3(this.callCost.toString());
        console.log(`hash : ${hash}`);
        this._web3.personal.sign(hash, this._account, (err, res) => {
          let apiKey = res
          console.log(res);
        })
        //add to user collection
        let data = {
          apiId: this.apiId,
          balance: this.amount,
          add: this._account
        };
        console.log(data)
        this.http.post(`http://localhost:3000/users/${this.uid}/api`, data).subscribe(res => {
          console.log(res)
        }, console.log)
      })

      this._contract.ChannelClosed({ client: this._account }, (err, res) => {
        //notify user
        let apiId = this._web3.toAscii(res.args.apiAdd)
        this.notifService.update("unsubscription succeeded");
        let data = {
          apiId: this.apiId,
          add: this._account
        };
        this.http.post(`http://localhost:3000/users/${this.uid}/api/delete`,data).subscribe(res =>{
          console.log(res)
        }, console.log)
      })
    }

    return Promise.resolve(this._account);
  }

  public async getBalance(account: string): Promise<string> {
    let balance = await new Promise((resolve, reject) => {
      this._web3.eth.getBalance(account, (err, bal) => {
        if (err != null) {
          alert('There was an error fetching your balance.');
          return;
        }
        resolve(this._web3.fromWei(bal));
      })
    }) as string;
    return Promise.resolve(balance);
  }


  public async subscribe(amount, api): Promise<any> {
    this.amount = amount;
    this.apiId = api;;
    let account = await this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._contract.OpenChannel(api, { value: amount, gasPrice: 10000 }, function (err, result) {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<any>;
  }


  public getSignature(api, balance): Promise<any[]> {
    this.apiId = api;
    let _web3 = this._web3;
    let hexApi = _web3.fromAscii(api);
    console.log(hexApi)
    let hash = this._web3.sha3(hexApi);
    console.log(`hash : ${hash}`);
    return new Promise((resolve, reject) => {
      this._web3.personal.sign(hash, this._account, (err, res) => {
        if (err)
          reject(err)
        else {
          let r1 = '0x' + res.substring(2, 66);
          let s1 = '0x' + res.substring(66, 130);
          let v1 = _web3.toDecimal('0x' + res.substring(130, 132));
          console.log('singed message : ', `["${hash}", "${r1}", "${s1}"], ${v1}, ${balance}, "${hexApi}, "${hexApi}"`);
          resolve([[hash, r1, s1], v1, balance, api, hexApi])
        }
      })
    })
  }



  public async unsubscribe(args: any[]): Promise<any> {
    let account = await this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3; 
      console.log(...args)
      this._contract.CloseChannel(...args, function (err, result) {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<any>;
  }

  callApi(url: string, method: string, data?: any): Observable<any> {

    let methodName = method.toLowerCase();
    console.log(url, methodName)

    if (data)
      return this.http[methodName](url, data)
    else
      return this.http[methodName](url)
  }

}
