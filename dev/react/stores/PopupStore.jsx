import { browserHistory } from 'react-router'

export const PopupStore = {
    events:{
        all:{
            hide: "allPopupsHide"
        },
        overlay: {
            show: "showpopupoverlay"
        },
        auth:{
            show: "authPopupShow",
        },
        favorite:{
            show: "favoritePopupShow",
        },
        addtofavorite:{
            show: "asdad2231231312ss"
        }
    },
    hide(){
        PopupStore.trigger(PopupStore.events.all.hide);
    },
    show(popup){
        this.hide();
        PopupStore.trigger(PopupStore.events.overlay.show);
        PopupStore.trigger(PopupStore.events[popup].show);
    }
}
MicroEvent.mixin( PopupStore );
