const fs = require("fs");
const path = require("path");

window.onload=()=>{
    "use strict";
    const csInterface = new CSInterface();
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;//jsxフォルダーのパス
    /* html要素取得 */
    const marginGuide = document.getElementById("marginGuide");
    const setCenter = document.getElementById("setCenter");
    /*            */

    const readDirFiles = path =>{//ローカルのディレクトリーを読み込むための関数
        return new Promise((resolve,reject)=>{
            fs.readdir(path,(err,files)=>{
                if(err)reject(err);
                resolve(files);
            })
        });
    }

    const init = async() =>{
        const partial = `${extensionRoot}/partial`;
        const parts = await readDirFiles(partial).catch(e=>console.log(e));
        const jsxes = parts.filter(f => path.extname(f) === ".jsx");//jsxファイル以外取り除く
        jsxes.forEach(jsx =>  csInterface.evalScript(`$.evalFile("${partial}/${jsx}")`));//partialフォルダー内の外部jsxファイルを事前に読み込み
        csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
        csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",()=>{location.reload(true)},false);//デバッグ用ウインドウオープンイベント
        themeManager.init();
    }
    init();
    addNavEvent();//navようのモード切り替えイベント

    const setMarginGuide = async() =>{
        const unit = document.unitForm.unit.value;
        const margin = document.getElementById("marginValue").value;
        console.log(unit);
        try{
            /*デバッグ用　json書き出しメソッド*/
            fs.writeFileSync(`${extensionRoot}/data.json`,JSON.stringify({type:"setGuide",option:{unit:unit,margin:margin}}));
            const result = await hostProcess({type:"setGuide",option:{unit:unit,margin:margin}});
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }

    marginGuide.addEventListener("click",setMarginGuide);

    const centerGuide = async() =>{
        try{
            const result = await singleProcess("setCenterGuide.jsx");
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }
    setCenter.addEventListener("click",centerGuide);
}