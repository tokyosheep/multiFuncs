const fs = require("fs");
const path = require("path");

window.onload=()=>{
    "use strict";
    const csInterface = new CSInterface();
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;//jsxフォルダーのパス
    /* html要素取得 */
    const loadColor = document.getElementById("loadColor");
    const pasteColor = document.getElementById("pasteColor");
    const makeHeadOnDoc = document.getElementById("makeHeadOnDoc");
    const marginGuide = document.getElementById("marginGuide");
    const setCenter = document.getElementById("setCenter");
    const loading = document.getElementById("loading");
    /*            */

    const readDirFiles = path =>{//ローカルのディレクトリーを読み込むための関数
        return new Promise((resolve,reject)=>{
            fs.readdir(path,(err,files)=>{
                if(err)reject(err);
                resolve(files);
            })
        });
    }

    const showLoading = () =>{
        return new Promise(resolve=>{
            setTimeout(()=>{//macの場合タイムラグを少しでもおかないとload画面が正常に表示されない
                loading.classList.remove("hide");//loadingを表示
                resolve();
            },10);
        })
    }

    const hideLoading = () =>{
        loading.classList.add("hide");//loadingを隠す
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
    const loadDefaultColor = async() =>{
        await showLoading();
        try{
            let colorObj =  await singleProcess("loadColor.jsx");
            colorObj = JSON.parse(colorObj);
            console.log(colorObj);//描画色を取得してパネルに記録する
            Object.entries(colorObj.color).forEach(([key,value])=>{
                if(key === "typename")return;//typename　プロパティーの時は処理を飛ばす
                try{
                    const id = document.getElementById(key);//CMYK,RGBのプロパティーがnumberフォームのidと対応している
                    id.value = Math.floor(value*10)/10;
                }catch(e){
                    alert(e);
                }
            });
        }catch(e){
            alert(e);//jsxがfalseやエラーを返したら処理を止める
        }finally{
            hideLoading();
        }
    }
    loadColor.addEventListener("click",loadDefaultColor);//load color event 設定

    const pasteOnDoc = async() =>{
        const setColorSpace = (colorSpace) =>{
            if(colorSpace === "DocumentColorSpace.CMYK")return "CMYK";
            if(colorSpace === "DocumentColorSpace.RGB") return "RGB";
            alert("please set RGB or CMYK color");
            return false;
        }
        await showLoading();
        try{
            const colorSpace = setColorSpace(await singleProcess("getColorSpace.jsx"));//色空間をIllustratorから取得
            if(!colorSpace)return false;
            const colorForms = Array.from(document.getElementsByClassName(colorSpace));
            /* フォームの値をreduceメソッドでオブジェクトとして返す */
            const colorObj = colorForms.reduce((acc,current)=>{
                acc[current.id] = current.value;
                return acc;
            },{});
            colorObj.type = colorSpace;
            console.log(colorObj);
            fs.writeFileSync(`${extensionRoot}/data.json`,JSON.stringify({type:"pasteColor",option:colorObj}));//デバッグようjson書き出しメソッド
            const result = await hostProcess({type:"pasteColor",option:colorObj});
            console.log(result);//デバッグのためにホストスクリプトから帰ってきた値を表示
        }catch(e){
            alert(e);
        }finally{
            hideLoading();
        }
        

    }
    pasteColor.addEventListener("click",pasteOnDoc);

    const setHeadonDoc = async() =>{
        const setDate = document.getElementById("setDate");
        const setLength = document.getElementById("setLength");
        if(!setDate.checked&&!setLength.checked){
            alert("please check date or length option");
            return false;
        }
        await showLoading();
        try{
            const result = await hostProcess({type:"makehead",option:{setDate:setDate.checked,setLength:setLength.checked}});
            console.log(result);
        }catch(e){
            console.log(e);
        }finally{
            hideLoading();
        }
    }

    makeHeadOnDoc.addEventListener("click",setHeadonDoc);

    const setMarginGuide = async() =>{
        await showLoading();
        const unit = document.unitForm.unit.value;
        const margin = document.getElementById("marginValue").value;
        console.log(unit);
        try{
            const result = await hostProcess({type:"setGuide",option:{unit:unit,margin:margin}});
            console.log(result);
        }catch(e){
            console.log(e);
        }finally{
            hideLoading();
        }
    }

    marginGuide.addEventListener("click",setMarginGuide);

    const centerGuide = async() =>{
        await showLoading();
        try{
            const result = await singleProcess("setCenterGuide.jsx");
            console.log(result);
        }catch(e){
            console.log(e);
        }finally{
            hideLoading();
        }
    }
    setCenter.addEventListener("click",centerGuide);
}