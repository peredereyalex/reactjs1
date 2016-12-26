import { browserHistory } from 'react-router'

import { SearchStore } from './SearchStore.jsx';

export const PropertiesStore = {
    events:{
        items:{
            update: "propertieswasupdatesd"
        }
    },
    items: [],
    getList(search){
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/properties/',
            type: 'POST',
            dataType: 'json',
            data: {
                search: search
            }
        })
        .done(function(result) {
            PropertiesStore.items = result.items;
            PropertiesStore.trigger(PropertiesStore.events.items.update);
        });
    }
}
MicroEvent.mixin( PropertiesStore );
