import * as React from "react";
import { useMemo } from "react";
import { createGlobalStyle } from "styled-components";
import { init } from "../fileSystem/init";

import MainAIPage from "./pages/mainPage";

import connectServer from "../server/server";

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
        background: #e2914e;
    }
`;

const LayoutAI = () =>{
    useMemo(()=>{
        init();
        connectServer((f)=>console.log(f),3000);
    },[]);
    return(
        <>
            <GlobalStyle />
            <MainAIPage />
        </>
    )
}

export default LayoutAI;