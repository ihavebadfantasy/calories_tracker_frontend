import React from 'react';

class Loader extends React.Component {
  render() {
    const size = this.props.size || 'small'
    return (
      <div className={`ui active inline loader ${size}`}/>
    );
  }
}

export default Loader;
