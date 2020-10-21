import { useContext } from "react";
import { appContext } from "State";

function useAppContext() {
  return useContext(appContext);
}

export default useAppContext;
