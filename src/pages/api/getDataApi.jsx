import Headers from "./Header";
import { ProcessAPI, Const } from "../../../utils/Constant";

// Get Article Data
export const getLatestData = async (body) => {
  const res = await fetch(Const.Link + `api/getData`, new Headers("POST", body));
  return ProcessAPI(res);
};
