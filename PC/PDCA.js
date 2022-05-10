(function() {
    "use strict";
    kintone.events.on(["app.record.create.show","app.record.edit.show"], function(event){
        var documentButton = document.createElement('button');
          documentButton.id = 'my_space_field_button';
          documentButton.innerText = '反響数取得';
          documentButton.onclick = async () =>{
              
              var record = kintone.app.record.get();
              
              var buysell = record.record.販促種別.value;
              let buy_medium_paper, buy_medium_web,sell_medium_paper,sell_medium_web,type;
              
              if(buysell === '買販促'){
                buy_medium_paper = ['7','8','9','10','11','30'];
                buy_medium_web = ['1','2','3','4','5','6','28','29','34']; 
                type = "買"
              }
              else {
                sell_medium_paper = ['20','21','22','23','24','31'];
                sell_medium_web = ['12','13','14','15','16','17','18','19']; 
                type ="売"
                } 
 
              var start = record.record.開始期間.value;
              var end = record.record.終了期間.value;
              var store = record.record.組織図店舗.value[0].name;

              var body = {
                  "app": 358,
                  "query": '店舗 in ("'+store+'") and 受付日 >= "'+ start +'" and 受付日 <= "'+ end +'" and 顧客種別 in ("'+type+'")',
                  "fields": ["媒体マスタ_買","媒体マスタ_売","顧客種別"],
                  "totalCount": true
              };

              const resp = await kintone.api("/k/v1/records", "GET", body);
              
              var paperCount = 0;
              var webCount = 0;

                for(var i = 0; i < resp.totalCount; i++){
                        if(type === "買"){
                            if(buy_medium_paper.indexOf(resp.records[i].媒体マスタ_買.value) >= 0){
                                paperCount += 1;
                            }else if(buy_medium_web.indexOf(resp.records[i].媒体マスタ_買.value) >= 0){
                                webCount += 1;
                            }
                        }else if(type === "売"){
                            if(sell_medium_paper.indexOf(resp.records[i].媒体マスタ_売.value) >= 0){
                                webCount += 1;
                    　　    }else if(sell_medium_web.indexOf(resp.records[i].媒体マスタ_売.value) >= 0){
                                webCount += 1;
                    　　    }
                        }else{
                            alert("該当しない顧客種別です");
                        }
                    }

                record.record.WEB反響件数.value = webCount;
                record.record.紙反響件数.value = paperCount;

                kintone.app.record.set(record);

          };

          kintone.app.record.getSpaceElement('space').appendChild(documentButton);
          return event;
    });
})();