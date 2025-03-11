import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const getLastPathSegment = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  return segments.length > 0 ? capitalizeFirstLetter(segments[0]) : "Home";
};
