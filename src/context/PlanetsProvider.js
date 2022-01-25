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

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(initalInput);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    (() => {
      setSearch(() => data
        .filter((e) => e.name.includes(input.filters.filterByName.name)));
    })();
  }, [input, data]);

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
    search,
  };

  return (
    <planetsContext.Provider value={ contexto }>
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
