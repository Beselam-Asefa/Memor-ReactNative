/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

// a context for user medication  
const MedicContext = React.createContext([{}, () => {}]);

const medicArray = [];

const MedicProvider = (props) => {
  const [medicine, setMedicine] = useState(medicArray);
  return (
    <MedicContext.Provider value={[medicine, setMedicine]}>
      {props.children}
    </MedicContext.Provider>
  );
};


export {MedicContext, MedicProvider};
