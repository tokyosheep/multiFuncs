import * as React from "react";
import styled from "styled-components";

const MainButtonStyle = styled.button`
    border: none;
    background: #e77416;
    color: #fff;
    font-weight: 200;
    width: 100px;
    height: 30px;
    font-size: 13px;
    border-radius: 5px;
    cursor: pointer;
    &:active{
        background: #b15911;
    }
    &:focus{
        outline: none;
    }
`;

export const MainButton = ({name,func}) =>{
    return(
        <MainButtonStyle onClick={func} >
            {name}
        </MainButtonStyle>
    )
}