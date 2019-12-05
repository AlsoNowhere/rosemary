
import { validation } from "../validation";

// export const validationTests_CallingWithNonForm = () => {
	describe("validation",()=>{
		let display;

		beforeEach(()=>{
			document.body.innerHTML = `
				<form name="example-form">
					<div id="display"></div>
				</form>
			`;
			display = document.getElementById("display");
		});

		describe("when trying to run validation on a non form element",()=>{
			const failMessage = "You must pass a form element to instantiate validation";
			it("should throw an error when using an element that is not a form",()=>{
				expect(()=>{
					validation(display);
				}).toThrow(new Error(failMessage));
			});
		});
	});
// }
