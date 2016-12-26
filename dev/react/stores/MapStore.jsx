import { browserHistory } from 'react-router'

var wNumb = require('wnumb');

export const MapStore = {
    events:{
        data:{
            update: "mapDataUpdate"
        },
    },
    visible: false,
    map: null,
    markers: [],
    infoWindow: null,
    loaded: false,
    cacheItems: "",
    format: false,
    clear(){
        MapStore.map = null;
        MapStore.markers = [];
        MapStore.infoWindow = null;
        MapStore.loaded = false;
    },
    show(){
        $("#map").show();
        MapStore.visible = true;
        MapStore.trigger(MapStore.events.data.update);
    },
    hide(){
        $("#map").hide();
        MapStore.visible = false;
        MapStore.trigger(MapStore.events.data.update);
    },
    init(container){
        if(MapStore.loaded)
            return;

        MapStore.format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var mapLocation = {lat:40.001, lng: 40.520};
        var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];
        var mapOptions = {
            zoom: 14,
            center: mapLocation,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles : styles
        };
        MapStore.map = new google.maps.Map(container, mapOptions);
        MapStore.infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListenerOnce(MapStore.map,'idle',function(){
            MapStore.loaded = true;
        });
    },
    clearMarkers(){
         for (var i = 0; i < MapStore.markers.length; i++) {
            MapStore.markers[i].setMap(null);
        }
        MapStore.markers = [];
    },
    compareMarkers(items){

    },
    createMarkers(item, items){
        if(items.length==0){ //проверяем поиск это или директ заход
            var mapLocation = {lat:parseFloat(item.coord_x), lng: parseFloat(item.coord_y)};
            var marker = new google.maps.Marker({
                position: mapLocation,
                map: MapStore.map,
                icon: "/assets/i/origin/map-marker.png"
            });
            MapStore.markers.push(marker);
        }else{
            if(MapStore.markers.length!=items.length){
                MapStore.clearMarkers();
            }
            items.forEach(function(element, index, array) {
                var markerLocation = {lat:parseFloat(element.coord_x), lng: parseFloat(element.coord_y)};
                var marker = new google.maps.Marker({
                    position:markerLocation,
                    map: MapStore.map,
                    icon: "/assets/i/origin/map-marker.png"
                });
                google.maps.event.addListener(marker,'click',function(){
                    browserHistory.push("/property/"+element.id);
                    MapStore.createInfoWindow(element, marker);
                });
                MapStore.markers.push(marker);
            });
        }
    },
    setCenter(item, items){
         if(item.id==0 && items.length>0){
            var mapLocation = {lat:parseFloat(items[0].coord_x), lng: parseFloat(items[0].coord_y)-0.035};
            MapStore.map.setCenter(mapLocation);
        }

        if(item.id!=0){
            var mapLocation = {lat:parseFloat(item.coord_x), lng: parseFloat(item.coord_y)-0.035};
            MapStore.map.setCenter(mapLocation);
        }
    },
    createInfoWindow(item, marker){
        var props = 'Beds: '+item.bed+', Baths: '+item.bath+', Sq Ft:'+item.sqft;
        var contentString =
            '<div href="#" class="infowindow">' +
                '<div class="infowindow__image-wrap">' +
                    '<img src="http://upreal-api.develop.redlg.ru' + item.photo + '" class="infowindow__image"/>' +
                    '<span class="infowindow__price">$' + MapStore.format.to(parseInt(item.price)) + '</span>' +
                    '<span class="infowindow__price infowindow__price__sqft">$' + MapStore.format.to(parseInt(parseInt(item.price)/parseInt(item.sqft))) + '/Sqft</span>' +
                '</div>' +
                '<div class="infowindow__title">' + item.title + '</div>' +
                '<div class="infowindow__address">' + item.subtitle + '</div>' +
                '<div class="infowindow__props">' + props + '</div>' +
                '<div class="infowindow__type">' + item.type + '</div>' +
            '</div>';

        MapStore.infoWindow.setContent(contentString);
        MapStore.infoWindow.open(MapStore.map, marker);

        var $gmStyle = $('.gm-style-iw'); //infowindow wrapper
        $gmStyle.prev().remove(); //remove arrow
        $gmStyle.next().css({top: '39px', right: '31px'}); //move close icon
        $gmStyle.css({top: '35px', left: '25px', overflow: 'visible'}); // move wrapper
        $gmStyle.children().css('overflow', 'visible'); //set overflow to show shadow-box
        $gmStyle.children().children().css('overflow', 'visible');
    }
}
MicroEvent.mixin( MapStore );
