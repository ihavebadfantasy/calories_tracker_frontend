import React from 'react';

class FormCard extends React.Component {
  render() {
    return (
      <div className="ui cards">
        <div className="card">
          <div className="content">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default FormCard;
