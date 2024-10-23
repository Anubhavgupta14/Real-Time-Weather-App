import Headers from "./Header";
import { ProcessAPI, Const } from "../../../utils/Constant";

export const getLatestData = async (body) => {
  const res = await fetch(Const.Link + `api/getData`, new Headers("POST", body));
  return ProcessAPI(res);
};

export const fetchFreshData = async () => {
  const res = await fetch(Const.Link + `api/weather`, new Headers("GET"));
  return ProcessAPI(res);
};
