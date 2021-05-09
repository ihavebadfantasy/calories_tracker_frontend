import React from 'react';
// TODO: add closing on click outside
class AddDropdownButton extends React.Component {
  state = {
    isOptionsVisible: false,
  }

  toggleOptions = () => {
    this.setState({...this.state, isOptionsVisible: !this.state.isOptionsVisible});
  }

  render() {
    return (
      <div
        className="ui teal buttons fixed-right"
        onClick={this.toggleOptions}
      >
        <div className="ui button">Добавить</div>
        <div className={`ui floating dropdown icon button ${this.state.isOptionsVisible ? 'visible' : ''}`}>
          <i className="dropdown icon"></i>
          <div className={`menu ${this.state.isOptionsVisible ? 'transition visible' : ''}`}>
            <div className="item" onClick={this.props.onAddMealClick}>
              <i className="utensils icon"></i>
              Прием пищи
            </div>
            <div className="item"><i className="hand rock icon"></i>Физическую активность</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDropdownButton;
