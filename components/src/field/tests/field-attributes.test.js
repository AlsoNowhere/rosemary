import React from "react";
import { mount } from "enzyme";
import { Field } from "../field.component";

describe("Field component - setting the field attributes",()=>{
    describe("make field required",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field required={true} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render a field which is required for completion",()=>{
            expect(context.childAt(0).childAt(1).prop("required")).not.toBe(undefined);
            expect(context.childAt(0).prop("className")).toBe(" required ");
        });
    });

    describe("make field disabled",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field disabled={true} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render a field which is disabled for completion",()=>{
            expect(context.childAt(0).childAt(1).prop("disabled")).not.toBe(undefined);
        });
    });
});
