
import { validation } from "../validation";
import { findElementByFieldName } from "../../common/find-element-by-field-name";

// export const validationTest_MinLengthValidation = () => {
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

		describe("when field has a minimum length",()=>{
			let isValid;
			const failMessage = "Input one too short";
			const length = 7;
			describe("input is less than minimum length",()=>{
				beforeEach(()=>{
					inputOne.value = "length";
					isValid = validation(form,{
						"example-input-one": validation()
							.minlength(length,failMessage)
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

			describe("input is the same as the minimum length",()=>{
				beforeEach(()=>{
					inputOne.value = "lengthy";
					isValid = validation(form,{
						"example-input-one": validation()
							.minlength(length,failMessage)
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

			describe("input is greater than minimum length",()=>{
				beforeEach(()=>{
					inputOne.value = "lengthsy";
					isValid = validation(form,{
						"example-input-one": validation()
							.minlength(length,failMessage)
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
		});
	});
// }