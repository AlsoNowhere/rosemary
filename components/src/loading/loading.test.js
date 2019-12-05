import React from "react";
import { mount } from "enzyme";
import { Loading } from "./loading.component";

describe("Loading component",()=>{
    describe("basic render",()=>{
        let component;

        beforeEach(()=>{
            component = mount(<Loading />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an svg tag. The loading icon should be an svg for a better user experience",()=>{
            expect(component.find("*").at(0).childAt(0).name()).toBe("svg");
        });

        it("should add the correct classes. The icon should be a suitable size and spin.",()=>{
            expect(component.find("*").at(0).childAt(0).hasClass("block")).toBe(true);
            expect(component.find("*").at(0).childAt(0).hasClass("width")).toBe(true);
            expect(component.find("*").at(0).childAt(0).hasClass("height")).toBe(true);
            expect(component.find("*").at(0).childAt(0).hasClass("spin")).toBe(true);
        });
    });
});
