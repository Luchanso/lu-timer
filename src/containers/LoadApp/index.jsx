import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { load, record } from '../../store/storage';

class LoadApp extends React.PureComponent {
  static propTypes = {
    onLoad: func.isRequired,
    onRecord: func.isRequired,
  }

  componentDidMount() {
    this.props.onLoad();
    this.props.onRecord();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  onLoad: load,
  onRecord: record,
};

export default connect(null, mapDispatchToProps)(LoadApp);
