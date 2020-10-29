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
        var selects = app.activeDocument.selection;
        if(option.setLength&&selects.length !== 1){
            alert("please select just an item");
            return false;
        }
        var select = selects[0];
        var keyColor = {
            cyan:0,
            magenta:0,
            yellow:0,
            black:100
        }
        var black = setCMYK(keyColor);//黒色のカラーをセットする
        var headLayer = app.activeDocument.layers.add();
        headLayer.name = "head";
        var contents = (option.setLength ? getLength(select) : "") +　(option.setLength&&option.setDate ? " : " : "" ) + (option.setDate ? getDate() : "");
        var textObj = activeDocument.textFrames.add();
        textObj.contents = contents;
        textObj.paragraphs[0].size = fontSize; // 64pt 
        textObj.left = 0;
        textObj.top = 0;
        function getLength(select){
            var height = Math.floor((select.height*point)*100)/100;
            var width = Math.floor((select.width*point)*100)/100;
            var header = app.activeDocument.textFrames.add();
            return height + "mm X "+ width + "mm";
        }
        function getDate(){//現在の日時を返す
            var dObj = new Date();//create date object
            var m = dObj.getMonth() + 1;
            var d = dObj.getDate();
            var h = dObj.getHours();
            var minute = dObj.getMinutes();
            return m + "月 " + d + "日 " + h +"時 " + minute + "分";
        }
    }

    function pasteColor(option){
        var Square = function(obj,num,left){
            this.size = 50 * mm;
            this.item = activeDocument.activeLayer.pathItems.rectangle(//カラー用スクエアのパスアイテムをセットする
                /*item.top*/-(num*(this.size+70)),
                /*item.left*/left,
                this.size,
                this.size
            );
            this.item.filled = true;
            this.item.stroked = false;
            this.obj = obj;
            this.item.fillColor = this.setColor();
        }

        Square.prototype.setColor = function(){
            switch(this.obj.type){//カラーオブジェクトをセットする
                case "CMYK":
                return setCMYK(this.obj);
                case "RGB":
                return setRGB(this.obj);
                case "Gray":
                return setGray(this.obj);
                default:
                return setGray({gray:0});//何も該当しなければ無地のグレーを返す 理論上RGBかCMYKしかここに渡されないが念のため
            }
        }
        var newLayer = app.activeDocument.layers.add();//置き換えた色のレイヤーを作成
        newLayer.name = "fill";
        var filledObj = new Square(option,0,0);
        filledObj.item.move(newLayer, ElementPlacement.PLACEATBEGINNING);
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
