import React from 'react';

const CommentsList = ({ comments, onDeleteComment }) => {
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
        {
          comments.map( (comment, idx) => {
            const deleteComment = () => onDeleteComment(idx);
            return (
              <li className="comment" key={idx}>
                <div>{ comment }</div>
                <button
                  className="delete-comment"
                  type="button"
                  onClick={deleteComment}
                >
                  x
                </button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default CommentsList;
