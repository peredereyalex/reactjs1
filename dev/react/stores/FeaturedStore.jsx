import { browserHistory } from 'react-router';

export const FeaturedStore = {
    events:{
        items: {
            update: "featuredSliderUpdate"
        }
    },
    items: [],
    getList(){
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/featured/',
            type: 'POST',
            dataType: 'json'
        })
        .done(function(response) {
            FeaturedStore.items = response.items;
            FeaturedStore.trigger(FeaturedStore.events.items.update);
        });
    }
}
MicroEvent.mixin( FeaturedStore );
