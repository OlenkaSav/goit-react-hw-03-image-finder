import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('Нажали ESC, нужно закрыть модалку');
      console.log(this.props);
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    // console.log('Кликнули в бекдроп');

    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { large, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalContent>
          <img src={large} alt={tags} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.array,
  large: PropTypes.string,
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ModalContent = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
