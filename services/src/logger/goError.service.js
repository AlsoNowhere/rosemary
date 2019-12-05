
import { loggerService } from "./logger.service";

export const goError = (location,error) => {
    loggerService.error(location,error);
    throw new Error(location + " " + error);
}
