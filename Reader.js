import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Publication from './Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';
import styles from './Reader.module.css';

export default class Reader extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    indexCurrentPage: 0,
  };

  handlePrev = () => {
    this.setState(prevState => ({
      indexCurrentPage: prevState.indexCurrentPage - 1,
    }));
  };

  handleNext = () => {
    this.setState(prevState => ({
      indexCurrentPage: prevState.indexCurrentPage + 1,
    }));
  };

  render() {
    const { items } = this.props;
    const { indexCurrentPage } = this.state;

    return (
      <div className={styles.reader}>
        <Publication item={items[indexCurrentPage]} />
        <Counter currentPage={indexCurrentPage} totalPages={items.length} />
        <Controls
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
          indexCurrentPage={indexCurrentPage}
          totalPages={items.length}
        />
      </div>
    );
  }
}
