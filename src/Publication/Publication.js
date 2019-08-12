import React from 'react';
import PropTypes from 'prop-types';
import styles from './Publication.module.css';

const Publications = ({ article }) => (
  <article className={styles.publication}>
    <h2>{article.title}</h2>
    <p>{article.text}</p>
  </article>
);

Publications.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Publications;
