"use strict";
const { initPsMethod } = require("./PsBatch/drawGuide");
const { docs } = require("./classes/docs");

(()=>{
    /*
        selectのoption要素にdocmentオブジェのnameプロパティをセットする
    */
    docs.forEach(doc=>{
        const option = document.createElement("option");
        option.value = doc.name;
        option.textContent = doc.name;
        document.getElementById("select").appendChild(option);
    });
    
    document.getElementById("select").value =  "web";//selectの初期値
    
    initPsMethod();
    
    /*
        buttonのイベントclass
    */
    class ButtonElement{
        constructor(elm,func){
            this.elm = elm;
            this.func = func;
            this.elm.addEventListener("click",this.func);
        }
    }
    
    const startButton = new ButtonElement(document.getElementById("create"),async()=>{
        const selectedName = document.getElementById("select").value;
        const preset = docs.find(doc=> doc.name === selectedName);
        if(preset===undefined)return;
        await preset.createDocument();
        await preset.createLayers(preset.layers);
        await preset.createGuides();
    });
})();
