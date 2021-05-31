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
    if (
      !/^(\d*\.)?\d+$/.test(this.props.settings.hours) ||
      !/^(\d*\.)?\d+$/.test(this.props.settings.minutes) ||
      !/^(\d*\.)?\d+$/.test(this.props.settings.seconds)
    ) {
      alert('Invalid input. Assuming time = 1s');
      this.props.settings.hours = 0;
      this.props.settings.minutes = 0;
      this.props.settings.seconds = 1;
      this.setState({
        time: 1,
        timeLeft: 1,
      });
    } else {
      this.setState({
        time: this.getTimeInSeconds(),
        timeLeft: this.getTimeInSeconds(),
      });
    }
  }

  componentDidUpdate() {
    if (this.state.timeLeft <= 0.01) {
      this.props.onComplete();
      this.resetTime();
    }
  }

  resetTime() {
    this.setState({
      timeLeft: this.state.time,
    });
    clearInterval(this.interval);
    this.interval = null;
  }

  handleStartTimer() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      this.setState((currentState) => {
        return {
          timeLeft: currentState.timeLeft - 0.1,
        };
      });
    }, 100);
  }

  handleStopTimer() {
    this.resetTime();
  }

  getTimeInSeconds() {
    return (
      +this.props.settings.seconds +
      60 * this.props.settings.minutes +
      3600 * this.props.settings.hours
    );
  }

  render() {
    return (
      <div>
        <span>
          {this.props.children(
            this.props.settings.hours,
            this.props.settings.minutes,
            this.props.settings.seconds
          )}
        </span>
        <hr />
        <span>{this.state.timeLeft.toFixed(1)}</span>
        <button onClick={() => this.handleStartTimer()}>Start</button>
        <button onClick={() => this.handleStopTimer()}>Stop</button>
      </div>
    );
  }
}
