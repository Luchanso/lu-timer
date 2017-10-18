import React from 'react';
import { connect } from 'react-redux';
import { shape, node } from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Wrapper from './Wrapper';

const ThemeProvider = ({ children, uiTheme }) => (
  <MuiThemeProvider theme={createMuiTheme(uiTheme)}>
    <Wrapper>{children}</Wrapper>
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  // eslint-disable-next-line react/no-typos
  children: node.isRequired,
  uiTheme: shape({}).isRequired,
};

const mapStateToProps = (state) => {
  return {
    uiTheme: state.uiTheme,
  };
};

export default connect(mapStateToProps)(ThemeProvider);
