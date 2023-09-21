import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainNav = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    display: flex !important;
    flex-direction: row;
    justify-content: center;
  }`

export default MainNav;