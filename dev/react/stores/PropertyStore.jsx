import { browserHistory } from 'react-router';

export const PropertyStore = {
    events: {
        item: {
            update: "updateDetailInfo"
        }
    },
    selected: 0,
    items: {}, //cache
    item: {
        id: 0,
        title: "Loading",
        subtitle: "Loading",
        price: "",
        bed: "0",
        bath: "0",
        sqft: "0",
        featured: "Y",
        date_create: "",
        date_update: "",
        map_coord_x: 0,
        map_coord_y: 0,
        youtube_id: "",
        iframe_tour: "",
        description: "",
        coord_x: "",
        coord_y: "",
        zipcode: "",
        photo: "",
        type: "",
        user: "",
        city: "",
        area: "",
        images: [],
        attachments: [],
        features: [],
    },
    getById(id) {
        PropertyStore.selected = id;
        if(PropertyStore.items[id]){
            PropertyStore.item = PropertyStore.items[id];
        }
        PropertyStore.trigger(PropertyStore.events.item.update);
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/property/',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            }
        })
        .done(function(result) {
            PropertyStore.items[PropertyStore.selected] = result.item;
            PropertyStore.item = result.item;
            PropertyStore.trigger(PropertyStore.events.item.update);
        });

    },
    getDefault(){
        return {
            id: 0,
            title: "Loading",
            subtitle: "Loading",
            price: "",
            bed: "0",
            bath: "0",
            sqft: "0",
            featured: "Y",
            date_create: "",
            date_update: "",
            map_coord_x: 0,
            map_coord_y: 0,
            youtube_id: "",
            iframe_tour: "",
            description: "",
            coord_x: "",
            coord_y: "",
            zipcode: "",
            photo: "",
            type: "",
            user: "",
            city: "",
            area: "",
            images: [],
            attachments: [],
            features: [],
        };
    },
}
MicroEvent.mixin(PropertyStore);
