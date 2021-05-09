import React from 'react';
import { connect } from 'react-redux';
import { fetchDays } from '../../store/days/actions';
import { createMeal } from '../../store/meals/actions';
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
import MealsTable from '../shared/MealsTable';

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

  createMeal = async (values) => {
    const res = await this.props.createMeal(values);

    await this.props.fetchDays();

    return res;
  }

  render() {
    return (
      <>
        <MealModal
          modalIsOpen={this.state.mealModalIsOpen}
          closeModal={this.closeMealModal}
          createMeal={this.createMeal}
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

            <MealsTable
              meals={this.props.today && this.props.today.meals ? this.props.today.meals : []}
            />

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
  createMeal,
};

export default connect(mapStateToProps, mapDispatchToProps)(requireRegistrationCompletion(requireAuth(Home)));
