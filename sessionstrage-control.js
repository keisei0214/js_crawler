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
 * result.csvというファイル名でsessionStrageに保存したデータをダウンロードする
 *
 */
function downloadCsv(){
    // utf8
    const bom = '\uFEFF';

    var blob = new Blob([bom, getAllData() ], { "type" : "text/csv" });

    var a = document.createElement("a");
    a.href = (window.URL || window.webkitURL).createObjectURL(blob);;
    a.target = '_blank';
    a.download = 'result.csv';

    a.click();
}