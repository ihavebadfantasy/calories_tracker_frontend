import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from '../navigation/routes';
import { logoutUser } from '../../store/user/actions';

const headerNavItems = [
  {
    text: 'Сегодня',
    to: routes.home,
  },
  {
    text: 'Все дни',
    to: routes.allDays,
  },
  {
    text: 'Профиль',
    to: routes.profile,
  },
];

class Header extends React.Component {
  logoutUser() {

  }

  renderNavMenu() {
    return headerNavItems.map((item) => {
      return (
        <NavLink
          key={item.text}
          to={item.to}
          className="item"
          activeClassName="active"
        >
          { item.text }
        </NavLink>
      );
    })
  }

  render() {
    return (
      <div className="ui stackable menu">
        { this.renderNavMenu() }

        <div className="right menu">
          <a
            className="ui item"
            onClick={this.props.logoutUser}
          >
            Выйти
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect(null, mapDispatchToProps)(Header);
