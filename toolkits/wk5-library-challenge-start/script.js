(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.546719, -121.744339], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([38.546719, -121.744339]).addTo(map);

var circle = L.circle([38.546719,  -121.744339], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [38.546719, -121.744339],
    [38.557000, -121.745339],
    [38.55780, -121.775469]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

}());