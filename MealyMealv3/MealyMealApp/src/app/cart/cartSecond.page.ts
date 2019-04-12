/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { httpService } from '../services/httpRequest.service';
import {logoutService} from '../services/logoutService.service';
import {NavController} from '@ionic/angular';
import { ViewChild } from '@angular/core';
import {InfoWindow} from '@agm/core/services/google-maps-types';



@Component({
    selector: 'app-cartSecond',
    templateUrl: 'cartSecond.page.html'
})

export class cartSecondPage implements OnInit {
    constructor(private menuhttp: httpService, private logoutservice: logoutService,  public nav: NavController) { }
    @ViewChild('gmap') gmapElement: any;
    user;
    showToolbar;
    map: google.maps.Map;

    isTracking = false;
    currentLat: any;
    currentLong: any;
    names: any;
    address: any;
    marker: google.maps.Marker;
    service: any;
    test:any;
    ngOnInit() {
        var mapProp = {
            center: new google.maps.LatLng(47.8267, 2.3085),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        this.findMe();
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.user);


    }


    logout() {
        this.logoutservice.logout();
    }
    navCartThird() {
        this.nav.navigateForward('/getlist');
    }


    findMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.search(position);
                // this.showPosition(position);
                // console.log(position);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
    search(position) {
        var address = '';
        var nam = '';
        var location = new google.maps.LatLng( position.coords.latitude, position.coords.longitude);
        this.map.panTo(location);
        var request = {
            location: location,
            radius: '500',
            type: ['supermarket']
        };
        var map1 = this.map;
        var that=this;
        let test = new Map();
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(results.length);
                for (var i = 0; i < results.length; i++) {
                    var marker = new google.maps.Marker({
                        position: results[i].geometry.location,
                        map: map1
                    });
                    console.log(results[i]);
                    var name1 = results[0].name;
                    var vicinity1 = results[0].vicinity;
                    var infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(name1 + ',' + vicinity1);
                        infowindow.open(map1, this);
                    });
                    nam = results[i].name;
                    address = results[i].vicinity;
                    that.names = nam;
                    that.address = address;
                    test.set(nam,address);

                }
               that.test=test;
            }

        });
       
        //alert(this.names);

    }


    showPosition(position) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.panTo(location);

        if (!this.marker) {
            this.marker = new google.maps.Marker({
                position: location,
                map: this.map,
                title: 'Got you!'
            });
        }
        else {
            this.marker.setPosition(location);
        }
    }
}
