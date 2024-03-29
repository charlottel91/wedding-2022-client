import React from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import {makeStyles} from '@material-ui/core/styles';

import '../style/countdown.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
});

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 80,
  strokeWidth: 5,
};

const renderTime = (dimension, time) => {
  return (
    <div>
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function Countdown() {
  const classes = useStyles();
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  // eslint-disable-next-line max-len
  const endTime = new Date('July 02, 2022 15:00:00 UTC+02:00').getTime() / 1000; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div className={classes.root}>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#F2F2F2']]}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({elapsedTime}) => renderTime('jrs', getTimeDays(daysDuration - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#F2F2F2']]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds,
        ]}
      >
        {({elapsedTime}) => renderTime('h', getTimeHours(daySeconds - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#F2F2F2']]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds,
        ]}
      >
        {({elapsedTime}) => renderTime('mn', getTimeMinutes(hourSeconds - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#F2F2F2']]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0]}
      >
        {({elapsedTime}) => renderTime('s', getTimeSeconds(elapsedTime))}
      </CountdownCircleTimer>
    </div>
  );
}
