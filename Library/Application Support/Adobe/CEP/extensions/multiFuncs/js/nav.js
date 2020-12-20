const addNavEvent = () =>{
    const nav__radios = Array.from(document.getElementsByClassName("nav__radio"));
    const mains = Array.from(document.getElementsByClassName("main"));
    const switchTab = () =>{
        const navValue = document.nav.tab.value;
        console.log(navValue);
        mains.forEach(main=>{ 
            console.log(main.id);
            if(main.id === navValue){
                main.classList.remove("hide");
            }else{
                main.classList.add("hide");
            }
        });
    }
    nav__radios.forEach(elm=>{
        elm.addEventListener("change",switchTab);
    });
}

