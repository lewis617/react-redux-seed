import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import {
  increment, decrement, incrementIfOdd,
  incrementAsync, loadCounter
} from '../../redux/counter';

class Counter extends Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    loadCounter: PropTypes.func.isRequired,
    counter: PropTypes.any,
    counterLoadState: PropTypes.any
  };

  render() {
    const {
      increment, decrement, incrementIfOdd, incrementAsync,
      counter, counterLoadState, loadCounter
    } = this.props;
    const styles = require('./index.css');
    return (
      <div className="container">
        <Helmet title="计数器"/>
        <div className={styles.counterPage}>
          <img
            alt="Counter"
            src={require('./counter.png')}
            className={styles.counter}
          />
          {' '}
          <Button onClick={increment}>+</Button>
          {' '}
          <Button onClick={decrement}>-</Button>
          {' '}
          <Button onClick={incrementIfOdd}>Increment if odd</Button>
          {' '}
          <Button onClick={() => incrementAsync()}>Increment async</Button>
          {' '}
          <Button
            bsStyle={counterLoadState.loaded ? 'success' : 'danger'}
            onClick={loadCounter}
          >
            load
          </Button>
          <br/><br/>
          counter的值：
          <pre>{serialize(counter, { space: 2 })}</pre>
          <br/><br/>
          counter的加载状态:
          <pre>{serialize(counterLoadState, { space: 2 })}</pre>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    counter: state.async.counter,
    counterLoadState: state.async.loadState && state.async.loadState.counter
  }),
  { increment, decrement, incrementIfOdd, incrementAsync, loadCounter }
)(Counter);
