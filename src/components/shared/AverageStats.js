import React from 'react';
import { connect } from 'react-redux';

class AverageStats extends React.Component {
  render() {
    if (!this.props.stats) {
      return null;
    }

    return (
      <div className="ui secondary pointing menu">
        <span className="item">
          Средний вес: <b className="pl-5">{this.props.stats.averageWeight}  кг</b>
        </span>
        <span className="item">
          Среднее потребление ккал/день: <b className="pl-5">{this.props.stats.averageCaloriesPerDay} ккал</b>
        </span>
        <span className="item">
          Средняя продолжительность физ.активность/день: <b className="pl-5">{this.props.stats.averageActivityPerDay} минут</b>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stats: state.user.profile ? state.user.profile.stats : null,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AverageStats);
