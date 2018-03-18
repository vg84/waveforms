import React, { Component } from 'react';
import AddComment from './components/AddComment';
import Waveform from './components/Waveform';
import Timer from './components/Timer';
import CommentsList from './components/CommentsList';

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

    this.getCommentsLocalStorage = this.getCommentsLocalStorage.bind(this);
    this.saveCommentsLocalStorage = this.saveCommentsLocalStorage.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onWaveFormMouseEnter = this.onWaveFormMouseEnter.bind(this);
    this.onWaveFormMouseLeave = this.onWaveFormMouseLeave.bind(this);
  }

  componentDidMount() {
    this.getCommentsLocalStorage();
  }

  getCommentsLocalStorage() {
    const comments = JSON.parse( window.localStorage.getItem('comments') );

    if (!comments) {
      this.saveCommentsLocalStorage( [] )
    }

    this.setState( () => ({ comments: comments ? comments : [] }) );
  }

  saveCommentsLocalStorage(comments) {
    const stringifiedComments = JSON.stringify(comments);
    window.localStorage.setItem('comments', stringifiedComments);
  }

  onCanvasClick() {
    this.setState( () => ({ isPaused: !this.state.isPaused }) );
  }

  onAddComment(comment) {
    const { comments, time } = this.state;
    const newComments = [ ...comments, `[${time}]     ${comment}` ];

    this.saveCommentsLocalStorage(newComments);
    this.setState( () => ({ comments: newComments }) );
  }

  onDeleteComment(idx) {
    const { comments } = this.state;
    const filteredComments = comments.filter( (comment, i) => {
      return i !== idx;
    });

    this.setState( () => ({ comments:filteredComments }) );
    this.saveCommentsLocalStorage(filteredComments);
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
    const { isPaused, time, isTimeVisible, comments } = this.state;

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
        <CommentsList
          comments={comments}
          onDeleteComment={this.onDeleteComment}
        />
      </div>
    );
  }
}

export default App;
