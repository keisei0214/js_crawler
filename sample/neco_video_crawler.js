// ==UserScript==
// @name         neco_video_crawler
// @version      0.1
// @author       keisei_0214
// @match        https://www.google.co.jp/search?q=%E7%8C%AB&tbm=vid&start=*
// @grant        none
// @require      https://raw.githubusercontent.com/keisei0214/js_crawler/master/sessionstrage-control.js
// ==/UserScript==

// sessionStorageの初期化
if(sessionStorage.getItem('size') == null){
    sessionStorage.setItem('size', '0');
}

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