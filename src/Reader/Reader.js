import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Publication from '../Publication/Publication';
import Counter from '../Counter/Counter';
import Controls from '../Controls/Controls';
import publications from '../publications.json';
import styles from './Reader.module.css';

const queryParams = (indexCurrentPage, itemNumber) => {
  if (indexCurrentPage) {
    return Number(queryString.parse(indexCurrentPage).item);
  }

  return Number(itemNumber);
};

class Reader extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    items: publications,
    indexCurrentPage: 0,
  };

  componentDidMount() {
    const { indexCurrentPage } = this.state;
    const { history, location } = this.props;
    const qsNumberPublication = queryParams(location.search, indexCurrentPage);

    if (qsNumberPublication !== indexCurrentPage) {
      this.setState({ indexCurrentPage: qsNumberPublication });

      history.push({
        ...location,
        search: `?item=${qsNumberPublication}`,
      });
      return;
    }
    history.push({
      ...location,
      search: `?item=${indexCurrentPage}`,
    });
  }

  handlePrev = () => {
    const NumberParse = queryParams(this.props.location.search);

    this.setState({
      indexCurrentPage: NumberParse - 1,
    });
  };

  handleNext = () => {
    const NumberParse = queryParams(this.props.location.search);

    this.setState({
      indexCurrentPage: NumberParse + 1,
    });
  };

  componenetDidUpdate(prevState) {
    const { indexCurrentPage } = this.state;
    const { history, location } = this.props;

    if (queryParams(prevState.location.search) === indexCurrentPage) {
      return;
    }
    history.push({
      ...location,
      search: `?item=${indexCurrentPage}`,
    });
  }

  render() {
    const { indexCurrentPage, items } = this.state;

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

export default withRouter(Reader);
