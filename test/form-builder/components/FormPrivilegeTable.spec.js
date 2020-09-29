import React from "react";
import {shallow} from "enzyme";
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import FormPrivilegeTable from "form-builder/components/FormPrivilegeTable.jsx";

chai.use(chaiEnzyme());

describe('FormPrivilegeTable', () => {
    let wrapper;

    const formPrivilegeData = [
        {
            formId:'1',
            privilegeName: "Add Patients",
            editable:false,
            viewable:false,
        },
        {
            formId:'2',
            privilegeName: "Add Allergies",
            editable:true,
            viewable:false,
        },
        {
            formId:'3',
            privilegeName: "Add People",
            editable:true,
            viewable:true,
        }
    ]

    it('should return created request object on passing form privileges',() =>{
        wrapper = shallow(<FormPrivilegeTable/>);
        wrapper.setState(
            {
                formData : {
                    id: 56,
                    uuid: 'form_uuid', 
                    name: 'form_name', 
                    version: '2'
                }
            }
        );

        const responseObject = [
            {
                formId:56,
                privilegeName: "Add Patients",
                editable:false,
                viewable:false,
            },
            {
                formId:56,
                privilegeName: "Add Allergies",
                editable:true,
                viewable:false,
            },
            {
                formId:56,
                privilegeName: "Add People",
                editable:true,
                viewable:true,
            }
        ];
    
        const instance = wrapper.instance();
        expect(instance._createReqObject(formPrivilegeData)).to.eql(responseObject);
    });
});
