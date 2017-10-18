import React from 'react';
import { bool, number, string, func, shape } from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui-icons/PlayArrow';
import { withStyles } from 'material-ui/styles';

const formatTime = ({ startTime, started, seconds: totalSeconds }) => {
  let total = totalSeconds;

  if (started) {
    total += Date.now() - startTime;
  }

  const seconds = total % 60;
  const minutes = total % 60;
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
};

class Timer extends React.Component {
  handleClick = () => {
    const { onClick, id } = this.props;
    onClick(id);
  };

  renderTitle() {
    const { title } = this.props;

    return (
      <Typography align="center" type="headline">
        {title}
      </Typography>
    );
  }

  renderContent() {
    const {
      seconds, started, startTime, classes,
    } = this.props;
    return (
      <div className={classes.stopwatch}>
        <Typography align="center" type="headline">
          {formatTime({ seconds, started, startTime })}
        </Typography>
        <IconButton color="accent" className={classes.btnStart} onClick={this.handleClick}>
          <PlayArrow className={classes.btnIcon} />
        </IconButton>
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

Timer.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  seconds: number.isRequired,
  started: bool.isRequired,
  startTime: number.isRequired,
  classes: shape({}).isRequired,
  onClick: func.isRequired,
};

export default withStyles(styles)(Timer);
