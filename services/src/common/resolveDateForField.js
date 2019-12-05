
const resolveLeadingZeroes = input => {
    if ((typeof input === "string" && input.length === 1) || (typeof input === "number" && input < 10)) {
        return "0" + input;
    }
    return "" + input;
}

const formats = {
    asDate: {
        "yyyy-mm-dd"(date){
            const split = date.split("-");
            const day = resolveLeadingZeroes(parseInt(split[2]));
            const month = resolveLeadingZeroes(parseInt(split[1]));
            const year = split[0];
            return new Date(`${year}-${month}-${day}T00:00:00Z`);
        }
    },
    asString: {
        "yyyy-mm-dd": (day,month,year) => `${year}-${resolveLeadingZeroes(month+1)}-${resolveLeadingZeroes(day)}`,
        "dd/mm/yyyy":(day,month,year) => `${resolveLeadingZeroes(day)}/${resolveLeadingZeroes(month+1)}/${year}`
    }
};

const resolveDateAsString = (date = new Date(),format = "yyyy-mm-dd") => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    return formats.asString[format](day,month,year,hour,mins,secs);
}

const resolveStringAsDate = (date,format = "yyyy-mm-dd") => formats.asDate[format](date);

export const resolveDateForField = date => resolveDateAsString(date);

export const resolveDateForTable = date => resolveDateAsString(resolveStringAsDate(date),"dd/mm/yyyy");
