import { memo } from "react";
import { RotateCcw } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ids } from "@/constants";
import type { ISTKProps } from "@/types";

const Reloader = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  return (
    <div
      id={ids.reloader}
      className={twMerge(
        "absolute top-5 right-4 pl-7 flex justify-center items-center cursor-pointer border bg-gray-50 hover:bg-gray-100 [&>svg]:hover:-rotate-45 [&>svg]:transition-all [&>svg]:transition-medium rounded-md p-2 transition-all duration-medium",
        props.styles?.reloadButton?.className
      )}
      style={props.styles?.reloadButton?.properties}
    >
      <RotateCcw />
    </div>
  );
};

export default memo(Reloader);