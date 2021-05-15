import React from 'react';
import { connect } from 'react-redux';
import { fetchDays } from '../../store/days/actions';
import { createMeal, updateMeal, deleteMeal } from '../../store/meals/actions';
import { createActivity, updateActivity, deleteActivity } from '../../store/activities/actions';
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
import ActivitiesTable from '../shared/ActivitiesTable';
import ActivityModal from '../modals/ActivityModal';

class Home extends React.Component {
  state = {
    mealModalIsOpen: false,
    activityModalIsOpen: false,
    currentActivity: null,
    currentMeal: null,
  };

  componentDidMount() {
    this.props.fetchDays();
  }

  closeMealModal = () => {
    this.setState({...this.state, mealModalIsOpen: false});
  }

  openCreateMealModal = () => {
    this.setState({...this.state, mealModalIsOpen: true});
  }

  openEditMealModal = (mealId) => {
    const currentMeal = this.props.today.meals.find((meal) => {
      return meal._id === mealId;
    });

    if (!currentMeal) {
      return;
    }

    this.setState({...this.state, currentMeal}, () => {
      this.setState({...this.state, mealModalIsOpen: true});
    });
  }

  createMeal = async (values) => {
    const res = await this.props.createMeal(values);

    await this.props.fetchDays();

    return res;
  }

  updateMeal = async (values, id) => {
    const res = await this.props.updateMeal(values, id);

    await this.props.fetchDays();

    return res;
  }

  deleteMeal = async (id) => {
    const res = await this.props.deleteMeal(id);

    await this.props.fetchDays();

    return res;
  }

  closeActivityModal = () => {
    this.setState({...this.state, activityModalIsOpen: false});
  }

  openCreateActivityModal = () => {
    this.setState({...this.state, activityModalIsOpen: true});
  }

  openEditActivityModal = (activityId) => {
    const currentActivity = this.props.today.dailyActivities.find((activity) => {
      return activity._id === activityId;
    });

    if (!currentActivity) {
      return;
    }

    this.setState({...this.state, currentActivity}, () => {
      this.setState({...this.state, activityModalIsOpen: true});
    });
  }

  createActivity = async (values) => {
    const res = await this.props.createActivity(values);

    await this.props.fetchDays();

    return res;
  }

  updateActivity = async (values, id) => {
    const res = await this.props.updateActivity(values, id);

    await this.props.fetchDays();

    return res;
  }

  deleteActivity = async (id) => {
    const res = await this.props.deleteActivity(id);

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
          updateMeal={this.updateMeal}
          meal={this.state.currentMeal}
        />

        <ActivityModal
          modalIsOpen={this.state.activityModalIsOpen}
          closeModal={this.closeActivityModal}
          createActivity={this.createActivity}
          updateActivity={this.updateActivity}
          activity={this.state.currentActivity}
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
              onEditClick={this.openEditMealModal}
              onDeleteClick={this.deleteMeal}
              meals={this.props.today && this.props.today.meals ? this.props.today.meals : []}
            />
            <ActivitiesTable
              onEditClick={this.openEditActivityModal}
              onDeleteClick={this.deleteActivity}
              activities={this.props.today && this.props.today.dailyActivities ? this.props.today.dailyActivities : []}
            />

            <AddDropdownButton
              onAddMealClick={this.openCreateMealModal}
              onAddActivityClick={this.openCreateActivityModal}
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
  updateMeal,
  deleteMeal,
  createActivity,
  updateActivity,
  deleteActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(requireRegistrationCompletion(requireAuth(Home)));
