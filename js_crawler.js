// ==UserScript==
// @name         js_crawler
// @version      0.1
// @author       keisei_0214
// @match        [対象URL]
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
window.addEventListener("keydown", handleKeydown);

(async() => {
    const href = location.href;
    // 引数の秒数分待つ
    const wait = ( /** @type {number} */ second) => new Promise((resolve) => setTimeout(() => resolve(), second * 1000))
    await wait(1)

    // 取得するデータの設定などを行う
    let text = document.querySelector("body").innerText

    // 取得したデータを追加する
    addData(text)

    // 次のページに移動する
    location.href = 'http://hogehoge'

    }
)();