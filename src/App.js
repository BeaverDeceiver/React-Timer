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
          settings={{ hours: 0, minutes: 0, seconds: 0.4 }}
          onComplete={this.onTimerCompleted}
        />
      </div>
    );
  }
}

export default App;
