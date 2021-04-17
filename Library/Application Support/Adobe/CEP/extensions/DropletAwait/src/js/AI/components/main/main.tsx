import * as React from "react";
import { AIContainer } from "../../../styles/containers";

const { MainCompo } = AIContainer;

import { MainButton } from "../../../parts/buttons";
import { SendHostScript } from "../../../fileSystem/connectJSX";
import sendMsg from "../../../server/sendMsg";

const Main = () =>{
    const getActions = async() =>{
        const jsx = new SendHostScript("getActionAI.jsx");
        const ac = await jsx.callJsx();
        if(typeof ac === "boolean")return;
        const actions = JSON.parse(ac);
        console.log(actions);
        sendMsg(actions);
    }
    return(
        <MainCompo>
            <MainButton name="get action" func={getActions}/>
        </MainCompo>
    )
}

export default Main;