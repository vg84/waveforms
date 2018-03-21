import { ADD_COMMENT, DELETE_COMMENT } from './actionTypes';

export function addComment( comment ) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function deleteComment( commentIndex ) {
  return {
    type: DELETE_COMMENT,
    commentIndex
  };
}
