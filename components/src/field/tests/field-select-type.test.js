import React from "react";
import { mount } from "enzyme";
import { Field } from "../field.component";

describe("Field component - select type",()=>{
    describe("add options to select field",()=>{
        let component;
        let context;
        const options = [{name:"One",value:1}];

        beforeEach(()=>{
            component = mount(<Field type="select" options={options} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the options to the select",()=>{
            expect(context.childAt(0).childAt(1).children().length).toBe(options.length);
        });
    });

    describe("add props to option in select field",()=>{
        let component;
        let context;
        const options = [{name:"One",value:1}];

        beforeEach(()=>{
            component = mount(<Field type="select" options={options} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the options to the select",()=>{
            expect(context.childAt(0).childAt(1).childAt(0).name()).toBe("option");
            expect(context.childAt(0).childAt(1).childAt(0).prop("value")).toBe(options[0].value);
            expect(context.childAt(0).childAt(1).childAt(0).text()).toBe(options[0].name);
        });
    });
});
