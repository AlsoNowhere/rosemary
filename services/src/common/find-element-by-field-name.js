
export const findElementByFieldName = (form,name) => [...form.getElementsByTagName("*")].filter(x=>x.attributes.name &&  x.attributes.name.nodeValue===name)[0];
