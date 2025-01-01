import { Shader } from "react-shaders";

import image from "./images/fractal_brownian_motion_noise.png";
import code from "./shader.module.glsl";

export default function FireShader() {
  return <Shader textures={[{ url: image }]} fs={code} />;
}
