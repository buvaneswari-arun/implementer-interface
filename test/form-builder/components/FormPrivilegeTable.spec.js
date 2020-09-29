import sinon from 'sinon';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { httpInterceptor } from 'common/utils/httpInterceptor';
import FormPrivilegeTable from '../../../src/form-builder/components/FormPrivilegeTable.jsx';
import { mount } from 'enzyme';

chai.use(chaiEnzyme());

describe('FormPrivilegeTable', () => {
    const formData = { resources: {} };

    const defaultProps = {
        formUuid: 'form_uuid'
    };

    const privilegeResults = {
        results: [{ display: 1, uuid: 'form_uuid' }]
    };

    let mockHttp;

    beforeEach(() => {
        mockHttp = sinon.stub(httpInterceptor);
        mockHttp.get.withArgs('/openmrs/ws/rest/v1/form/form_uuid?v=custom:(id,uuid,name,version,published,auditInfo,resources:(value,dataType,uuid))')
            .returns(Promise.resolve(formData));
        mockHttp.get.withArgs('/openmrs/ws/rest/v1/privilege?=')
            .returns(Promise.resolve(privilegeResults));
    });

    afterEach(() => {
        mockHttp.get.restore();
        mockHttp.post.restore();
    });

    it('should call saveFormPrivilege', () => {
        const wrapper = mount(<FormPrivilegeTable {...defaultProps} />);
        mockHttp.post.withArgs('/openmrs/ws/rest/v1/bahmniie/form/saveFormPrivileges')
            .returns(Promise.resolve({}));

        wrapper.instance()._saveFormPrivileges();
        sinon.assert.callOrder(
            mockHttp.post.withArgs('/openmrs/ws/rest/v1/bahmniie/form/saveFormPrivileges'));
        sinon.assert.calledOnce(mockHttp.post.withArgs('/openmrs/ws/rest/v1/bahmniie/form/saveFormPrivileges'));
    })
})
