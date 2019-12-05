import React from "react";
import { mount } from "enzyme";
import { Field } from "../field.component";

const getDateForInput = date => {
    if (typeof date === "string") {
        date = new Date(`${date}T00:00:00Z`);
    }
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
}

describe("Field component - values",()=>{
    describe("add value to a text field",()=>{
        let component;
        let context;
        const value = "Example";

        beforeEach(()=>{
            component = mount(<Field value={value} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render the field with that value",()=>{
            expect(context.childAt(0).childAt(1).prop("value")).toBe(value);
        });
    });

    describe("add value to a checkbox field",()=>{
        let component;
        let context;
        const value = "Example";

        beforeEach(()=>{
            component = mount(<Field type="checkbox" value={value} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should not change the checked prop",()=>{
            expect(context.childAt(0).childAt(1).prop("checked")).toBe(false);
        });
    });

    describe("add value to a checkbox field",()=>{
        let component;
        let context;
        const value = true;

        beforeEach(()=>{
            component = mount(<Field type="checkbox" value={value} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should not change the checked prop",()=>{
            expect(context.childAt(0).childAt(1).prop("checked")).toBe(false);
        });
    });

    describe("add value to a textarea field",()=>{
        let component;
        let context;
        const value = "Example";

        beforeEach(()=>{
            component = mount(<Field type="textarea" value={value} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render the textarea with that value",()=>{
            expect(context.childAt(0).childAt(1).prop("value")).toBe(value);
        });
    });

    describe("add value to a select field",()=>{
        let component;
        let context;
        const value = "Example";

        beforeEach(()=>{
            component = mount(<Field type="select" value={value} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render the select with that value",()=>{
            expect(context.childAt(0).childAt(1).prop("value")).toBe(value);
        });
    });
    
    // describe("adding values to date fields",()=>{
    //     describe("field with no set value",()=>{
    //         let component;
    //         let context;
    //         const value = getDateForInput(new Date());

    //         beforeEach(()=>{
    //             component = mount(<Field type="date" />);
    //             context = component.find("*").at(0);
    //         });

    //         afterEach(()=>{
    //             component.unmount();
    //         });

    //         it("should render the select with that value",()=>{
    //             expect(context.childAt(0).childAt(1).prop("value")).toBe(value);
    //         });
    //     });

    //     describe("when setting todays date",()=>{
    //         let component;
    //         let context;
    //         const value = getDateForInput(new Date());

    //         beforeEach(()=>{
    //             component = mount(<Field type="date" value={value} />);
    //             context = component.find("*").at(0);
    //         });

    //         afterEach(()=>{
    //             component.unmount();
    //         });

    //         it("should render the select with that value",()=>{
    //             expect(context.childAt(0).childAt(1).prop("value")).toBe(value);
    //         });
    //     });
    // });
});
