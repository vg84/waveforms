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
    // console.log(ev.target.value);
    const comment = ev.target.value;
    this.setState( () => ({ comment }) );
  }

  onCommentSubmit(ev) {
    if (ev.keyCode === ENTER_KEY_CODE) {
      this.props.onAddComment( this.state.comment );
      this.setState( () => ({ comment: '' }) );
    }
  }

  render() {
    const { hidden } = this.props;
    const { comment } = this.state;

    return (
      <input
        type="text"
        value={ comment }
        hidden={ hidden }
        placeholder="Add comment..."
        onChange={ this.onCommentChange }
        onKeyUp={ this.onCommentSubmit }
      />
    )
  }
}

export default AddComment;
