import React from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import {makeStyles} from '@material-ui/core/styles';

import '../style/countdown.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    paddingTop: '40px',
  },
});

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
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
        colors={[['#7E2E84']]}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({elapsedTime}) => renderTime('days', getTimeDays(daysDuration - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#D14081']]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds,
        ]}
      >
        {({elapsedTime}) => renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#EF798A']]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds,
        ]}
      >
        {({elapsedTime}) =>
          renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#218380']]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0]}
      >
        {({elapsedTime}) => renderTime('seconds', getTimeSeconds(elapsedTime))}
      </CountdownCircleTimer>
    </div>
  );
}