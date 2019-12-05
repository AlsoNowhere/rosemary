
import { validation } from "../validation";
import { findElementByFieldName } from "../../common/find-element-by-field-name";

// export const validationTest_CompareValidation = () => {
	describe("validation",()=>{
		let form;
		let inputOne;
		let inputTwo;

		beforeEach(()=>{
			document.body.innerHTML = `
				<form name="example-form">
					<div class="form-control">
						<label>
							<span>Example input</span>
							<input name="example-input-one" />
							<span></span>
						</label>
						<label>
							<span>Example input</span>
							<input name="example-input-two" />
							<span></span>
						</label>
					</div>
				</form>
			`;
			form = document.getElementsByTagName("FORM")[0];
			inputOne = findElementByFieldName(form, "example-input-one");
			inputTwo = findElementByFieldName(form, "example-input-two");
		});

		describe("compare two inputs to be same value",()=>{
			let isValid;
			const failMessage = "Input one and two should be the same";
			describe("when content is different",()=>{
				beforeEach(()=>{
					inputOne.value = "content1";
					inputTwo.value = "content2";
					isValid = validation(form,{
						"example-input-one": validation()
							.same("example-input-two",failMessage)
					});
				});

				it("should make the form invalid",()=>{
					expect(isValid).toBe(false);
				});

				it("should add message to next element",done=>{
					const next = inputOne.nextElementSibling;
					setTimeout(()=>{
						expect(next.innerText).toBe(failMessage);
						done();
					},0);
				});
			});

			describe("when content is the same",()=>{
				beforeEach(()=>{
					inputOne.value = "content1";
					inputTwo.value = "content1";
					isValid = validation(form,{
						"example-input-one": validation()
							.same("example-input-two",failMessage)
					});
				});

				it("should make the form valid",()=>{
					expect(isValid).toBe(true);
				});

				it("should not add message to next element",done=>{
					const next = inputOne.nextElementSibling;
					setTimeout(()=>{
						expect(next.innerText).toBe("");
						done();
					},0);
				});
			});

			describe("when not is used",()=>{
				describe("when content is different",()=>{
					beforeEach(()=>{
						inputOne.value = "content1";
						inputTwo.value = "content2";
						isValid = validation(form,{
							"example-input-one": validation()
								.not.same("example-input-two",failMessage)
						});
					});

					it("should make the form valid",()=>{
						expect(isValid).toBe(true);
					});

					it("should not add message to next element",done=>{
						const next = inputOne.nextElementSibling;
						setTimeout(()=>{
							expect(next.innerText).toBe("");
							done();
						},0);
					});
				});

				describe("when content is the same",()=>{
					beforeEach(()=>{
						inputOne.value = "content1";
						inputTwo.value = "content1";
						isValid = validation(form,{
							"example-input-one": validation()
								.not.same("example-input-two",failMessage)
						});
					});

					it("should make the form invalid",()=>{
						expect(isValid).toBe(false);
					});

					it("should add message to next element",done=>{
						const next = inputOne.nextElementSibling;
						setTimeout(()=>{
							expect(next.innerText).toBe(failMessage);
							done();
						},0);
					});
				});
			});
		});
	});
// }
