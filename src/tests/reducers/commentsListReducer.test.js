import { ADD_COMMENT, DELETE_COMMENT } from '../../actions/actionTypes';
import commentsListReducer from '../../reducers/commentsListReducer';

test('adds a new comment', () => {
  const action = {
    type: ADD_COMMENT,
    comment: 'test comment'
  };

  const expectedResult = ['test comment'];
  const reduced = commentsListReducer( [], action );

  expect(reduced).toEqual(expectedResult);
});

test('deletes a comment based on index', () => {
  const initialState = ['comment 1', 'comment 2', 'comment 3'];
  const action = {
    type: DELETE_COMMENT,
    commentIndex: 1
  };
  const expectedResult = ['comment 1', 'comment 3'];
  const reduced = commentsListReducer(initialState, action);

  expect(reduced).toEqual(expectedResult);
});

test('returns the previous state if unknown action is passed', () => {
  const initialState = ['comment 1', 'comment 2', 'comment 3'];
  const action = {
    type: 'some_unknown_action',
    actionSomething: 42
  };
  const expectedResult = ['comment 1', 'comment 2', 'comment 3'];
  const reduced = commentsListReducer(initialState, action);

  expect(reduced).toEqual(expectedResult);
});
