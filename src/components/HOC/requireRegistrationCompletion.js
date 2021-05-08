import React from 'react';
import { connect } from 'react-redux';
import routes from '../navigation/routes';

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

const requireRegistrationCompletion = ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.profile || !this.props.profile.isRegistrationComplete) {
        this.props.history.push(routes.createProfile);
      }
    }
    render() {
      return <ChildComponent {...this.props} />
    }
  }

  return connect(mapStateToProps, null)(ComposedComponent);;
}

export default requireRegistrationCompletion;
