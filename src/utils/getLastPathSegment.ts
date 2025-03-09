export const getLastPathSegment = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  return segments.length > 0 ? segments[0] : "Home";
};
