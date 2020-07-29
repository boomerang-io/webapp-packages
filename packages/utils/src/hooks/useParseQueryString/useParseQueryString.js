import { useLocation } from "react-router-dom";
import queryString from "query-string";

const defaultOps = { arrayFormat: "comma", skipEmptyString: true };

export default function useQueryString(opts = defaultOps) {
  return queryString.parse(useLocation().search, opts);
}
