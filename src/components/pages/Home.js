import React from 'react';
import requireAuth from '../HOC/requireAuth';
import requireRegistrationCompletion from '../HOC/requireRegistrationCompletion';

class Home extends React.Component {
  render() {
    return (
      <div>Home</div>
    );
  }
}

export default requireRegistrationCompletion(requireAuth(Home));
