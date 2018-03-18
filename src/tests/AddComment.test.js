import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddComment from '../components/AddComment';

Enzyme.configure({ adapter: new Adapter() });

test('renders correctly', () => {
  const addComment = shallow(<AddComment/>);
  expect(addComment.find('.comment-input-wrapper').length).toBe(1);
  expect(addComment.find('.comment-input').length).toBe(1);
});

test('renders hidden when "hidden" property is passed', () => {
  const addComment = shallow(<AddComment hidden/>);
  expect(addComment.find('.comment-input-wrapper').length).toBe(1);
  expect(addComment.find('.comment-input').prop('hidden')).toBe(true);
});
