import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useContext } from 'react';

const Card = styled.div< { $expand?: number } >`
display:flex;
flex-direction:column;
gap:2px;
justify-content:flex-start;
// transition: order 0.5s ease;
border-radius: 10px;
@media(min-width: 1200px) {
    width:30%;
    aspect-ratio:1;
  }
width:300px
aspect-ratio:1;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
text-decoration: none;
background-color:#c2bfba;
&:hover {
    background:rgba(0, 0, 0, 0.35);
    color:white;
    box-shadow: 0 4px 8px 0 rgba(255,255,255,0.2);

}
`

export default Card;