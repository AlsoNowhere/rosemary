import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { DropdownItem } from "./dropdownitem.class";
import { Dropdown } from "./dropdown.component";

import { loggerService } from "services";

describe("Dropdown component",()=>{

    describe("mount component without props",()=>{
        beforeEach(()=>{
            jest.spyOn(console, "error");
            console.error.mockImplementation(() => {});
            jest.spyOn(console, "log");
            console.log.mockImplementation(() => {});
        });

        afterEach(()=>{
            console.error.mockRestore();
            console.log.mockRestore();
        });

        it("should throw an error about having no set value",()=>{
            expect(() => {
                component = mount(<Dropdown />);
            }).toThrowError(new Error("AFS-Components - Dropdown component - value prop You must pass an instance of DropdownItem or null as the value for the Dropdown component."));
        });
    });

    describe("mount component without options prop",()=>{
        beforeEach(()=>{
            jest.spyOn(console, "error");
            console.error.mockImplementation(() => {});
            jest.spyOn(console, "log");
            console.log.mockImplementation(() => {});
        });

        afterEach(()=>{
            console.error.mockRestore();
            console.log.mockRestore();
        });

        it("should throw an error about having no set value",()=>{
            expect(() => {
                component = mount(<Dropdown value={null} />);
            }).toThrowError(new Error("AFS-Components - Dropdown component - options prop. You must pass an Array of DropdownItem objects to the options prop."));
        });
    });

    describe("when using a working dropdown",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Dropdown value={null} options={[]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render a wrapper. This allows the component to be styled property by providing a context area reference.",()=>{
            expect(context.childAt(0).name()).toBe("div");
            expect(context.childAt(0).hasClass("dropdown-component")).toBe(true);
        });

        it("should render a span for the field label",()=>{
            expect(context.childAt(0).childAt(0).name()).toBe("span");
        });

        it("should render a button to represent the field",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("button");
        });

        it("should render a span for the current value",()=>{
            expect(context.childAt(0).childAt(1).childAt(0).name()).toBe("span");
        });

        it("should render a caret icon",()=>{
            expect(context.childAt(0).childAt(1).childAt(1).name()).toBe("span");
            expect(context.childAt(0).childAt(1).childAt(1).hasClass("caret")).toBe(true);
        });

        it("should create an input to store the form field value which should not be tabbable",()=>{
            expect(context.childAt(0).childAt(2).name()).toBe("input");
            expect(context.childAt(0).childAt(2).prop("tabIndex")).toBe("-1");
        });

        it("should render a list of two items. A search filter and an option to clear the value.",()=>{
            expect(context.childAt(0).childAt(3).children().length).toBe(2);
        });
    });

    describe("when defining a label",()=>{
        let component;
        let context;
        const label = "Example";

        beforeEach(()=>{
            component = mount(<Dropdown label={label} value={null} options={[]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render the label",()=>{
            expect(context.childAt(0).childAt(0).text()).toBe(label);
        });
    });

    describe("when defining a value",()=>{
        describe("incorrectly",()=>{
            const label = "One";
            const _value = "one";
            const value = {name:label,value:_value};

            beforeEach(()=>{
                jest.spyOn(console, "error");
                console.error.mockImplementation(() => {});
                jest.spyOn(console, "log");
                console.log.mockImplementation(() => {});
            });

            afterEach(()=>{
                console.error.mockRestore();
                console.log.mockRestore();
            });

            it("should throw an error about having the wrong type of value",()=>{
                expect(() => {
                    component = mount(<Dropdown value={value} options={[]} />);
                }).toThrowError(new Error("AFS-Components - Dropdown component - value prop You must pass an instance of DropdownItem or null as the value for the Dropdown component."));
            });
        });

        describe("correctly",()=>{
            let component;
            let context;
            const label = "One";
            const _value = "one";
            const value = new DropdownItem(label,_value);

            beforeEach(()=>{
                component = mount(<Dropdown value={value} options={[]} />);
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should render the value in the button",()=>{
                expect(context.childAt(0).childAt(1).childAt(0).text()).toBe(label);
            });

            it("should store the value in the input field",()=>{
                expect(context.childAt(0).childAt(2).prop("value")).toBe(_value);
            });
        });
    });

    describe("when passing a list of invalid options",()=>{
        let component;
        let context;
        const options = [{name:"One",value:1}];

        beforeEach(()=>{
            component = mount(<Dropdown value={null} options={options} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render a list of two items only. A search filter and an option to clear the value.",()=>{
            expect(context.childAt(0).childAt(3).children().length).toBe(2);
        });
    });

    describe("when passing a list with some invalid options",()=>{
        let component;
        let context;
        const options = [
            {name:"One",value:1},
            new DropdownItem("One",1)
        ];

        afterEach(()=>{
            component.unmount();
        });

        it("should render one extra item",()=>{
            const loggerSpy = jest.spyOn(loggerService,"warn");
            component = mount(<Dropdown value={null} options={options} />);
            context = component.find("*").at(0);
            expect(context.childAt(0).childAt(3).children().length).toBe(2 + 1);
            expect(loggerSpy).toHaveBeenCalledWith("AFS-Components - Dropdown component - options prop","There were 1 options filtered from the list passed to the options Array.");
        });
    });

    describe("when passing a list with valid options",()=>{
        let component;
        let context;
        const options = [
            new DropdownItem("One",1),
            new DropdownItem("Two",2)
        ];

        beforeEach(()=>{
            component = mount(<Dropdown value={null} options={options} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render one extra item",()=>{
            expect(context.childAt(0).childAt(3).children().length).toBe(2 + 2);
        });
    });

    describe("when clicking the button that is the dropdown",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Dropdown value={null} options={[]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add a CSS class to the list so that it can be made visible",done=>{
            expect(context.childAt(0).childAt(3).hasClass("active")).toBe(false);
            context.childAt(0).childAt(1).simulate("click");
            setTimeout(()=>{
                component.update();
                context = component.find("*").at(0);
                expect(context.childAt(0).childAt(3).hasClass("active")).toBe(true);
                done();
            },0);
        });

        it("should remove a CSS class on the list when active so that it can be made invisible",done=>{
            expect(context.childAt(0).childAt(3).hasClass("active")).toBe(false);
            context.childAt(0).childAt(1).simulate("click");
            setTimeout(()=>{
                component.update();
                context = component.find("*").at(0);
                expect(context.childAt(0).childAt(3).hasClass("active")).toBe(true);
                context.childAt(0).childAt(1).simulate("click");
                setTimeout(()=>{
                    component.update();
                    context = component.find("*").at(0);
                    expect(context.childAt(0).childAt(3).hasClass("active")).toBe(false);
                    done();
                },0);
            },0);
        });
    });

    describe("when clicking on an item from the list",()=>{
        let component;
        let context;
        const options = [new DropdownItem("One",1)];
        const TestComponent = () => {
            const [value,updateValue] = useState(null);
            return (<Dropdown value={value} options={options} onChange={_value => updateValue(_value)} />);
        }

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should change the button value and input value",()=>{
            context.childAt(0).childAt(3).childAt(2).simulate("click");
            component.update();
            context = component.find("*").at(0).childAt(0);
            expect(context.childAt(0).childAt(1).text()).toBe(options[0].name);
            expect(context.childAt(0).childAt(2).prop("value")).toBe(options[0].value);
        });
    });

    describe("when clicking on the item to clear the value ( - none - )",()=>{
        let component;
        let context;
        const item = new DropdownItem("One",1);
        const TestComponent = () => {
            const [value,updateValue] = useState(item);
            return (<Dropdown value={value} options={[]} onChange={_value => updateValue(_value)} />);
        }

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should change the button value and input value",done=>{
            expect(context.childAt(0).childAt(1).text()).toBe(item.name);
            expect(context.childAt(0).childAt(2).prop("value")).toBe(item.value);
            context.childAt(0).childAt(3).childAt(1).simulate("click");
            setTimeout(()=>{
                component.update();
                context = component.find("*").at(0).childAt(0);
                expect(context.childAt(0).childAt(1).text()).toBe("");
                expect(context.childAt(0).childAt(2).prop("value")).toBe("");
                done();
            },0);
        });
    });

    describe("when using a search to filter",()=>{
        let component;
        let context;
        const options = [
            new DropdownItem("One",1),
            new DropdownItem("Two",2)
        ];

        beforeEach(()=>{
            component = mount(<Dropdown value={null} options={options} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should change the button value and input value",async (done)=>{
            expect(context.childAt(0).childAt(3).children().length).toBe(4);
            expect(context.childAt(0).childAt(3).childAt(2).childAt(0).text()).toBe(options[0].name);
            context.childAt(0).childAt(3).childAt(0).childAt(0).childAt(0).simulate("change",{target:{value:"w"}});
            await act(async ()=>{
                await new Promise(resolve => {
                    setTimeout(()=>{
                        component.update();
                        context = component.find("*").at(0);
                        expect(context.childAt(0).childAt(3).children().length).toBe(3);
                        expect(context.childAt(0).childAt(3).childAt(2).childAt(0).text()).toBe(options[1].name);
                        resolve();
                    },300);
                });
            });
            done();
        });
    });

    describe("when pressing the down key",()=>{
        let component;
        let context;
        const options = [
            new DropdownItem("One",1),
            new DropdownItem("Two",2)
        ];
        const TestComponent = () => {
            const [value,updateValue] = useState(null);
            return (<Dropdown value={value} options={options} onChange={_value => updateValue(_value)} />);
        }

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should change the value",done=>{
            context.childAt(0).childAt(1).simulate("click");
            context.childAt(0).childAt(1).simulate("focus");
            setTimeout(()=>{
                component.update();
                context = component.find("*").at(0).childAt(0);
                context.childAt(0).childAt(1).simulate("keyup",{which:40});
                setTimeout(()=>{
                    component.update();
                    context = component.find("*").at(0).childAt(0);
                    expect(context.childAt(0).childAt(3).childAt(2).hasClass("active")).toBe(true);
                    done();
                },0);
            },0);
        });
    });

    describe("when pressing the up key",()=>{
        let component;
        let context;
        const options = [
            new DropdownItem("One",1),
            new DropdownItem("Two",2)
        ];
        const TestComponent = () => {
            const [value,updateValue] = useState(null);
            return (<Dropdown value={value} options={options} onChange={_value => updateValue(_value)} />);
        }

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should change the value",done=>{
            context.childAt(0).childAt(1).simulate("click");
            context.childAt(0).childAt(1).simulate("focus");
            setTimeout(()=>{
                component.update();
                context = component.find("*").at(0).childAt(0);
                context.childAt(0).childAt(1).simulate("keyup",{which:38});
                setTimeout(()=>{
                    component.update();
                    context = component.find("*").at(0).childAt(0);
                    expect(context.childAt(0).childAt(3).childAt(3).hasClass("active")).toBe(true);
                    done();
                },0);
            },0);
        });
    });

    describe("when pressing tab after opening the dropdown",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Dropdown value={null} options={[]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        xit("should focus on the search input",(done)=>{
            context.childAt(0).childAt(1).simulate("click");
            component.update();
            context = component.find("*").at(0);
            const input = context.childAt(0).childAt(3).childAt(0).childAt(0).childAt(0).getDOMNode();
            spyOn(input, "focus");
            context.childAt(0).childAt(1).simulate("keyup",{which:9});

            console.log("Getb: ", context.childAt(0).childAt(1).name());

            component.update();
            // context = component.find("*").at(0);

            setTimeout(()=>{
                // console.log("Input: ", input);
                expect(input.focus).toHaveBeenCalled();
                done();
            },0);


            // console.log("Context: ",
                // context.name(),
                // context.childAt(0).childAt(3).childAt(0).childAt(0).childAt(0).name(),
                // context.childAt(0).childAt(3).childAt(0).childAt(0).childAt(0).getDOMNode(),
                // document.activeElement);

            // expect(context.childAt(0).childAt(3).childAt(0).childAt(0).childAt(0) === document.activeElement).toBe(true);
            // expect(context.childAt(0).childAt(3).childAt(0).childAt(0).childAt(0).getDOMNode().focus).toHaveBeenCalled();
        });
    });

    // describe("when passing opti",()=>{
    //     beforeEach(()=>{
    //         jest.spyOn(console, "error");
    //         console.error.mockImplementation(() => {});
    //         jest.spyOn(console, "log");
    //         console.log.mockImplementation(() => {});
    //     });

    //     afterEach(()=>{
    //         console.error.mockRestore();
    //         console.log.mockRestore();
    //     });

    //     it("should throw an error about having no set value",()=>{
    //         expect(() => {
    //             component = mount(<Dropdown />);
    //         }).toThrowError(new Error("AFS-Components - Dropdown component - value prop. You must pass an instance of DropdownItem or null as the value for the Dropdown component."));
    //     });
    // });

    describe("define a placeholder",()=>{
        let component;
        let context;
        const placeholder = "holder";

        beforeEach(()=>{
            component = mount(<Dropdown value={null} placeholder={placeholder} options={[]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add a placeholder to the button element showing a placeholder for the field.",()=>{
            expect(context.childAt(0).name()).toBe("div");
            expect(context.childAt(0).childAt(1).text()).toBe(placeholder);
        });

        it("should add a placeholder class (.text-grey) to the span label in the button element.",()=>{
            expect(context.childAt(0).name()).toBe("div");
            expect(context.childAt(0).childAt(1).childAt(0).hasClass("text-grey")).toBe(true);
        });
    });
});
