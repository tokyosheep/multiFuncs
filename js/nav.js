const addNavEvent = () =>{
    const nav__radios = Array.from(document.getElementsByClassName("nav__radio"));
    const mains = Array.from(document.getElementsByClassName("main"));
    const switchTab = () =>{
        /*モード切り替え用の関数*/
        const navValue = document.nav.tab.value;
        console.log(navValue);
        mains.forEach(main=>{ 
            if(main.id === navValue){//クリックした該当のモードのみ表示させる
                main.classList.remove("hide");
            }else{
                main.classList.add("hide");
            }
        });
    }
    /*全てのtab要素に切り替えイベント追加*/
    nav__radios.forEach(elm=>{
        elm.addEventListener("change",switchTab);
    });
}

