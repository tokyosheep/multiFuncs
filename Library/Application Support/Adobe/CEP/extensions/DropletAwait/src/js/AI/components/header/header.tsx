import * as React from "react";
import styled from "styled-components";

import { AIContainer } from "../../../styles/containers";
const { HeaderCompo } = AIContainer;

const Title = styled.h1`
    color: #fff;
    font-size: 15px;
    font-weight: 300;
`;

const Header = () =>{
    return(
        <HeaderCompo>
            <Title>AI Drop let</Title>
        </HeaderCompo>
    )
}

export default Header;