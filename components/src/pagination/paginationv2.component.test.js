import React, { useState } from "react";
import { mount } from "enzyme";
import { Paginationv2 } from "./Paginationv2.component";
import { inheritor } from "services";

describe("Paginationv2 component",()=>{

    describe("mount component without props",()=>{
        let component;

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

        it("should error indicating you need to include an inheritor",()=>{
            expect(()=>{
                component = mount(<Paginationv2 />);
            }).toThrowError(new Error("You must pass an _inheritence prop with an inheritor object from services"));
        });
    });

    describe("mount component with inheritence and no properties",()=>{
        let component;

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

        it("should error indicating you need to provide a current page on the inheritor",()=>{
            expect(()=>{
                component = mount(<Paginationv2 _inheritence={inheritor({})} />);
            }).toThrowError(new Error("You must pass the current page and current page updater on the _inheritence"));
        });
    });

    describe("mount component with inheritence and no results per page property",()=>{
        let component;

        const TestComponent = () => {
            const [currentPage,updateCurrentPage] = useState(1);
            return (
                <Paginationv2 _inheritence={inheritor({
                    currentPage: [currentPage,updateCurrentPage]
                })} />
            );
        }

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

        it("should error indicating you need to put the results per page on the inheritor",()=>{
            expect(()=>{
                component = mount(<TestComponent />);
            }).toThrowError(new Error("You must pass the results per page and results per page updater on the _inheritence"));
        });
    });

    describe("declaring the current page as 0",()=>{
        let component;

        const TestComponent = () => {
            const [currentPage,updateCurrentPage] = useState(0);
            const [resultsPerPage,updateResultsPerPage] = useState(5);
            return (
                <Paginationv2 _inheritence={inheritor({
                    currentPage: [currentPage,updateCurrentPage],
                    resultsPerPage: [resultsPerPage,updateResultsPerPage]
                })} />
            );
        }

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

        it("should error indicating you need to put the results per page on the inheritor",()=>{
            expect(()=>{
                component = mount(<TestComponent />);
            }).toThrowError(new Error("The current page cannot be less than 1"));
        });
    });







    describe("basic render",()=>{
        let component;
        let context;

        const TestComponent = () => {
            const [currentPage,updateCurrentPage] = useState(1);
            const [resultsPerPage,updateResultsPerPage] = useState(5);
            return (
                <Paginationv2 _inheritence={inheritor({
                    currentPage: [currentPage,updateCurrentPage],
                    resultsPerPage: [resultsPerPage,updateResultsPerPage]
                })} />
            );
        };

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should produce a surrounding div wrapper with class 'flex'",()=>{
            expect(context.childAt(0).name()).toBe("div");
            expect(context.childAt(0).hasClass("flex")).toBe(true);
        });

        it("should produce an unordered list element (ul)",()=>{
            expect(context.childAt(0).childAt(0).name()).toBe("ul");
        });

        it("should add just one button which is page 1",()=>{
            expect(context.childAt(0).childAt(0).children().length).toBe(1);
            expect(context.childAt(0).childAt(0).childAt(0).text()).toBe("1");
        });

        it("should make the first page the current page",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).hasClass("grey")).toBe(true);
        });
    });

    describe("when adding total from full list",()=>{
        let component;
        let context;
        const total = 5;

        const TestComponent = () => {
            const [currentPage,updateCurrentPage] = useState(1);
            const [resultsPerPage,updateResultsPerPage] = useState(5);
            return (
                <Paginationv2 total={total} _inheritence={inheritor({
                    currentPage: [currentPage,updateCurrentPage],
                    resultsPerPage: [resultsPerPage,updateResultsPerPage]
                })} />
            );
        };

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should produce one list item which is page 1",()=>{
            expect(context.childAt(0).childAt(0).children().length).toBe(1);
            expect(context.childAt(0).childAt(0).childAt(0).text()).toBe("1");
        });

        it("should make the first page the current page",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).hasClass("grey")).toBe(true);
        });
    });

    describe("when adding total and results per page",()=>{
        let component;
        let context;
        const total = 5;
        const _resultsPerPage = 5;

        const TestComponent = () => {
            const [currentPage,updateCurrentPage] = useState(1);
            const [resultsPerPage,updateResultsPerPage] = useState(_resultsPerPage);
            return (
                <Paginationv2 total={total} _inheritence={inheritor({
                    currentPage: [currentPage,updateCurrentPage],
                    resultsPerPage: [resultsPerPage,updateResultsPerPage]
                })} />
            );
        };

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should produce one list item which is page 1",()=>{
            expect(context.childAt(0).childAt(0).children().length).toBe(1);
            expect(context.childAt(0).childAt(0).childAt(0).text()).toBe("1");
        });

        it("should make the first page the current page",()=>{

            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).hasClass("grey")).toBe(true);
        });
    });

    describe("when adding higher total than results per page",()=>{
        describe("when total is a clear division of the results per page",()=>{
            let component;
            let context;
            const total = 10;
            const _resultsPerPage = 5;

            const TestComponent = () => {
                const [currentPage,updateCurrentPage] = useState(1);
                const [resultsPerPage,updateResultsPerPage] = useState(_resultsPerPage);
                return (
                    <Paginationv2 total={total} _inheritence={inheritor({
                        currentPage: [currentPage,updateCurrentPage],
                        resultsPerPage: [resultsPerPage,updateResultsPerPage]
                    })} />
                );
            };

            beforeEach(()=>{
                component = mount(<TestComponent />);
                context = component.find("*").at(0).childAt(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should produce two list items",()=>{
                expect(context.childAt(0).childAt(0).children().length).toBe(2);
            });

            it("should add page 1 and page 2",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).text()).toBe("1");
                expect(context.childAt(0).childAt(0).childAt(1).text()).toBe("2");
            });
        });

        describe("when total is not a clear division of the results per page",()=>{
            let component;
            let context;
            const total = 12;
            const _resultsPerPage = 5;

            const TestComponent = () => {
                const [currentPage,updateCurrentPage] = useState(1);
                const [resultsPerPage,updateResultsPerPage] = useState(_resultsPerPage);
                return (
                    <Paginationv2 total={total} _inheritence={inheritor({
                        currentPage: [currentPage,updateCurrentPage],
                        resultsPerPage: [resultsPerPage,updateResultsPerPage]
                    })} />
                );
            };

            beforeEach(()=>{
                component = mount(<TestComponent />);
                context = component.find("*").at(0).childAt(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should produce one list item",()=>{
                expect(context.childAt(0).childAt(0).children().length).toBe(3);
            });

            it("should add page 1, page 2 and page 3",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).text()).toBe("1");
                expect(context.childAt(0).childAt(0).childAt(1).text()).toBe("2");
                expect(context.childAt(0).childAt(0).childAt(2).text()).toBe("3");
            });
        });
    });

    describe("when passing a current page",()=>{
        let component;
        let context;
        const total = 10;
        const _resultsPerPage = 5;
        const _currentPage = 2;

        const TestComponent = () => {
            const [currentPage,updateCurrentPage] = useState(_currentPage);
            const [resultsPerPage,updateResultsPerPage] = useState(_resultsPerPage);
            return (
                <Paginationv2 total={total} _inheritence={inheritor({
                    currentPage: [currentPage,updateCurrentPage],
                    resultsPerPage: [resultsPerPage,updateResultsPerPage]
                })} />
            );
        };

        beforeEach(()=>{
            component = mount(<TestComponent />);
            context = component.find("*").at(0).childAt(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should make the second page the current page",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).hasClass("grey")).toBe(false);
            expect(context.childAt(0).childAt(0).childAt(1).childAt(0).hasClass("grey")).toBe(true);
        });
    });

    describe("when clicking on a non active page",()=>{
        describe("when not passing an update function on the props",()=>{
            let component;
            let context;
            const total = 10;
            const _resultsPerPage = 5;
            const _currentPage = 1;

            const TestComponent = () => {
                const [currentPage,updateCurrentPage] = useState(_currentPage);
                const [resultsPerPage,updateResultsPerPage] = useState(_resultsPerPage);
                return (
                    <Paginationv2 total={total} _inheritence={inheritor({
                        currentPage: [currentPage,updateCurrentPage],
                        resultsPerPage: [resultsPerPage,updateResultsPerPage]
                    })} />
                );
            };

            beforeEach(()=>{
                component = mount(<TestComponent />);
                context = component.find("*").at(0).childAt(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should make the second page the current page",done=>{
                context.childAt(0).childAt(0).childAt(1).simulate("click");
                setTimeout(()=>{
                    component.update();
                    context = component.find("*").at(0).childAt(0);
                    expect(context.childAt(0).childAt(0).childAt(0).childAt(0).hasClass("grey")).toBe(false);
                    expect(context.childAt(0).childAt(0).childAt(1).childAt(0).hasClass("grey")).toBe(true);
                    done();
                },0);
            });
        });
    });
});
