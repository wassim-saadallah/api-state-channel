import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

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

  private _contract: any;
  private _contractAddress: string = environment.contractAddress;


  constructor(private http: HttpClient) {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(provider);
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }

    this._contract = this._web3.eth.contract(tokenAbi).at(this._contractAddress);
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
    let account = await this.getAccount();

    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._contract.OpenChannel(api, {value: this._web3.toWei(amount, 'ether'), gasPrice: 10000}, function (err, result) {
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
