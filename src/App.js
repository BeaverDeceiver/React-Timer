import React, { Component } from 'react';
import Timer from './components/Timer';
class App extends Component {
  constructor(props) {
    super(props);

    this.onTimerCompleted = this.onTimerCompleted.bind(this);
  }

  onTimerCompleted() {
    alert('done');
  }

  render() {
    return (
      <div>
        <Timer
          id="timer-1"
          settings={{ hours: 0, minutes: 0, seconds: 2.4 }}
          onComplete={this.onTimerCompleted}
        >
          {(hours, minutes, seconds) => <span>{seconds}</span>}
        </Timer>
      </div>
    );
  }
}

export default App;
