import React from 'react';
import {shallow} from 'enzyme';
import {BillsListView} from './billsListView';

describe('<BillsListView>', () => {
  let wrapper;

  const props = {};

  beforeEach(() => {
    wrapper = shallow(<BillsListView {...props} />);
  });

  it('should render component properly', () => {
    const view = wrapper.find('[testID="bills-root"]');
    expect(view.length).toEqual(1);
  });
});
