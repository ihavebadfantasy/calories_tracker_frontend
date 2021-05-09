import React from 'react';
import ModalBox from './ModalBox';

class MealModal extends React.Component {
  render() {
    return (
      <ModalBox
        modalIsOpen={this.props.modalIsOpen}
        closeModal={this.props.closeModal}
      >
        <div className="modal-box-header">
          <div className="modal-box-header-content">
            Прием пищи
          </div>
          <i
            onClick={this.props.closeModal}
            className="close icon modal-box-close-btn"
          />
        </div>
      </ModalBox>
    );
  }
}

export default MealModal;
