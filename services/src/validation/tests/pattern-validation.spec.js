
import { validation } from "../validation";
import { findElementByFieldName } from "../../common/find-element-by-field-name";

// export const validationTest_Pattern = () => {
	describe("validation",()=>{
		let form;
		let inputOne;

		beforeEach(()=>{
			document.body.innerHTML = `
				<form name="example-form">
					<div class="form-control">
						<label>
							<span>Example input</span>
							<input name="example-input-one" />
							<span></span>
						</label>
					</div>
				</form>
			`;
			form = document.getElementsByTagName("FORM")[0];
			inputOne = findElementByFieldName(form, "example-input-one");
		});

		describe("when field has a pattern to be matched",()=>{
			let isValid;
			const failMessage = "Input one does not match pattern";
		// Matching an email pattern
			const pattern = /[a-z]{1}[a-z0-9_.]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z-]+/g;
			describe("input is not an email",()=>{
				beforeEach(()=>{
					inputOne.value = "p.pg.com";
					isValid = validation(form,{
						"example-input-one": validation()
							.matches(pattern,failMessage)
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

			describe("input is a valid email address",()=>{
				beforeEach(()=>{
					inputOne.value = "p.p@g.com";
					isValid = validation(form,{
						"example-input-one": validation()
							.matches(pattern,failMessage)
					});
				});

				it("should make the form valid",()=>{
					expect(isValid).toBe(true);
				});

				it("should not give message to next element",done=>{
					const next = inputOne.nextElementSibling;
					setTimeout(()=>{
						expect(next.innerText).toBe("");
						done();
					},0);
				});
			});

			describe("when not is used",()=>{
				describe("input is not an email",()=>{
					beforeEach(()=>{
						inputOne.value = "p.pg.com";
						isValid = validation(form,{
							"example-input-one": validation()
								.not.matches(pattern,failMessage)
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

				describe("input is a valid email address",()=>{
					beforeEach(()=>{
						inputOne.value = "p.p@g.com";
						isValid = validation(form,{
							"example-input-one": validation()
								.not.matches(pattern,failMessage)
						});
					});

					it("should make the form invalid",()=>{
						expect(isValid).toBe(false);
					});

					it("should give message to next element",done=>{
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
