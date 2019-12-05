
const createEle = name => document.createElement(name.toUpperCase());

const getToastRack = () => [...document.body.children].filter(x=>x.nodeName==="DIV"&&x.classList.contains("toasty-rack"))[0];

const getCurrentToast = currentToast => getToastRack() ? [...getToastRack().children].filter(x=>x===currentToast) : {};

const getNewToast = function(message){
	const toastRack = function(){
		const element = createEle("div");
		element.classList.add("toasty-rack");
		return element;
	}();
	const toastElement = createEle("div");
	const toastMessageElement = createEle("p");
	const toastButtonElement = function(){
		const container = createEle("div");
		const button = createEle("button");
		container.appendChild(button);
		return container;
	}();
	if (getToastRack() === undefined) {
		document.body.appendChild(toastRack);
	}
	toastElement.classList.add("toasty");
	toastMessageElement.innerText = message;
	toastElement.appendChild(toastMessageElement);
	toastElement.appendChild(toastButtonElement);
	const clickToClose = ()=>{
		toastElement.classList.add("closing");
		setTimeout(()=>{
			const toastRack = getToastRack();
			if (getCurrentToast(toastElement).length === 1) {
				toastRack.removeChild(toastElement);
				if (toastRack.children.length === 0) {
					document.body.removeChild(toastRack);
				}
			}
		},300);
	};
	toastElement.addEventListener("click",clickToClose);
	toastButtonElement.addEventListener("click",clickToClose);
	return toastElement;
};

export const toastService = {
	popToast: function(type, message){
		if (typeof type !== "number" && typeof type !== "string" && typeof message !== "string") {
			return;
		}
		const useTypeAsMessage = typeof type === "string" && message === undefined;
		const newToast = getNewToast(useTypeAsMessage ? type : message);
		const toastType = type === 1 || type === "standard" || type === undefined || useTypeAsMessage
			? "standard"
			: type === 2 || type === "danger" || type === "strawberry_jam_toast"
				? "danger"
				: type === 3 || type === "warning" || type === "cheese_toast"
					? "warning"
					: type === 4 || type === "success" || type === "pesto_toast"
						? "success"
						: type === 5 || type === "highlight" || type === "buttered_toast"
							? "highlight"
							: "";
		newToast.classList.add(toastType);
		getToastRack().appendChild(newToast);
		setTimeout(()=>{
			newToast.classList.add("show");
		},0);
		setTimeout(()=>{
			if (getCurrentToast(newToast).length === 0) {
				return;
			}
			newToast.classList.add("closing");
			setTimeout(()=>{
				const toastRack = getToastRack();
				if (getCurrentToast(newToast).length === 1) {
					toastRack.removeChild(newToast);
					if (toastRack.children.length === 0) {
						document.body.removeChild(toastRack);
					}
				}
			},300);
		},3000);
	}
}
