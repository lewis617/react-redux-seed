import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function Spin(props) {
  const styles = require('./index.scss');
  return (
    <div className={styles.spin}>
      {props.loadingNumber > 0 && (
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      )}
    </div>
  );
}

Spin.propTypes = {
  loadingNumber: PropTypes.number.isRequired
};

export default connect(
  state => ({ loadingNumber: state.async.loadingNumber || 0 })
)(Spin);
