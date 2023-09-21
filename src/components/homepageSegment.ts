import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HomepageSegment = styled.div< { $inputColor?: string } >`
display: flex;
gap: 8px;
justify-content: center;
margin: 20px 0;
flex-flow: row wrap;
align-items: space-between;
background-color: ${props => props.$inputColor || '#7D7C7A' };
text-align: center;
transition: flex-wrap 2s ease;
`
export default HomepageSegment;
