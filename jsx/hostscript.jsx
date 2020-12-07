/*
//デバッグ時はincludeで外部scriptを読み込む
#include "partial/setColor.jsx";
#include "partial/setGuide.jsx";

var obj = {
    "type": "pasteColor",
    "option": {
        "cyan": "59",
        "magenta": "78",
        "yellow": "0",
        "black": "0",
        "type": "CMYK"
    }
}//pasteColorメソッド用　debug用のオブジェクト
hostScript(obj);
*/
//ここのコメントアウトを外すとpasteColorメソッドがExtendScript Debuggerでデバッグできます。
//writelnメソッドも使えます。

function hostScript(obj/*main.jsから渡されるオブジェクト*/){
    if(1 > app.documents.length){//ドキュメントが一つも開いてなかったら中止
        alert("there's nothing any opned document");
        return false;
    }
    var point = 0.352778;//pointをmmに変換
    var mm = 2.834645;//mmをpointに変換
    var cm = 28.34645;//cmをpointに変換
    
    /*ここで各処理に分岐*/
    switch(obj.type){
        case "pasteColor":
            pasteColor(obj.option);
            break;

        case "makehead":
            makeHead(obj.option);
            break;

        case "setGuide":
            setGuide(obj.option);
            break;

        default:
            alert("nothing registered such a type of function");
            break;
    }

    return true;//なんでも良いので値をmain.jsに返すとエラー発生時にconsoleにjsx内のエラー内容を表示してれる。

    function makeHead(option){
        /*後で書く*/
    }

    function pasteColor(option){
        /*後で書く*/
    }
    function setGuide(option){
        try{
            var selectedBord = getActiveBoard();
            var rect = selectedBord.artboardRect;
            var guideLay = findLayer();
            var margin = app.activeDocument.pathItems.add();
            margin.filled = false;
            var value = getUniValue(option.unit,option.margin);
            margin.setEntirePath([[rect[0]+value,rect[1]-value],[rect[2]-value,rect[1]-value],[rect[2]-value,rect[3]+value],[rect[0]+value,rect[3]+value]]);
            margin.move(guideLay, ElementPlacement.PLACEATBEGINNING);
            margin.closed = true;
            margin.guides = true;
        }catch(e){
            alert(e);
        }

        function getUniValue(unit,value){//setEntirePathメソッドがnumber型でないとエラーを返すため念のためparseFloatで確実にnumber型にしておく
            switch(unit){
                case "mm":
                    return parseFloat(value*mm);

                case "point":
                    return parseFloat(value);

                case "centi":
                    return parseFloat(value*cm);

                default:
                    return parseFloat(value);
            }
        }
    }
    
}
