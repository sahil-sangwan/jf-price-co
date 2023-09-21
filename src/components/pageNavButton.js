import React from 'react';
import styled from 'styled-components';

const ButtonToPages = styled.a`
color:white;
padding: 2vh 0.5vw;
width:50%;
text-decoration: none;
&:hover {
    color: #ECC570;
}
`

const MainButton = styled.a`
white-space:nowrap;
text-align:center;
padding: 1vh 1vw;
text-decoration: none;
color: white;
&:hover {
    color: #ECC570;
    font-size: 18px;
}
`

export const PageButton = ButtonToPages;
export const NavButton = MainButton;