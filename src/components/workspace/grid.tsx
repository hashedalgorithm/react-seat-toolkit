import { default as GridLines } from "@mezh-hq/react-gridlines";
import { useSelector } from "react-redux";
import { AnimatedSwitcher } from "../core";

const Grid = () => {
  const grid = useSelector((state: any) => state.editor.grid);
  if (!grid) return null;
  return (
    <AnimatedSwitcher
      show={grid}
      component={<GridLines className="w-full h-full opacity-20" cellWidth={44} strokeWidth={2} />}
      className="absolute top-0 left-0 pointer-events-none"
    />
  );
};
export default Grid;
