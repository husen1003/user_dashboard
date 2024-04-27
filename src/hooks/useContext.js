import { useContext } from "react";
import { AppContext } from "../components/AppContext";

const useAppContext = () => {
  // get the context
  const context = useContext(AppContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useAppContext was used outside of its Provider");
  }

  return context;
};

export default useAppContext;
