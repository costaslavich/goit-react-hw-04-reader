import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.css';

const Counter = ({ currentPage, totalPages }) => (
  <Fragment>
    <p className={styles.counter}>
      {currentPage}/{totalPages}
    </p>
  </Fragment>
);

Counter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Counter;
