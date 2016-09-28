import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const UPDATE_TIME = 200;
const MAX_PROGRESS = 90;
const PROGRESS_INCREASE = 5;
const ANIMATION_TIME = UPDATE_TIME * 2;

const initialState = {
  percent: 0,
  progressInterval: null,
  animationTimeout: null,
};

class LoadingBar extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading > this.props.loading) {
      this.launch();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.progressInterval);
    clearTimeout(this.state.animationTimeout);
  }

  launch = () => {
    let { progressInterval, percent } = this.state;
    const { animationTimeout } = this.state;

    if (!progressInterval) {
      progressInterval = setInterval(
        this.simulateProgress,
        this.props.updateTime
      );
      clearTimeout(animationTimeout);
      percent = 0;
    }

    this.setState({ ...this.state, progressInterval, percent });
  };

  simulateProgress = () => {
    let { progressInterval, percent, animationTimeout } = this.state;

    if (percent === 100) {
      clearInterval(progressInterval);
      animationTimeout = setTimeout(this.resetProgress, ANIMATION_TIME);
      progressInterval = null;
    } else if (this.props.loading === 0) {
      percent = 100;
    } else if (percent < this.props.maxProgress) {
      percent += this.props.progressIncrease;
    }

    this.setState({ percent, progressInterval, animationTimeout });
  };

  resetProgress = () => {
    this.setState(initialState);
  };

  shouldShow = percent => (percent > 0) && (percent < 100);

  buildStyle = () => {
    const style = {
      height: '3px',
      width: `${this.state.percent}%`,
      backgroundColor: '#5cb85c',
      transition: `width ${ANIMATION_TIME}ms ease-out,
                   height ${ANIMATION_TIME}ms linear,
                   opacity ${ANIMATION_TIME}ms ease-out`,
      position: 'absolute',
      opacity: '1',
      zIndex: '999',
      boxShadow: '-3px 0 15px 1px rgba(0,255,231,.4)'
    };

    return { ...style, ...this.props.style };
  };

  render() {
    const style = this.buildStyle();

    if (this.shouldShow(this.state.percent)) {
      style.opacity = '1';
    } else {
      style.opacity = '0';
    }

    return (
      <div>
        <div style={style} className={this.props.className}/>
        <div style={{ display: 'table', clear: 'both' }}/>
      </div>
    );
  }
}

LoadingBar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  loading: PropTypes.number,
  updateTime: PropTypes.number,
  maxProgress: PropTypes.number,
  progressIncrease: PropTypes.number,
};

LoadingBar.defaultProps = {
  style: {},
  className: undefined,
  loading: 0,
  updateTime: UPDATE_TIME,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
};


export default connect(
  state => ({
    loading: state.async.loadingNumber || 0,
  })
)(LoadingBar);
