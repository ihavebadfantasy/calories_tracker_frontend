import React from 'react';
import { connect } from 'react-redux';
import { fetchDays } from '../../store/days/actions';
import requireRegistrationCompletion from '../HOC/requireRegistrationCompletion';
import requireAuth from '../HOC/requireAuth';
import Loader from '../shared/Loader';
import Header from '../shared/Header';
import AverageStats from '../shared/AverageStats';
import TodayStats from '../shared/TodayStats';
import AddDropdownButton from '../shared/AddDropdownButton';
import routes from '../navigation/routes';
import ModalBox from '../modals/ModalBox';
import MealModal from '../modals/MealModal';

class Home extends React.Component {
  state = {
    mealModalIsOpen: false,
  };

  componentDidMount() {
    this.props.fetchDays();
  }

  closeMealModal = () => {
    this.setState({...this.state, mealModalIsOpen: false});
  }

  openMealModal = () => {
    this.setState({...this.state, mealModalIsOpen: true});
  }

  render() {
    return (
      <>
        <MealModal
          modalIsOpen={this.state.mealModalIsOpen}
          closeModal={this.closeMealModal}
        />

        <Header activeLink={routes.home} />
        <AverageStats />
        {this.props.days.length < 0 ? (
          <div className="full-page-content-centered">
            <Loader size="massive" />
          </div>
        ) : (
          <>
            <TodayStats />
            <AddDropdownButton
              onAddMealClick={this.openMealModal}
            />
          </>
          )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(requireRegistrationCompletion(requireAuth(Home)));
