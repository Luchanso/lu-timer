import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { shape, string, func, bool } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { toggle } from '../../store/settingsMode';
import { updateUiTheme } from '../../store/uiTheme';
import { getStartedTimer, create as createTimer, stop as stopTimer } from '../../store/timers';

const styles = {
  button: {
    marginRight: 16,
  },
};

class Controls extends React.PureComponent {
  static propTypes = {
    classes: shape({
      button: string,
    }).isRequired,
    uiTheme: shape({}).isRequired,
    onUpdateUiTheme: func.isRequired,
    onToggleSettingsMode: func.isRequired,
    settingsMode: bool.isRequired,
    startedTimer: shape({
      title: string.isRequired,
    }),
    onCreateTimer: func.isRequired,
    onStopTimer: func.isRequired,
  };

  static defaultProps = {
    startedTimer: undefined,
  };

  handleChangeTheme = () => {
    const { uiTheme, onUpdateUiTheme } = this.props;

    onUpdateUiTheme({
      ...uiTheme,
      palette: {
        ...uiTheme.palette,
        type: uiTheme.palette.type === 'light' ? 'dark' : 'light',
      },
    });
  };

  handleToggleSettingsMode = () => {
    const { onToggleSettingsMode } = this.props;

    onToggleSettingsMode();
  };

  handleNewTimer = () => {
    this.props.onCreateTimer('');
  };

  handleStop = () => {
    const { startedTimer: { id }, onStopTimer } = this.props;

    onStopTimer(id);
  }

  render() {
    const {
      classes, uiTheme, settingsMode, startedTimer,
    } = this.props;

    const theme = uiTheme.palette.type;

    return (
      <div>
        <FormGroup row>
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={this.handleToggleSettingsMode}
          >
            {settingsMode ? 'Режим работы' : 'Режим настройки'}
          </Button>
          {settingsMode && (
            <Button raised color="accent" className={classes.button} onClick={this.handleNewTimer}>
              Создать
            </Button>
          )}
          <Button raised color="primary" className={classes.button}>
            Экспорт CSV
          </Button>
          <Button
            raised
            color="accent"
            className={classes.button}
            disabled={settingsMode || !startedTimer}
            onClick={this.handleStop}
          >
            Остановить {startedTimer && `"${startedTimer.title}"`}
          </Button>
          <FormControlLabel
            control={<Switch checked={theme === 'dark'} onChange={this.handleChangeTheme} />}
            label="Тёмная тема"
          />
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = ({ uiTheme, settingsMode, timers }) => ({
  settingsMode,
  uiTheme,
  startedTimer: getStartedTimer(timers),
});

const mapDispatchToProps = {
  onToggleSettingsMode: toggle,
  onUpdateUiTheme: updateUiTheme,
  onCreateTimer: createTimer,
  onStopTimer: stopTimer,
};

export default compose(
  withStyles(styles, { withStyles: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(Controls);
