import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../Services/fetchPlanets';
import planetsContext from './PlanetsContext';

const initalInput = {
  filters: {
    filterByName: {
      name: '',
    },
  },
};

const numericValueFilter = {
  filterByNumericValues: [
    {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  ],
};

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(initalInput);
  const [search, setSearch] = useState([]);
  const [numericFilter, setNumericFilter] = useState(numericValueFilter);

  useEffect(() => {
    (() => {
      setSearch(() => data
        .filter((e) => e.name.toLowerCase().includes(input.filters.filterByName.name)));
    })();
  }, [input, data]);

  const changeFilters = (column, comparison, value) => {
    setNumericFilter(() => ({
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    }));
  };

  const setFilter = () => {
    // créditos ao Airton Lopes
    const { filterByNumericValues } = numericFilter;
    const { column, comparison, value } = filterByNumericValues[0];
    const filter = search.filter((p) => {
      const columnValue = Number(p[column]);
      const filterValue = Number(value);
      if (comparison === 'maior que') {
        return columnValue > filterValue;
      }
      if (comparison === 'menor que') {
        return columnValue < filterValue;
      }
      return columnValue === filterValue;
    });
    setSearch(filter);
  };

  useEffect(() => {
    (() => {
      setFilter();
    })();
  }, [numericFilter]);

  const handleChange = ({ target }) => {
    setInput(() => ({
      filters: {
        filterByName: {
          name: target.value,
        },
      },
    }));
  };

  useEffect(() => {
    (async () => {
      const { results } = await fetchPlanets();

      setData(results);
      setSearch(results);
    })();
  }, []);

  const contexto = {
    data,
    handleChange,
    changeFilters,
    numericFilter,
    search,
  };

  return (
    <planetsContext.Provider value={ contexto }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
