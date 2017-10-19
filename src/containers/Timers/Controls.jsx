import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { shape, string, func, bool, arrayOf } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import moment from 'moment';
import { toggle } from '../../store/settingsMode';
import { updateUiTheme } from '../../store/uiTheme';
import { getStartedTimer, create as createTimer, stop as stopTimer } from '../../store/timers';
import { generateCSV, downloadCSVFile, mergeTimersWithLogs, formatTime } from '../../utils';

const styles = {
  button: {
    marginRight: 16,
  },
};

const FORMAT_CSV_DATA = 'YYYY-MM-DD HH:mm:ss';

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
    timers: shape({}).isRequired,
    timerLog: arrayOf(shape({})).isRequired,
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
  };

  handleDownloadReport = () => {
    const { timers, timerLog } = this.props;

    const merged = mergeTimersWithLogs(timers, timerLog);
    const result = [['Название', 'Старт', 'Стоп', 'Длительность']];
    for (let i = 0; i < merged.length; i += 2) {
      const logStart = merged[i];
      const logStop = merged[i + 1];

      const row = [logStart.title, moment(logStart.start).format(FORMAT_CSV_DATA)];

      if (logStop) {
        row.push(
          moment(logStop.stop).format(FORMAT_CSV_DATA),
          formatTime((logStop.stop - logStart.start) / 1000),
        );
      } else {
        row.push('Активен');
      }

      result.push(row);
    }

    const csv = generateCSV(result);
    console.log(csv);
    downloadCSVFile(csv);
  };

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
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={this.handleDownloadReport}
          >
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

const mapStateToProps = ({
  uiTheme, settingsMode, timers, timerLog,
}) => ({
  settingsMode,
  uiTheme,
  startedTimer: getStartedTimer(timers),
  timers,
  timerLog,
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
