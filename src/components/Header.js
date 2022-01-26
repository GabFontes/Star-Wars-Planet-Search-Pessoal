import React, { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

const COLUMN_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonFilters = [
  'maior que',
  'menor que',
  'igual a',
];

function HeaderFilters() {
  const { changeFilters, handleChange, numericFilter } = useContext(planetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const { filterByNumericValues } = numericFilter;

  const handleClick = () => {
    changeFilters({ column, comparison, value });
  };

  const getColumns = () => {
    const coluns = [];
    filterByNumericValues.forEach((element) => {
      coluns.push(element.column);
    });
    return coluns;
  };

  const coluns = getColumns();
  console.log(coluns);

  return (
    <header>
      <form>
        <label htmlFor="name-filter">
          <input
            placeholder="Filtrar Por Nome"
            id="name-filter"
            data-testid="name-filter"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="column-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            {
              COLUMN_FILTER
                .filter((col) => !coluns.some((opt) => opt === col)).map((col) => (
                  <option key={ col }>
                    {col}
                  </option>
                ))
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ ({ target }) => setComparison(target.value) }
          >
            {comparisonFilters.map((comp) => (
              <option key={ comp } value={ comp }>{comp}</option>
            ))}
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            id="value-filter"
            type="number"
            data-testid="value-filter"
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          onClick={ handleClick }
          type="button"
        >
          Adicionar Filtro
        </button>
      </form>
      <br />
    </header>
  );
}

export default HeaderFilters;
