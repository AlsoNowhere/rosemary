
import { toastService } from "./toast.service";

// export const toastTests = () => {
	describe("toast service",()=>{
		const body = document.body;
		const message = "Example";

		beforeEach(()=>{
			body.innerHTML = ``;
		});

		afterEach(()=>{
			body.innerHTML = ``;
		});

		describe("when adding a basic toast",()=>{
			beforeEach(()=>{
				toastService.popToast(message);
			});

			it("should create and add a toast rack to the page",()=>{
				const rack = body.children[0];
				expect(body.children.length).toBe(1);
				expect(rack.nodeName).toBe("DIV");
				expect(rack.classList.contains("toasty-rack")).toBe(true);
			});

			it("should create and add a toast to the rack",()=>{
				const rack = body.children[0];
				const toast = body.children[0].children[0];
				expect(rack.children.length).toBe(1);
				expect(toast.nodeName).toBe("DIV");
				expect(toast.classList.contains("toasty")).toBe(true);
			});

			it("should make the added toast be standard",()=>{
				const toast = body.children[0].children[0];
				expect(toast.classList.contains("standard")).toBe(true);
			});

			it("should add the correct message to the toast",()=>{
				const toastMessageElement = body.children[0].children[0].children[0];
				expect(toastMessageElement.nodeName).toBe("P");
				expect(toastMessageElement.innerText).toBe(message);
			});

			it("should add a button for closing the toast",()=>{
				const toastButtonContainerElement = body.children[0].children[0].children[1];
				const toastButtonElement = body.children[0].children[0].children[1].children[0];
				expect(toastButtonContainerElement.nodeName).toBe("DIV");
				expect(toastButtonElement.nodeName).toBe("BUTTON");
			});

			describe("clicking the toast button",()=>{
				let toastButtonElement;
				beforeEach(()=>{
					toastButtonElement = body.children[0].children[0].children[1].children[0];
					toastButtonElement.click();
				});

				it("should remove the toast and rack when finished",done=>{
					const rack = body.children[0];
					setTimeout(()=>{
						expect(body.children.length).toBe(0);
						expect(rack.children.length).toBe(0);
						done();
					},300);
				});
			});
		});

		describe("when adding a success toast",()=>{
			beforeEach(()=>{
				toastService.popToast(4, message);
			});

			it("should make the added toast be standard",()=>{
				const toast = body.children[0].children[0];
				expect(toast.classList.contains("success")).toBe(true);
			});
		});

		describe("when adding a warning toast",()=>{
			beforeEach(()=>{
				toastService.popToast(3, message);
			});

			it("should make the added toast be standard",()=>{
				const toast = body.children[0].children[0];
				expect(toast.classList.contains("warning")).toBe(true);
			});
		});

		describe("when adding a danger toast",()=>{
			beforeEach(()=>{
				toastService.popToast(2, message);
			});

			it("should make the added toast be standard",()=>{
				const toast = body.children[0].children[0];
				expect(toast.classList.contains("danger")).toBe(true);
			});
		});

		describe("when adding multiple toasts",()=>{
			beforeEach(()=>{
				toastService.popToast(message);
				toastService.popToast(message);
			});

			it("should add two toasts to the rack",()=>{
				expect(body.children[0].children.length).toBe(2);
			});
		});
	});
// }
