# js_crawler
Chromeの拡張機能、[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)を利用し、javascriptでクローリングを行う

# 概要
javascriptでのクローリングはNode.jsを利用したものが検索によく引っかかる。ただ、Node.jsを導入するのが面倒なので、Chromeの拡張機能の導入のみでスクレイピングを行う。

# やり方
1. https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo にアクセスし、Chromeの拡張機能 Tampermonkey をインストールする
2. Chromeを開き、Tampermonkeyのボタンを押して、「新規スクリプトを追加」を選択する
3. [js_crawler.js](/js_crawler.js) からコードをコピーする
4. 対象のURLや、取得するデータ、次のクローリングURLなどを書き換え、保存する
5. Tampermonkeyが有効になっていることを確認し、クローリングしたいページを開いて、放置
6. なんらかのキーを押すとresult.csvがダウンロードされる

# サンプルコード neco_video_crawler.js
googleの動画検索で"猫"を検索したときのデータを100より多くのデータが取れるまで、とり続けるコード。

## 実行方法
1. Tampermonkey でスクリプトを作成し、[neco_video_crawler.js](/neco_video_crawler.js)からコードをコピーする
2. https://www.google.co.jp/search?q=%E7%8C%AB&tbm=vid&start=0 にアクセスする

