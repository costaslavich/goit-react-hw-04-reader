import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Publication from '../Publication/Publication';
import Counter from '../Counter/Counter';
import Controls from '../Controls/Controls';
import publications from '../publications.json';
import styles from './Reader.module.css';

const queryParams = props => queryString.parse(props.location.search).item;

class Reader extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    items: publications,
  };

  componentDidMount() {
    const { history, location } = this.props;
    const { items } = this.state;
    const indexCurrentPage = queryParams(this.props);

    if (
      Number(indexCurrentPage) >= 0 &&
      Number(indexCurrentPage) < items.length
    ) {
      history.push({
        ...location,
        search: `?item=${Number(indexCurrentPage)}`,
      });
    } else
      history.replace({
        pathname: '/reader',
        search: `?item=1`,
      });
  }

  // componentDidUpdate(prevProps) {
  //   const { history, location } = this.props;
  //   const indexCurrentPage = queryParams(this.props);

  //   if (prevProps.location !== location) {
  //     history.push({
  //       ...location,
  //       search: `?item=${Number(indexCurrentPage)}`,
  //     });
  //   }
  // }

  handlePrev = () => {
    const { history, location } = this.props;
    const indexCurrentPage = queryParams(this.props);

    history.push({
      ...location,
      search: `?item=${Number(indexCurrentPage) - 1}`,
    });
  };

  handleNext = () => {
    const { history, location } = this.props;
    const indexCurrentPage = queryParams(this.props);

    history.push({
      ...location,
      search: `?item=${Number(indexCurrentPage) + 1}`,
    });
  };

  render() {
    const { items } = this.state;
    const indexCurrentPage = queryParams(this.props);

    return (
      <div className={styles.reader}>
        <Publication article={items[Number(indexCurrentPage)]} />
        <Counter
          currentPage={Number(indexCurrentPage) + 1}
          totalPages={items.length}
        />
        <Controls
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
          indexCurrentPage={Number(indexCurrentPage)}
          totalPages={items.length}
        />
      </div>
    );
  }
}

export default withRouter(Reader);
