import React from 'react';

const CommentsList = ({ comments, onDeleteComment }) => {

  const deleteComment = element => {
    const commentIndex = element.target.dataset.index;
    onDeleteComment( Number(commentIndex) );
  };

  const renderComment = (comment, idx) => {
    return (
      <li className="comment" key={ idx }>
        <div>{ comment }</div>
        <button
          className="delete-comment"
          type="button"
          onClick={ deleteComment }
          data-index={ idx }
        >
          x
        </button>
      </li>
    );
  }

  return (
    <div className="comments-list-wrapper">
      <h3>Comments</h3>

      <div
        className="comments-list-empty"
        hidden={ comments.length > 0 }
      >
        no comments yet...
      </div>

      <ul className="comments-list">
        { comments.map( renderComment ) }
      </ul>
    </div>
  );
}

export default CommentsList;
