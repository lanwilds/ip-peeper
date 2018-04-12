import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';


@Injectable()
export class IPApiService{
    http:any;
    baseUrl:String;

    constructor(http:HttpClient){
        this.http = http;
        this.baseUrl = 'http://ip-api.com/json/';
    }
    getLocation(ipaddr){
        return this.http.get(this.baseUrl+ipaddr);
    }
    getIPAddress(){
        return this.http.get("https://api.ipify.org/?format=json");
    }
}