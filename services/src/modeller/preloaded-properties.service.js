
import { CustomProperty } from "./custom-property.class";

export const preloaded = {
    email: new CustomProperty(
        (name,model) => model.type(name,"string"),
        (name,model) => model.htmlType(name,"email"),
        (name,model) => model.validator(name,"matchesEmail","Not a valid email address")
    )
}
