import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";

const ExampleModel = function(){const m = new modeller.ModelBuilder();m.add("E","string");return m.create();}();

const run = {run(){}};

const footerContent = () => (
    <section className="example">
        <button type="button">One</button>
        <button type="button" onClick={() => run.run()}>Two</button>
    </section>
);

describe("ModallerForm2 component - footercontent",()=>{
    describe("adding customer footer content to the form",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel}
                formValues={new ExampleModel()} footerContent={footerContent} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should output the customer footer content",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("section");
            expect(context.childAt(0).childAt(1).hasClass("example")).toBe(true);
            expect(context.childAt(0).childAt(1).children().length).toBe(2);
        });

        it("should add a second button",()=>{
            expect(context.childAt(0).childAt(1).childAt(1).name()).toBe("button");
            const spy = jest.spyOn(run,"run");
            context.childAt(0).childAt(1).childAt(1).simulate("click");
            expect(spy).toHaveBeenCalled();
        });
    });
});
