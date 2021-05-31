import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timeLeft: 0,
      isActive: false,
    };
  }

  componentDidMount() {
    this.setState({
      time: this.getTimeInSeconds(),
      timeLeft: this.getTimeInSeconds(),
    });
  }

  resetTime() {
    this.setState({
      timeLeft: this.state.time,
    });
    clearInterval(this.interval);
    this.interval = null;
    this.timeout = null;
  }

  handleStartTimer() {
    if (this.timeout) return;
    this.interval = setInterval(() => {
      this.setState((currentState) => {
        return {
          timeLeft: currentState.timeLeft - 0.1,
        };
      });
    }, 100);
    this.timeout = setTimeout(() => {
      this.props.onComplete();
      this.resetTime();
    }, this.state.time * 1000);
  }

  handleStopTimer() {
    clearTimeout(this.timeout);
    this.resetTime();
  }

  getTimeInSeconds() {
    return (
      this.props.settings.seconds +
      60 * this.props.settings.minutes +
      3600 * this.props.settings.hours
    );
  }

  render() {
    return (
      <div>
        <span>
          {`${this.props.settings.hours}:${this.props.settings.minutes}:${this.props.settings.seconds}`}
        </span>
        <hr />
        <span>{this.state.timeLeft.toFixed(1)}</span>
        <button onClick={() => this.handleStartTimer()}>Start</button>
        <button onClick={() => this.handleStopTimer()}>Stop</button>
      </div>
    );
  }
}
