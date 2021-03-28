"use strict";
const  electron = require("electron");

window.onload = () =>{
    console.log("hello");
    electron.ipcRenderer.on("dropFile",(event,message)=>{
        console.log(message);
    });

    const prevent_dragnaddrop = e =>{
        e.stopPropagation();
        e.preventDefault();
    }
    window.addEventListener(`drop`,prevent_dragnaddrop,false);
    window.addEventListener(`dragover`,prevent_dragnaddrop,false);

    class DragSystem{
        constructor(elm){
            this.elm = elm;
            this.elm.addEventListener("dropover",this.handleDragOver);
            this.elm.addEventListener(`drop`,this.handleDrop);
        }
        handleDragOver(e){
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = `copy`;
        }

        handleDrop(e){
            console.log("drop");
            e.stopPropagation();
            e.preventDefault();
            const list = document.getElementById("fileList");
            while(list.firstChild){
                list.removeChild(list.firstChild);
            }
            const files = Array.from(e.dataTransfer.files);
            console.log(files);
            files.forEach(f=>{
                const li = document.createElement("li");
                li.textContent = f.name;
                list.appendChild(li);
            });
        }
    }
    
    const dragArea = new DragSystem(document.getElementById("dropArea"));
}