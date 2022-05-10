(function() {
   "use strict";
   var events = ["app.record.detail.show",
                   "app.record.create.show",
                   "app.record.edit.show",
                   "app.record.create.change.販促種別",
                   "app.record.edit.change.販促種別"];
                   
   kintone.events.on(events, function(event) {
       var record = event.record;
       
       kintone.app.record.setFieldShown('買販促', false);
        kintone.app.record.setFieldShown('売販促', false);
            
        var buysell = record.販促種別.value;
        if(buysell === "買販促"){
            kintone.app.record.setFieldShown('買販促', true);
            kintone.app.record.setFieldShown('売販促', false);
        }else if(buysell === "売販促"){
            kintone.app.record.setFieldShown('売販促', true);
            kintone.app.record.setFieldShown('買販促', false);
        }else{
            
        }
        return event;
   });
   
   kintone.events.on(["app.record.edit.submit","app.record.create.submit"],function(event){
        const store = event.record.組織図店舗.value[0].name;
        const month = event.record.月.value;
        
        event.record.連携用.value = store+month;
        
        return event;
   });
   
})();
