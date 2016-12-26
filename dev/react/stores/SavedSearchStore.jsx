import { browserHistory } from 'react-router';

import { UserStore } from './UserStore.jsx';
import { PropertiesStore } from './PropertiesStore.jsx';

export const SavedSearchStore = {
    events:{
        data: {
            update: "SavedSearchStoreUpdate"
        }
    },
    items: [],
    name: "",
    add(){
        var properties_ids = [];
        PropertiesStore.items.forEach(function(property){
            properties_ids.push(property.id);
        });
        var data = {
            name: this.name,
            token: UserStore.token,
            properties_ids: properties_ids
        };
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/savedsearch/add/',
            type: 'POST',
            dataType: 'json',
            data: data
        })
        .done(function(response) {
            SavedSearchStore.getList();
        });
    },
    delete(id){
        var data = {
            token: UserStore.token,
            name: this.name,
            savedsearch_id: id
        };
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/savedsearch/delete/',
            type: 'POST',
            dataType: 'json',
            data: data
        })
        .done(function(response) {
            SavedSearchStore.getList();
        });
    },
    getList(){
        if(!UserStore.token)
            return;

        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/savedsearch/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token
            }
        })
        .done(function(response) {
            if(response.status == "success"){
                SavedSearchStore.items = response.items;
                SavedSearchStore.trigger(SavedSearchStore.events.data.update);
            }
        });
    },
    getProperties(id){
        if(!UserStore.token)
            return;
        console.log(id);
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/savedsearch/properties/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
                savedsearch_id: id
            }
        })
        .done(function(response) {
            console.log(response);
            PropertiesStore.items = response.items;
            PropertiesStore.trigger(PropertiesStore.events.items.update);
        });
    },
}
MicroEvent.mixin( SavedSearchStore );
