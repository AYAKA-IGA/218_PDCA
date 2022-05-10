(function() {
   "use strict";
   var events = ["mobile.app.record.detail.show",
                   "mobile.app.record.create.show",
                   "mobile.app.record.edit.show",
                   "mobile.app.record.create.change.販促種別",
                   "mobile.app.record.edit.change.販促種別"];
                   
   kintone.events.on(events, function(event) {
       var record = event.record;
       
        var buysell = record.販促種別.value;
        if(buysell === "買販促"){
            kintone.mobile.app.record.setFieldShown('買販促', true);
            kintone.mobile.app.record.setFieldShown('売販促', false);
        }else if(buysell === "売販促"){
            kintone.mobile.app.record.setFieldShown('売販促', true);
            kintone.mobile.app.record.setFieldShown('買販促', false);
        }else{
            
        }
        return event;
   });
})();
