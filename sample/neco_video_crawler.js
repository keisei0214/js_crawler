// ==UserScript==
// @name         neco_video_crawler
// @version      0.1
// @author       keisei_0214
// @match        https://www.google.co.jp/search?q=%E7%8C%AB&tbm=vid&start=*
// @grant        none
// ==/UserScript==

// sessionStorageの初期化
if(sessionStorage.getItem('size') == null){
    sessionStorage.setItem('size', '0');
}

/**
 * sessionStorageにデータを追加する関数。このデータが出力時の1列にあたる。複数要素を追加する場合、何らかの区切りを入れて、結合したstrにする
 * @param  {str} data 追加するデータ。
 */
function addData(data){
    sessionStorage.setItem(parseInt(sessionStorage.getItem('size')), data)
    sessionStorage.setItem('size', String(parseInt(sessionStorage.getItem('size'))+1))
}

/**
 * 全データをcsvの形式の文字列で返す
 * @return   {str} 出力データ
 */
function getAllData(){
    let ret = ''
    for(let i = 0; i < parseInt(sessionStorage.getItem('size')); i++){
        ret += sessionStorage.getItem(i) + '\n'
    }
    return ret
}

/**
 * 何らかのキーが押されたときの処理。result.csvというファイル名でダウンロードする
 *
 */
function handleKeydown(event){
    // utf8
    const bom = '\uFEFF';

    var blob = new Blob([bom, getAllData() ], { "type" : "text/csv" });

    var a = document.createElement("a");
    a.href = (window.URL || window.webkitURL).createObjectURL(blob);;
    a.target = '_blank';
    a.download = 'result.csv';

    a.click();
}

// イベントリスナーに追加
//window.addEventListener("keydown", handleKeydown);

(async() => {
    let href = location.href.match(/(https:\/\/www.google\.co\.jp\/search\?q=%E7%8C%AB&tbm=vid&start=)(\d+)/)
    // 引数の秒数分待つ
    const wait = ( /** @type {number} */ second) => new Promise((resolve) => setTimeout(() => resolve(), second * 1000))
    await wait(1)

    // 取得するデータの設定などを行う
    let video_list = document.querySelectorAll("div.g")

    // 取得したデータを追加する
    for(let i=0; i<video_list.length; i++) {
        let url = video_list[i].querySelector('div.r a') ? video_list[i].querySelector('div.r a').href : 'null'
        let title = video_list[i].querySelector('div.r a h3') ? video_list[i].querySelector('div.r a h3').innerText : 'null'
        let time_user = video_list[i].querySelector('div.slp.f') ? video_list[i].querySelector('div.slp.f').innerText : 'null'
        let explain = video_list[i].querySelector('span.st') ? video_list[i].querySelector('span.st').innerText : 'null'
        addData([url, title, time_user, explain].join(','))
    }

    if (parseInt(sessionStorage.getItem('size')) > 100){
        handleKeydown()
    }else{
        location.href = href[1]+(parseInt(href[2])+video_list.length)
    }
    
}
)();