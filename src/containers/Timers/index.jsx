import React from 'react';
import { func, shape, arrayOf, bool } from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Controls from './Controls';
import Timer from '../../components/Timer';
import {
  stop as timerStop,
  toggleNextTimer as timerToggleNextTimer,
  remove as timerDelete,
  changeTitle as timerChangeTitle,
} from '../../store/timers';

const INTERVAL_UPDATE = 1000; // 1 sec.

class Timers extends React.Component {
  static propTypes = {
    timers: arrayOf(shape({})).isRequired,
    onStart: func.isRequired,
    onDelete: func.isRequired,
    onChangeTitle: func.isRequired,
    settingsMode: bool.isRequired,
    onStop: func.isRequired,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, INTERVAL_UPDATE);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      timers, settingsMode, onDelete, onStart, onChangeTitle, onStop,
    } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Controls />
        </Grid>
        {timers.map(timer => (
          <Timer
            key={timer.id}
            {...timer}
            onStart={onStart}
            onDelete={onDelete}
            onChangeTitle={onChangeTitle}
            onStop={onStop}
            settingsMode={settingsMode}
          />
        ))}
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  onStart: timerToggleNextTimer,
  onDelete: timerDelete,
  onChangeTitle: timerChangeTitle,
  onStop: timerStop,
};

const mapStateToProps = ({ settingsMode, timers }) => ({
  timers: Object.values(timers),
  settingsMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
