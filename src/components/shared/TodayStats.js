import React from 'react';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import { updateToday } from '../../store/days/actions';
// TODO: close editWeight input on click outside
class TodayStats extends React.Component {

  state = {
    weightEditEnabled: false,
    editableWeight: '',
  }

  enableWeightEdit = () => {
    this.setState({...this.state, weightEditEnabled: true});
  }

  onWeightInputChange = (e) => {
    this.setState({...this.state, editableWeight: e.target.value});
  }

  onEditWeightSubmit = async (e) => {
    e.preventDefault();
    const res = await this.props.updateToday({weight: this.state.editableWeight}, this.props.today._id);

    if (!res.status) {
      this.setState({...this.state, weightEditEnabled: false});
    }
  }

  render() {
    const weight = (this.props.today && this.props.today.weight) ? this.props.today.weight : '?';
    const caloriesLeft = (this.props.today && this.props.today.caloriesLeft) ? this.props.today.caloriesLeft : (this.props.profile && this.props.profile.caloriesPerDay ) ? this.props.profile.caloriesPerDay : '-';
    const activity = (this.props.today && this.props.today.dailyActivity) ? this.props.today.dailyActivity : '0';

    return (
      <div className="ui secondary pointing menu">
        <span className="item" onClick={this.enableWeightEdit}>
          Вес сегодня:
          { this.state.weightEditEnabled ? (
            <form onSubmit={this.onEditWeightSubmit}>
              <InputMask
                maskChar={null}
                className="d-inline-block ml-5"
                mask="999"
                type="phone"
                onChange={this.onWeightInputChange}
                value={this.state.editableWeight}
                placeholder="55"
              />
            </form>
          ) : (
            <>
              <b className="pl-5">{ weight } кг</b>
              <i className="icon edit pl-10 cursor-pointer" />
            </>
          )}
        </span>
        <span className="item">
          Осталось ккал сегодня: <b className="pl-5">{ caloriesLeft } ккал</b>
        </span>
        <span className="item">
          Физ. активность сегодня: <b className="pl-5">{ activity } минут</b>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.days.today,
    profile: state.user.profile,
  };
}

const mapDispatchToProps = {
  updateToday,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodayStats);
