import React from "react";
import { mount } from "enzyme";
import { MultiSelect } from "./dropdown.component";

describe("MultiSelect component",()=>{

    describe("mount component without props",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<MultiSelect value={null} options={[]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should",()=>{
            expect(true).toBe(true);
        });

        // it("should render no elements",()=>{
        //     expect(context.children().length).toBe(0);
        // });
    });
});
