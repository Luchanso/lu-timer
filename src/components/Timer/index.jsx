import React from 'react';
import { bool, number, string, func, shape } from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Pause from 'material-ui-icons/Pause';
import DeleteForever from 'material-ui-icons/DeleteForever';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import TextField from 'material-ui/TextField';

const formatTime = ({ startTime, started, seconds: totalSeconds }) => {
  let total = totalSeconds;

  if (started) {
    total += Math.round((Date.now() - startTime) / 1000);
  }

  const seconds = Math.floor(total % 60);
  const minutes = Math.floor(total / 60) % 60;
  const hours = Math.floor(total / 60 / 60);

  const resultSeconds = String(seconds).length === 1 ? `0${seconds}` : seconds;
  const resultMinutes = String(minutes).length === 1 ? `0${minutes}` : minutes;
  const resultHours = String(hours).length === 1 ? `0${hours}` : hours;

  return `${resultHours}:${resultMinutes}:${resultSeconds}`;
};

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  stopwatch: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnStart: {
    marginTop: '-8px',
  },
  btnIcon: {
    width: '40px',
    height: '40px',
  },
  textField: {
    width: 200,
  },
};

class Timer extends React.Component {
  static propTypes = {
    id: string.isRequired,
    title: string.isRequired,
    seconds: number.isRequired,
    started: bool.isRequired,
    startTime: number.isRequired,
    classes: shape({}).isRequired,
    onStart: func.isRequired,
    onDelete: func.isRequired,
    onChangeTitle: func.isRequired,
    onStop: func.isRequired,
    settingsMode: bool,
  };

  static defaultProps = {
    settingsMode: false,
  };

  handleStart = () => {
    const { onStart, id } = this.props;
    onStart(id);
  };

  handleRename = ({ target: { value } }) => {
    const { id, onChangeTitle } = this.props;
    onChangeTitle({ id, title: value });
  };

  handleDelete = () => {
    const { id, onDelete } = this.props;
    onDelete(id);
  };

  handleStop = () => {
    const { id, onStop } = this.props;
    onStop(id);
  };

  renderTitle() {
    const { title, settingsMode, classes } = this.props;

    if (settingsMode) {
      return (
        <TextField
          id="title"
          label="Название"
          className={classes.textField}
          value={title}
          onChange={this.handleRename}
          margin="normal"
        />
      );
    }

    return (
      <Typography align="center" type="headline">
        {title}
      </Typography>
    );
  }

  renderContent() {
    const {
      seconds, started, startTime, classes, settingsMode,
    } = this.props;

    return (
      <div className={classes.stopwatch}>
        <Typography align="center" type="headline">
          {formatTime({ seconds, started, startTime })}
        </Typography>
        {!settingsMode &&
          !started && (
            <Tooltip title="Старт" placement="bottom">
              <IconButton color="accent" className={classes.btnStart} onClick={this.handleStart}>
                <PlayArrow className={classes.btnIcon} />
              </IconButton>
            </Tooltip>
          )}
        {!settingsMode &&
          started && (
            <Tooltip title="Стоп" placement="bottom">
              <IconButton color="accent" className={classes.btnStart} onClick={this.handleStop}>
                <Pause className={classes.btnIcon} />
              </IconButton>
            </Tooltip>
          )}
        {settingsMode && (
          <Tooltip title="Удалить" placement="bottom">
            <IconButton color="accent" className={classes.btnStart} onClick={this.handleDelete}>
              <DeleteForever className={classes.btnIcon} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            {this.renderTitle()}
            {this.renderContent()}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Timer);
