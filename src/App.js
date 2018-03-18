import React, { Component } from 'react';
import AddComment from './components/AddComment';
import Waveform from './components/Waveform';
import Timer from './components/Timer';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isPaused: false,
      comments: [],
      time: '',
      isTimeVisible: false
    }

    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onWaveFormMouseEnter = this.onWaveFormMouseEnter.bind(this);
    this.onWaveFormMouseLeave = this.onWaveFormMouseLeave.bind(this);
  }

  // componentDidUpdate() {
  //   console.log(this.state.comments)
  // }

  onCanvasClick() {
    this.setState( () => ({ isPaused: !this.state.isPaused }) );
  }

  onAddComment(comment) {
    const { comments, time } = this.state;
    const newComments = [ ...comments, `[${time}] ${comment}` ];

    this.setState( () => ({ comments: newComments }) );
  }

  onTimeUpdate(newTime) {
    const { time } = this.state;

    if (newTime !== time) {
      this.setState( () => ({ time: newTime }) );
    }
  }

  onWaveFormMouseEnter() {

    this.setState( () => ({ isTimeVisible: true }) );
  }

  onWaveFormMouseLeave() {
    const { isPaused } = this.state;
    this.setState( () => ({ isTimeVisible: isPaused ? true : false }) );
  }

  render() {
    const { isPaused, time, isTimeVisible } = this.state;

    return (
      <div className="App">
        <AddComment
          onAddComment={ this.onAddComment }
          hidden={ !isPaused }
        />
        <Waveform
          onCanvasClick={ this.onCanvasClick }
          onTimeUpdate={ this.onTimeUpdate }
          onWaveFormMouseEnter={ this.onWaveFormMouseEnter }
          onWaveFormMouseLeave={ this.onWaveFormMouseLeave }
        />
      <Timer time={ time } hidden={ !isTimeVisible } />
      </div>
    );
  }
}

export default App;
