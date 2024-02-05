import { useMemo } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AnimatedSwitcher } from "../core";
import { Tool } from "../toolbar/data";
import { default as NoControls } from "./no-controls";
import { default as NoSelectedElement } from "./no-selection";
import { default as SelectControls } from "./select";
import { default as ShapeControls } from "./shapes";

const transition = "transition-all duration-500";

const width = "w-[22rem]";

const Controls = () => {
  const open = useSelector((state) => state.editor.showControls);
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const ControlComponent = useMemo(() => {
    if (selectedTool === Tool.Select) {
      if (selectedElementIds.length) {
        return SelectControls;
      }
      return NoSelectedElement;
    }
    if (selectedTool === Tool.Shapes) return ShapeControls;
    return NoControls;
  }, [selectedTool, selectedElementIds]);

  return (
    <>
      <div className={twMerge("pointer-events-none grow-0 shrink-0", transition, open ? width : "w-0")} />
      <div
        className={twMerge(
          "py-5 px-6 h-[calc(100%-32px)] absolute top-0 border-t border-black overflow-y-auto",
          transition,
          width,
          open ? "right-0" : "-right-[22rem]"
        )}
      >
        <AnimatedSwitcher show customKey={ControlComponent.name} component={<ControlComponent />} />
      </div>
    </>
  );
};

export default Controls;
