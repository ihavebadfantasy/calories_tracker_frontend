import React from 'react';
import { connect } from 'react-redux';

class TodayStats extends React.Component {
  render() {
    return (
      <div className="ui secondary pointing menu">
        <span className="item">
          Вес сегодня: <b className="pl-5">0 кг</b>
        </span>
        <span className="item">
          Осталось ккал сегодня: <b className="pl-5">0 ккал</b>
        </span>
        <span className="item">
          Физ. активность сегодня: <b className="pl-5">0 минут</b>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.days.today,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TodayStats);
