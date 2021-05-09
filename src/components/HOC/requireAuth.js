import React from 'react';
import { connect } from 'react-redux';
import routes from '../navigation/routes';

const mapStateToProps = (state) => {
  return {
    auth: state.user.isAuth,
  }
}

const requireAuth = ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push(routes.login);
      }
    }
    render() {
      return <ChildComponent {...this.props} />
    }
  }

  return connect(mapStateToProps, null)(ComposedComponent);;
}

export default requireAuth;
