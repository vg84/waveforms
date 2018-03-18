import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CommentsList from '../components/CommentsList';

Enzyme.configure({ adapter: new Adapter() });

const comments = [
  '[00:12] That was good!',
  '[01:45] You should have not said that!'
];

test('renders correctly', () => {
  const wrapper = shallow(<CommentsList comments={comments}/>);
  expect(wrapper.find('h3').length).toBe(1);
  expect(wrapper.find('h3').text()).toBe('Comments');
  expect(wrapper.find('.comments-list-empty').prop('hidden')).toBe(true);
  expect(wrapper.find('.comment').length).toBe(2);
});

test('renders empty state message', () => {
  const wrapper = shallow(<CommentsList comments={[]}/>);
  expect(wrapper.find('.comments-list-empty').prop('hidden')).toBe(false);
  expect(wrapper.find('.comment')).toHaveLength(0);
});
