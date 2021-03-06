import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
};

const EiffelTowerSvg: FC<Props> = ({ color = "#fff" }) => {
  return (
    <Svg width={"100%"} height={"100%"} viewBox="0 0 18 23" fill="none">
      <Path
        d="M14.022 17.322h.83v-2.3h-1.824a52.396 52.396 0 01-1.087-2.947h.431v-2.3h-1.14c-.37-1.306-.7-2.679-.971-4.105h.203V4.6h.506v-.862h-.513A1.434 1.434 0 009.353 2.48V.324a.324.324 0 00-.647 0V2.48a1.434 1.434 0 00-1.103 1.257h-.514V4.6h.507v1.07h.202c-.271 1.426-.6 2.8-.97 4.105h-1.14v2.3h.43a52.372 52.372 0 01-1.087 2.947H3.207v2.3h.83C2.557 20.536 1.188 22.613.8 23h4.097c.42-3.36 2.812-4.303 4.133-4.384 1.32.081 3.712 1.025 4.132 4.384h4.097c-.387-.387-1.756-2.464-3.237-5.678zm-5.917-5.247h1.85c.224.972.478 1.968.763 2.947H7.34c.286-.979.54-1.975.765-2.947z"
        fill={color}
      />
    </Svg>
  );
};

export default EiffelTowerSvg;
