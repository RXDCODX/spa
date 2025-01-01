// eslint-disable-next-line no-restricted-imports
import * as React from "react";

interface RainbowTextProps {
  text: string;
  colors?: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const RainbowText: React.FC<RainbowTextProps>;

declare module "react-rainbow-text" {
  export { RainbowText };
}
