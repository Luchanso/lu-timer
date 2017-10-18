/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { compose } from 'recompose';
import Controls from './Controls';
import { updateUiTheme } from '../../store/uiTheme';

class Timers extends React.Component {
  handleChangeTheme = () => {
    const { uiTheme, onUpdateUiTheme } = this.props;

    onUpdateUiTheme({
      ...uiTheme,
      palette: {
        ...uiTheme.palette,
        type: uiTheme.palette.type === 'light' ? 'dark' : 'light',
      }
    })
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Controls theme={this.props.theme.palette.type} onChangeTheme={this.handleChangeTheme} />
        </Grid>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography type="headline">Timer1 - 00:00:00</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  onUpdateUiTheme: updateUiTheme,
};

const mapStateToProps = ({ uiTheme }) => ({ uiTheme });

export default compose(
  withStyles(null, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(Timers);
