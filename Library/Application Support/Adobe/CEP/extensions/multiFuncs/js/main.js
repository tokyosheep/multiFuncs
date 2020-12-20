window.onload=()=>{
    "use strict";
    const csInterface = new CSInterface();
    const init = () =>{
        themeManager.init();
        csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",()=>{location.reload(true)},false);
    }
    init();
    addNavEvent();
}