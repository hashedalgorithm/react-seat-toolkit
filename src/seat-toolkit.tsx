import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Provider } from "react-redux";
import Core from "./components";
import store from "./store";
import { ISTKProps } from "./types";

export const SeatToolkit = (props: ISTKProps) => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Core {...props} />
      </TooltipProvider>
    </Provider>
  );
};

export default SeatToolkit;
