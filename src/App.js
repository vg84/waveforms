import React, { Component } from 'react';
import AddComment from './components/AddComment';
import Waveform from './components/Waveform';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isPaused: false,
      comments: []
    }

    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
  }
  // 
  // componentDidUpdate() {
  //   console.log(this.state.comments)
  // }

  onCanvasClick() {
    this.setState( () => ({ isPaused: !this.state.isPaused }) );
  }

  onAddComment(comment) {
    const { comments } = this.state;
    const newComments = [ ...comments, comment ];

    this.setState( () => ({ comments: newComments }) );
  }

  render() {
    const { isPaused } = this.state;

    return (
      <div className="App">
        <AddComment
          onAddComment={ this.onAddComment }
          hidden={ !isPaused }
        />
        <Waveform
          onCanvasClick={ this.onCanvasClick }
        />
      </div>
    );
  }
}

export default App;
