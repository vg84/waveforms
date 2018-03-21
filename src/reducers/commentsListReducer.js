import { ADD_COMMENT, DELETE_COMMENT } from '../actions/actionTypes';

const initialState = [];

function commentsListReducer( state = initialState, action ) {
  switch (action.type) {
    case ADD_COMMENT:
      return [ ...state, action.comment ];
    case DELETE_COMMENT:
      return state.filter( (comment, idx) => idx !== action.commentIndex );
    default:
      return state;
  }
}

export default commentsListReducer;
