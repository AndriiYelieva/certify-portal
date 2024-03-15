import { format } from "date-fns";

export const formattedDate = (time: Date) => format(time, 'yyyy-MM-dd');
