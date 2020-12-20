function changeColor(){
	if(document.body.style.color == "red"){
                document.body.style.color = "black";
            }
            else {
                document.body.style.color = "red";
            }
}

document.getElementById("change_color").addEventListener("click", changeColor);

const photoshop = require("photoshop");

const listener = (e,d) => console.log(e,d);

photoshop.action.addNotificationListener([
    {
        event:"open"
    },
    {
        event:"crop"
    },
    /*
    {
        event:"historyStateChanged"
    },
    */
    {
        event:"make"
    },
    {
        event:"delete"
    },
    {
        event:"toolModalStateChanged"
    }
],listener);


document.addEventListener("keydown",event=>{
    console.log(event);
});