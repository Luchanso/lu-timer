import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { load } from '../../store/storage';

class LoadApp extends React.PureComponent {
  static propTypes = {
    onLoad: func.isRequired,
  }

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  onLoad: load,
};

export default connect(null, mapDispatchToProps)(LoadApp);
