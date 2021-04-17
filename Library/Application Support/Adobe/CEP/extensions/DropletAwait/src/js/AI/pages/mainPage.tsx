import * as React from "react";
import styled from "styled-components";

import { AIContainer } from "../../styles/containers";
const { Container } = AIContainer;

import Main from "../components/main/main";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const MainAIPage = () =>{
    return(
        <Container>
            <Header />
            <Main />
            <Footer />
        </Container>
    )
}

export default MainAIPage;