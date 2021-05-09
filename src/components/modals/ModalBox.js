import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#modal');

class ModalBox extends React.Component {
  render() {
    return (
      <div className="modal-box-wrapper">
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
        >
          <div className="modal-box">
            { this.props.children }
          </div>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<ModalBox />, document.getElementById('modal'));

export default ModalBox;

