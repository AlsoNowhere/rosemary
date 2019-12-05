
import { validation } from "../validation";
import { findElementByFieldName } from "../../common/find-element-by-field-name";

// export const validationTest_Required = () => {
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

		describe("make field required",()=>{
			let isValid;
			const failMessage = "Example input is required";

			describe("when input is empty",()=>{
				beforeEach(()=>{
					inputOne.value = "";
					isValid = validation(form,{
						"example-input-one": validation()
							.required(failMessage)
					});
				});

				it("should make form invalid",()=>{
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

			describe("when input has any content",()=>{
				beforeEach(()=>{
					inputOne.value = "content";
					isValid = validation(form,{
						"example-input-one": validation()
							.required(failMessage)
					});
				});

				it("should make form valid",()=>{
					expect(isValid).toBe(true);
				});

				it("should give no message to next element",done=>{
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
