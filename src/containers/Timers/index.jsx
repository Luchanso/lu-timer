import React from 'react';
import { func, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Controls from './Controls';
import Timer from '../../components/Timer';
import { start as timerStart } from '../../store/timers';

class Timers extends React.Component {
  static propTypes = {
    timers: arrayOf(shape({})).isRequired,
    onStart: func.isRequired,
  };

  handleClick = (id) => {
    const { onStart } = this.props;

    onStart(id);
  };

  render() {
    const { timers } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Controls />
        </Grid>
        {timers.map(timer => <Timer key={timer.id} {...timer} onClick={this.handleClick} />)}
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  onStart: timerStart,
};

const testData = [
  {
    id: '1',
    title: 'Отгрузка на торговый склад номер №4',
    seconds: 0,
    started: false,
    startTime: new Date().getTime(),
  },
  {
    id: '2',
    title: 'ASC',
    seconds: 100500,
    started: true,
    startTime: new Date().getTime(),
  },
];

for (let i = 0; i < 13; i += 1) {
  testData.push({
    seconds: Math.round(Math.random() * 200000),
    id: Math.random().toString(),
    title: (Math.random() * 1e10).toString(36),
    startTime: new Date().getTime(),
    started: false,
  });
}

const mapStateToProps = () => ({ timers: testData });

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
