import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {} from '@types/googlemaps';
import { IPApiService } from '../../services/IPApi.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  locate:any;
  marker:any;
  ipaddr:any;


  server:any;
  city:any;
  country:any;
  isp:any;
  lat:any;
  lon:any;
  org:any;
  state:any;
  timezone:any;

  ngOnInit() {
    this.ipApiService.getIPAddress()
    .subscribe(res =>{
      this.ipaddr = res.ip;
      this.GetLocation();
    })
   
    
    }
  constructor(public navCtrl: NavController, private ipApiService:IPApiService, public alertCtrl: AlertController) {
    
    
  }
  GetLocation(){
    this.ipApiService.getLocation(this.ipaddr)
    .subscribe(res => {
      if(res.status === 'success')
      {
        this.alertCtrl.create({
          title: 'Host Found',
          subTitle: 'Location Loaded...',
          buttons: ['OK']
        }).present();
        this.ipaddr = res.query;
        this.server = res.as;
        this.country = res.country;
        this.state = res.regionName;
        this.isp = res.isp;
        this.timezone = res.timezone;
        this.city = res.city;
        this.org = res.org;
        this.ShowLocation(res.lat,res.lon);  
      }
      else
      {
        this.alertCtrl.create({
          title: 'Host is Down',
          subTitle: 'Invalid IP Address or IP is down',
          buttons: ['OK']
        }).present();
      }
    })
  }
  ShowLocation(lat,lon){
    let  locate = new google.maps.LatLng(lat, lon);
    var mapProp = {
      center: locate,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      this.marker = new google.maps.Marker({
        position: locate,
        map: this.map
    });
  }

}
