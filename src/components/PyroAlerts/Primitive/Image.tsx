import { CSSProperties, useEffect, useRef, useState } from "react";

import { getRandomRotation } from "../../../shared/Utils";
import { getCoordinates, MediaDto } from "../..";
import styles from "./Media.module.scss";

interface Props {
  callBack: () => void;
  mediaInfo: MediaDto;
}

export function Image({ mediaInfo: MediaInfo, callBack }: Props) {
  const mediaInfo = MediaInfo.mediaInfo;
  const fileInfo = mediaInfo.fileInfo;
  const id = mediaInfo.id;
  const metaInfo = mediaInfo.metaInfo;
  const textInfo = mediaInfo.textInfo;
  const positionInfo = mediaInfo.positionInfo;

  useEffect(() => {
    setTimeout(() => callBack(), metaInfo.duration * 1000);
  }, [callBack]);

  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<CSSProperties>({
    maxWidth: positionInfo.width + "px",
    maxHeight: positionInfo.height + "px",
  });

  return (
    <div ref={ref} className={styles["imageContainer"]}>
      {positionInfo.isProportion ? (
        <img
          id={id}
          src={fileInfo.localFilePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={style}
          onLoad={(event) => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            const rotation = getRandomRotation(mediaInfo);
            const size = { ...style };
            setStyle({ ...cords, ...rotation, ...size });
          }}
        />
      ) : (
        <img
          id={id}
          src={fileInfo.localFilePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={style}
          onLoad={(event) => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            const rotation = getRandomRotation(mediaInfo);
            const size = { ...style };
            setStyle({ ...cords, ...rotation, ...size });
          }}
        />
      )}
      {textInfo.text !== "" && <div>{textInfo.text}</div>}
    </div>
  );
}