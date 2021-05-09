import React from 'react';

class MealsTable extends React.Component {
  renderCells() {
    return this.props.meals.map((meal) => {
      return (
        <tr key={meal._id}>
          <td>
            { meal.nutriment || '-' }
          </td>
          <td>
            { meal.weight || '-' }
          </td>
          <td>
            { meal.calories }
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
              Приемы пищи
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Еда
            </td>
            <td>Вес</td>
            <td>Калории</td>
          </tr>
          { this.renderCells() }
        </tbody>
      </table>
    );
  }
}

export default MealsTable;
