import React from 'react';

class ActivitiesTable extends React.Component {
  renderCells() {
    return this.props.activities.map((activity) => {
      return (
        <tr key={activity._id}>
          <td>
            { activity.name || '-' }
          </td>
          <td>
            { activity.duration || '-' }
          </td>
          <td>
            { activity.calories }
            <div className="table-controls">
              <i
                className="edit icon cursor-pointer"
                onClick={() => {
                  this.props.onEditClick(activity._id);
                }}
              />
              <i
                className="close icon cursor-pointer"
                onClick={() => {
                  this.props.onDeleteClick(activity._id);
                }}
              />
            </div>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <table className="ui celled striped table">
        <thead>
          <tr>
            <th colSpan="3">
              Физические активности
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Название
            </td>
            <td>
              Продолжительность (минуты)
            </td>
            <td>
              Потраченные калории
            </td>
          </tr>
          { this.renderCells() }
        </tbody>
      </table>
    );
  }
}

export default ActivitiesTable;
