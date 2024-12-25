import { CSSProperties, useEffect, useRef, useState } from "react";

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

  const isRotate = positionInfo.isRotated;

  useEffect(() => {
    setTimeout(() => callBack(), metaInfo.duration * 1000);
  }, [callBack]);

  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<CSSProperties>({
    maxWidth: positionInfo.width + "px",
    maxHeight: positionInfo.height + "px",
    transform: isRotate ? `rotate(${positionInfo.rotation}deg)` : "",
  });

  return (
    <div ref={ref} className={styles["image-container"]} style={style}>
      {positionInfo.isProportion ? (
        <img
          id={id}
          src={fileInfo.localFilePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={style}
          onLoadedMetadata={(event) => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            setStyle({ ...styles, ...cords });
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
          onLoadedMetadata={(event) => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            setStyle({ ...styles, ...cords });
          }}
        />
      )}
      {textInfo.text !== "" && <div>{textInfo.text}</div>}
    </div>
  );
}
