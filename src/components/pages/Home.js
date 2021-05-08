import React from 'react';
import requireAuth from '../HOC/requireAuth';

class Home extends React.Component {
  render() {
    return (
      <div>Home</div>
    );
  }
}

export default requireAuth(Home);
