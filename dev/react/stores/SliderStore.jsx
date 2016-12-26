import { browserHistory } from 'react-router';

export const SliderStore = {
    events:{
        items: {
            update: "slidesWasUpdated"
        }
    },
    items: [
        { id: 1, image: '/upload/1478879102232bg-kopiya.jpg'}
    ],
    getList(){
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/slider/',
            type: 'POST',
            dataType: 'json'
        })
        .done(function(response) {
            console.log(response);
            SliderStore.items = response.items;
            SliderStore.trigger(SliderStore.events.items.update);
        });
    },
}
MicroEvent.mixin( SliderStore );
