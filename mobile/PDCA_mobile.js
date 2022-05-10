(function() {
    "use strict";
    kintone.events.on(["mobile.app.record.create.show","mobile.app.record.edit.show"], function(event){
        var documentButton = document.createElement('button');
          documentButton.id = 'my_space_field_button';
          documentButton.innerText = '反響数取得';
          documentButton.onclick = async () =>{
              
              var record = kintone.mobile.app.record.get();
              
              var buysell = record.record.販促種別.value;
              if(buysell === '買販促'){
                var appid = '73';
                var medium_paper = ["単独チラシ","紙面掲載","ライズ","スポット","てまき","ポストメイト"];
                var medium_web = ["HP","SUUMO（中古・土地）","SUUMO（新築建売）","アットホーム","ホームズ","マイページ登録"]; 
              }else {
                var appid = '74';
                var medium_paper = ["単独チラシ","スポット","紙面掲載","てまき","ポストメイト"];
                var medium_web = ["HP","自社LP","リビンマッチ","イエイ","Home4U","イエウール","マンションリサーチ","リガイド/Mﾘｻｰﾁ","WEBその他"]; 
              }

              var start = record.record.開始期間.value;
              var end = record.record.終了期間.value;
              var store = record.record.店舗.value;

              var body = {
                  "app": appid,
                  "query": '店舗 in ("'+store+'") and 日付 >= "'+ start +'" and 日付 <= "'+ end +'"',
                  "fields": ["媒体"],
                  "totalCount": true
              };

              const resp = await kintone.api("/k/v1/records", "GET", body);
              
              var paperCount = 0;
              var webCount = 0;

                for(var i = 0; i < resp.totalCount; i++){
                    if(medium_paper.indexOf(resp.records[i].媒体.value) >= 0){
                        paperCount += 1;
                    }else if(medium_web.indexOf(resp.records[i].媒体.value) >= 0){
                        webCount += 1;
                    }else{

                    }
                }

                record.record.WEB反響件数.value = webCount;
                record.record.紙反響件数.value = paperCount;

                kintone.mobile.app.record.set(record);

          }
          kintone.mobile.app.record.getSpaceElement('space').appendChild(documentButton);
          return event;
    });
})();