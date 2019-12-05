
import { modeller } from "./modeller.service";
import { ValidationBuilder } from "../validation/validation";

describe("modeller service",()=>{

    describe("object property values",()=>{

        it("should have Single on the object",()=>{
            expect(modeller.Single instanceof Function).toBe(true);
        });

        it("should have List on the object",()=>{
            expect(modeller.List instanceof Function).toBe(true);
        });

        it("should have ModelBuilder on the object",()=>{
            expect(modeller.ModelBuilder instanceof Function).toBe(true);
        });
    });

    describe("Single constructor function",()=>{
        describe("creating an instance with no arguments",()=>{
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

            it("should throw an error that no context has been provided",()=>{
                expect(() => {
                    single = new modeller.Single();
                }).toThrowError(new Error("You must pass an instance of an object created using modeller.ModelBuilder as the context for a new Single."));
            });
        });

        describe("creating an instance with a passing argument for context",()=>{
            let single;
            const context = new modeller.ModelBuilder().create();

            beforeEach(()=>{
                single = new modeller.Single(context);
            });

            it("should add the context on the prototype",()=>{
                expect(single.hasOwnProperty("context")).toBe(true);
                expect(single.context).toBe(context);
            });
        });
    });

    describe("List constructor function",()=>{
        describe("creating an instance with no arguments",()=>{
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

            it("should throw an error that no context has been provided",()=>{
                expect(() => {
                    list = new modeller.List();
                }).toThrowError(new Error("You must pass an instance of an object created using modeller.ModelBuilder as the context for a new List."));
            });
        });

        describe("creating an instance with a passing argument for context",()=>{
            let list;
            const context = new modeller.ModelBuilder().create();

            beforeEach(()=>{
                list = new modeller.List(context);
            });

            it("should add the context on the prototype",()=>{
                expect(list.hasOwnProperty("context")).toBe(true);
                expect(list.context).toBe(context);
            });
        });
    });

    describe("when building a new model using ModelBuilder",()=>{
        describe("when adding no properties",()=>{
            const model = new (new modeller.ModelBuilder().create())();
    
            it("should be an instance of Modeller",()=>{
                expect(model instanceof modeller.Modeller).toBe(true);
            });
        });

        describe("when adding one property that has one arguments",()=>{
            const model = new (function(){
                const model = new modeller.ModelBuilder();
                model.add();
                return model.create();
            }())();
    
            it("should return an object with no properties",()=>{
                expect(Object.keys(model).length).toBe(0);
            });
        });

        describe("when adding one property",()=>{
            describe("when making it a string",()=>{
                const Model = function(){
                    const model = new modeller.ModelBuilder();
                    model.add("one","string");
                    return model.create();
                }();
                const model = new Model();
        
                it("should return an object with one property",()=>{
                    expect(Object.keys(model).length).toBe(1);
                });
    
                it("should add that property on to the object instance that is the type specified by default",()=>{
                    expect(model.one).toBe("");
                });
            });

            describe("when making it a number",()=>{
                const Model = function(){
                    const model = new modeller.ModelBuilder();
                    model.add("one","number");
                    return model.create();
                }();
                const model = new Model();
    
                it("should add that property on to the object instance that is the type specified by default",()=>{
                    expect(model.one).toBe(0);
                });
            });

            describe("when making it a boolean",()=>{
                const Model = function(){
                    const model = new modeller.ModelBuilder();
                    model.add("one","boolean");
                    return model.create();
                }();
                const model = new Model();
    
                it("should add that property on to the object instance that is the type specified by default",()=>{
                    expect(model.one).toBe(false);
                });
            });

            describe("when making it an instance of Single",()=>{
                const Single = new modeller.ModelBuilder().create();
                const Model = function(){
                    const model = new modeller.ModelBuilder();
                    model.add("one",new modeller.Single(Single));
                    return model.create();
                }();
                const model = new Model();
    
                it("should add that property on to the object instance that is the type specified by default",()=>{
                    expect(model.one instanceof modeller.Single).toBe(true);
                });
            });

            describe("when making it an instance of List",()=>{
                const List = new modeller.ModelBuilder().create();
                const Model = function(){
                    const model = new modeller.ModelBuilder();
                    model.add("one",new modeller.List(List));
                    return model.create();
                }();
                const model = new Model();
    
                it("should add that property on to the object instance that is the type specified by default",()=>{
                    expect(model.one instanceof modeller.List).toBe(true);
                });
            });
        });

        describe("when defining an alias",()=>{
            const alias = "One";
            const Model = function(){
                const model = new modeller.ModelBuilder();
                model.add("one","string");
                model.alias("one",alias);
                return model.create();
            }();
            const model = new Model();
            const aliases = model.getAliases();
    
            it("should add an alias on to the private data which can be looked up and used.",()=>{
                expect(aliases.one).toBe(alias);
            });
        });

        describe("when defining a validation",()=>{
            const Model = function(){
                const model = new modeller.ModelBuilder();
                model.add("one","string");
                model.validator("one","required");
                return model.create();
            }();
            const model = new Model();
            const validators = model.getValidators();
    
            it("should produce a instance of ValidationBuilder.",()=>{
                expect(validators.one instanceof ValidationBuilder).toBe(true);
            });

            it("should add one rule.",()=>{
                expect(validators.one.rules.length).toBe(1);
            });

            it("should add a correct rule.",()=>{
                expect(validators.one.rules[0].type).toBe("required");
                expect(validators.one.rules[0].not).toBe(false);
            });
        });
    });
});
