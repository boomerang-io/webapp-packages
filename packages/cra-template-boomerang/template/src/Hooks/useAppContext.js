import { useContext } from "react";
import { appContext } from "State/context";

function useAppContext() {
  return useContext(appContext);
}

export default useAppContext;
