/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

//a context for user suppliment
const SuppContext = React.createContext([{}, () => {}]);

const SupplimentArray = [];

const SuppProvider = (props) => {
  const [suppliment, setSuppliment] = useState(SupplimentArray);
  return (
    <SuppContext.Provider value={[suppliment, setSuppliment]}>
      {props.children}
    </SuppContext.Provider>
  );
};


export {SuppContext, SuppProvider};
