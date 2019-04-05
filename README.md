# js_crawler
Chromeの拡張機能、[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)を利用し、javascriptでクローリングを行う

# 概要
javascriptでのクローリングはNode.jsを利用したものが検索によく引っかかる。ただ、Node.jsを導入するのが面倒なので、Chromeの拡張機能の導入のみでスクレイピングを行う。クローリングした結果は、sessionStorageに保存し、csv出力する。[sessionstrage-control.js](/sessionstrage-control.js)でsessionStrageの操作を行う関数を定義している。

# サンプルコード neco_video_crawler.js
googleの動画検索で"猫"を検索したときのデータを100より多くのデータが取れるまで、クローリングを続けるコード。

## 実行方法
1. Tampermonkey でスクリプトを作成し、[neco_video_crawler.js](/neco_video_crawler.js)からコードをコピーする
2. https://www.google.co.jp/search?q=%E7%8C%AB&tbm=vid&start=0 にアクセスする

