import React from 'react';
import { connect } from 'react-redux';
import { fetchDays } from '../../store/days/actions';
import requireRegistrationCompletion from '../HOC/requireRegistrationCompletion';
import Loader from '../shared/Loader';
import Header from '../shared/Header';
import routes from '../navigation/routes';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchDays();
  }

  render() {
    return (
      <>
        <Header activeLink={routes.home} />
        {this.props.days.length < 0 ? (
          <div className="full-page-content-centered">
            <Loader size="massive" />
          </div>
        ) : (
          <div>Home</div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    days: state.days.days,
    today: state.days.today,
  };
}

const mapDispatchToProps = {
  fetchDays,
};

export default connect(mapStateToProps, mapDispatchToProps)(requireRegistrationCompletion(Home));
