import React, { useState } from "react";
import { mount } from "enzyme";
import { Modal } from "./modal.component";
import { act } from "react-dom/test-utils";

describe("Modal component",()=>{
    describe("basic render",()=>{
        let component;

        beforeEach(()=>{
            component = mount(<Modal />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an article tag. The article tag is more semantic as to what the modal is doing. The styling for the modal only applies to element article.",()=>{
            expect(component.find("*").at(0).childAt(0).name()).toBe("article");
        });

        it("should render with class'modal'. The css only applies to an article with a class of modal.",()=>{
            expect(component.find("*").at(0).childAt(0).prop("className").includes("modal")).toBe(true);
        });
    });

    describe("adding new classes",()=>{
        let component;
        const extraClasses = ["full"];

        beforeEach(()=>{
            component = mount(<Modal className={extraClasses.join(" ")} />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add extras classes to article element",()=>{
            extraClasses.forEach(x=>{
                expect(component.find("*").at(0).childAt(0).prop("className").includes(x)).toBe(true);
            });
        });
    });

    describe("making the modal full screen",()=>{
        describe("passing true",()=>{
            let component;
            let context;
    
            beforeEach(()=>{
                component = mount(<Modal full={true} />);
                context = component.find("*").at(0);
            });
    
            afterEach(()=>{
                component.unmount();
            });
    
            it("should add the class full.",()=>{
                expect(context.childAt(0).hasClass("full")).toBe(true);
            });
        });

        describe("passing false",()=>{
            let component;
            let context;
    
            beforeEach(()=>{
                component = mount(<Modal full={false} />);
                context = component.find("*").at(0);
            });
    
            afterEach(()=>{
                component.unmount();
            });
    
            it("should add the class full.",()=>{
                expect(context.childAt(0).hasClass("full")).toBe(false);
            });
        });

        describe("passing a string",()=>{
            let component;
            let context;
    
            beforeEach(()=>{
                component = mount(<Modal full={"full"} />);
                context = component.find("*").at(0);
            });
    
            afterEach(()=>{
                component.unmount();
            });
    
            it("should add the class full.",()=>{
                expect(context.childAt(0).hasClass("full")).toBe(false);
            });
        });
    });

    describe("adding a label",()=>{
        let component;
        let context;
        const label = "Example";

        beforeEach(()=>{
            component = mount(<Modal label={label} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the label",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).text()).toBe(label);
        });
    });

    describe("opening and closing the Modal",()=>{
        let component;
        let context;

        const TestModal = () => {

            const [modalState,updateModalState] = useState("");

            return (
                <>
                    <button type="button" onClick={() => updateModalState("open")}></button>
                    <Modal state={modalState} update={updateModalState} />
                </>
            );
        }

        beforeEach(done=>{
            component = mount(<TestModal />);
            context = component.find("*").at(0);
            context.childAt(0).simulate("click");
            setTimeout(()=>{
                component.update();
                context = component.find("*").at(0);
                done();
            },300);
        });

        afterEach(()=>{
            component.unmount();
        });

        describe("opening modal",()=>{
            it("should start opening modal",()=>{
                expect(context.childAt(1).childAt(0).hasClass("visible")).toBe(true);
                expect(context.childAt(1).childAt(0).hasClass("closing")).toBe(false);
            });
        });

        describe("closing modal",()=>{
            beforeEach(done=>{
                context.childAt(1).childAt(0).childAt(0).childAt(0).childAt(1).simulate("click");
                setTimeout(()=>{
                    component.update();
                    context = component.find("*").at(0);
                    done();
                },0);
            });

            it("should start closing modal",()=>{
                expect(context.childAt(1).childAt(0).hasClass("visible")).toBe(true);
                expect(context.childAt(1).childAt(0).hasClass("closing")).toBe(true);
            });

            // describe("close modal",()=>{
            //     beforeEach(done=>{
            //         setTimeout(()=>{
            //             component.update();
            //             context = component.find("*").at(0);
            //             done();
            //         },300);
            //     });
    
            //     it("should close modal",()=>{
            //         expect(context.childAt(1).childAt(0).hasClass("visible")).toBe(false);
            //         expect(context.childAt(1).childAt(0).hasClass("closing")).toBe(false);
            //     });
            // });
        });
    });

    describe("adding innner content",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Modal>
                <address></address>
            </Modal>);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the HTML tag inside the Model, after the header",()=>{
            expect(context.childAt(0).childAt(0).childAt(1).name()).toBe("address");
        });
    });
});
