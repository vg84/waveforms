import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from '../components/Timer';

Enzyme.configure({ adapter: new Adapter() });

test('renders time correctly', () => {
  const timer = shallow(<Timer time="00:12" />);

  expect(timer.find('.timer').text()).toEqual('00:12');
});

test('hides the time if "hidden" prop is passed', () => {
  const timer = shallow(<Timer time="00:12" hidden />);

  expect(timer.find('.timer').prop('hidden')).toEqual(true);
});
