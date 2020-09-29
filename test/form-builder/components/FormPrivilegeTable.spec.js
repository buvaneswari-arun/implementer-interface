import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import FormPrivilegeTable from 'form-builder/components/FormPrivilegeTable.jsx';

chai.use(chaiEnzyme());

describe('FormPrivilegeTable', () => {
    it('should remove data from formPrivilege when delete icon is clicked', () => {
        const wrapper = shallow(<FormPrivilegeTable />);
        wrapper.setState({
            formPrivileges: [{
                formId: "1",
                privilegeName: "abcd",
                editable: true,
                viewable: false,
            }, {
                formId: "2",
                privilegeName: "efgh",
                editable: false,
                viewable: true,
            }]
        })
        const instance = wrapper.instance();

        instance.handleRemoveSpecificRow(1);

        expect(wrapper.state('formPrivileges').length).to.eql(1);
        expect(wrapper.state('formPrivileges')[0].privilegeName).to.eql("abcd");
    });
});
