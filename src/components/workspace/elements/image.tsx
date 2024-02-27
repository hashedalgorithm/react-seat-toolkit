import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Image: React.FC<any> = forwardRef(({ x, y, id, href, width, height, ...props }, ref: any) => {
  return (
    <image
      ref={ref}
      id={id}
      x={x}
      y={y}
      href={href}
      width={width}
      height={height}
      {...props}
      className={twMerge(props.className, "resizable fill-transparent object-cover")}
      preserveAspectRatio="none"
    />
  );
});

Image.displayName = "Image";

export default Image;
