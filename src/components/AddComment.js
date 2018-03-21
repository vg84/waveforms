import React, { Component } from 'react';

import { ENTER_KEY_CODE } from '../utils/constants';

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    }

    this.onCommentChange = this.onCommentChange.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
  }

  onCommentChange(ev) {
    const comment = ev.target.value;
    this.setState( () => ({ comment }) );
  }

  onCommentSubmit(ev) {
    const { comment } = this.state;

    if (ev.keyCode === ENTER_KEY_CODE && comment.trim().length > 0) {
      this.props.onAddComment( comment );
      this.setState( () => ({ comment: '' }) );
    }
  }

  render() {
    const { hidden } = this.props;
    const { comment } = this.state;

    return (
      <div className="comment-input-wrapper">
        <input
          className="comment-input"
          type="text"
          value={ comment }
          hidden={ hidden }
          placeholder="Add comment..."
          onChange={ this.onCommentChange }
          onKeyUp={ this.onCommentSubmit }
        />
      </div>
    );
  }
}

export default AddComment;
