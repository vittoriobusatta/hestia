import { format, parse } from "date-fns";

export const gql = String.raw;

function formatDate(dateString: string) {
  const date = parse(dateString, "dd-MM-yyyy", new Date());
  return format(date, "dd MMM yyyy");
}

export function formatResumeDate(startDate: string, endDate: string) {
  const endDateFormatted = formatDate(endDate);
  const startDateMonth = format(
    parse(startDate, "dd-MM-yyyy", new Date()),
    "MMMM"
  );
  const endDateMonth = format(parse(endDate, "dd-MM-yyyy", new Date()), "MMMM");

  if (startDateMonth === endDateMonth) {
    return `${format(
      parse(startDate, "dd-MM-yyyy", new Date()),
      "dd"
    )} - ${endDateFormatted}`;
  } else {
    return `${format(
      parse(startDate, "dd-MM-yyyy", new Date()),
      "dd MMM"
    )} - ${endDateFormatted}`;
  }
}

export const getFormattedDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
};

export const parseFormattedDate = (dateString: string | undefined): Date => {
  const dateParts = dateString?.split("-");
  if (dateParts?.length !== 3) {
    throw new Error("Invalid date format. Expected format: dd-MM-yyyy");
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const year = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error("Invalid date format. Expected format: dd-MM-yyyy");
  }

  return new Date(year, month, day);
};
