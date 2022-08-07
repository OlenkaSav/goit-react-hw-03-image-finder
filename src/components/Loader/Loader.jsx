import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Loader({ query }) {
  return (
    <Wrapper>
      <TailSpin
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
      ;
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNotification = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
`;

Loader.propTypes = {
  query: PropTypes.string,
};
export default Loader;
