
import { validation } from "../validation";
import { findElementByFieldName } from "../../common/find-element-by-field-name";

// export const validationTest_MaxValidation = () => {
	describe("validation",()=>{
		let form;
		let inputOne;

		beforeEach(()=>{
			document.body.innerHTML = `
				<form name="example-form">
					<div class="form-control">
						<label>
							<span>Example input</span>
							<input type="number" name="example-input-one" />
							<span></span>
						</label>
					</div>
				</form>
			`;
			form = document.getElementsByTagName("FORM")[0];
			inputOne = findElementByFieldName(form, "example-input-one");
		});

		describe("when number field has a maximum amount",()=>{
			let isValid;
			const failMessage = "Input one too high";
			const value = 7;
			describe("input is greater than maximum",()=>{
				beforeEach(()=>{
					inputOne.value = value + 1;
					isValid = validation(form,{
						"example-input-one": validation()
							.max(value,failMessage)
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

			describe("input is the same as the maximum",()=>{
				beforeEach(()=>{
					inputOne.value = value;
					isValid = validation(form,{
						"example-input-one": validation()
							.min(value,failMessage)
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

			describe("input is less than maximum",()=>{
				beforeEach(()=>{
					inputOne.value = value - 1;
					isValid = validation(form,{
						"example-input-one": validation()
							.max(value,failMessage)
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
