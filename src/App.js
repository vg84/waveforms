import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddComment from './components/AddComment';
import Waveform from './components/Waveform';
import Timer from './components/Timer';
import CommentsList from './components/CommentsList';

import { addComment, deleteComment } from './actions/commentsActions';

import logoJiminny from './assets/logo-jiminny.png';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isPaused: false,
      time: '',
      isTimeVisible: false
    }

    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onWaveFormMouseEnter = this.onWaveFormMouseEnter.bind(this);
    this.onWaveFormMouseLeave = this.onWaveFormMouseLeave.bind(this);
  }

  onCanvasClick() {
    this.setState( () => ({ isPaused: !this.state.isPaused }) );
  }

  onAddComment(comment) {
    const { time } = this.state;

    const commentWithTime = `[${time}] ${comment}`;
    this.props.addComment(commentWithTime);
    document.querySelector('canvas').click();
  }

  onDeleteComment(commentIndex) {
    this.props.deleteComment(commentIndex);
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
    const { comments } = this.props;
    const { isPaused, time, isTimeVisible } = this.state;

    return (
      <div className="app">
        <img className="logo" src={ logoJiminny } alt="logo" />
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

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch( addComment(comment) ),
    deleteComment: commentIndex => dispatch( deleteComment(commentIndex) )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
