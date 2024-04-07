import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, selectors } from "@/constants";
import { IPolyline, ISTKProps, ISeatCategory, ISection } from "@/types";
import { d3Extended, getRelativeWorkspaceClickCoords } from "@/utils";
import { panAndZoomWithTransition } from "../zoom";

export interface IPolylineProps extends IPolyline {
  className?: string;
  consumer: ISTKProps;
  sections?: ISection[];
  categories?: ISeatCategory[];
  onClick: (e: any) => void;
  isSelected?: boolean;
}

const Polyline: React.FC<IPolylineProps> = forwardRef(
  (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { id, points, color, stroke, sections, categories, section, onClick, consumer, isSelected: _, ...props },
    ref: any
  ) => {
    const sectionObject = useMemo(() => sections?.find?.((s) => s.id === section), [sections, section]);

    const localOnClick = (e) => {
      onClick(e);
      if (sectionObject) {
        consumer.events?.onSectionClick?.(sectionObject);
        if (consumer.events?.onFreeSeatClick && sectionObject.freeSeating) {
          const category = categories?.find((c: ISeatCategory) => c.section === sectionObject.id);
          if (category) {
            consumer.events.onFreeSeatClick({
              category: {
                ...category,
                section: sectionObject
              }
            });
          }
        }
        if (!sectionObject.freeSeating) {
          const visibilityOffset = +d3Extended.select(selectors.workspaceGroup).attr(dataAttributes.visibilityOffset);
          if (visibilityOffset > 0) {
            const coords = getRelativeWorkspaceClickCoords(e);
            panAndZoomWithTransition({
              k: visibilityOffset,
              x: coords.x - coords.x * visibilityOffset,
              y: coords.y - coords.y * visibilityOffset
            });
          }
        }
      }
    };

    return (
      <polyline
        ref={ref}
        id={id}
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        onClick={localOnClick}
        {...props}
        style={{
          color: sectionObject?.color ?? color ?? "transparent",
          stroke: sectionObject?.stroke ?? stroke,
          ...consumer.styles?.elements?.shape?.base?.properties
        }}
        {...{ [dataAttributes.section]: section }}
        className={twMerge(props.className, consumer.styles?.elements?.shape?.base?.className)}
      />
    );
  }
);

Polyline.displayName = "Polyline";

export default Polyline;
