import { useRef, useState } from "react";

import { getCoordinates, MediaDto, replaceEmotes } from "../..";
import styles from "./Media.module.scss";

interface Props {
  callback: () => any;
  MediaInfo: MediaDto;
}

export function Video({ MediaInfo, callback }: Props) {
  const {
    emotes,
    fileInfo,
    id,
    isWithGenericEmotes,
    positionInfo,
    textInfo,
    metaInfo,
  } = MediaInfo.mediaInfo;

  const isRotate = positionInfo.isRotated;

  const player = useRef<HTMLVideoElement>(null);

  const [cords, setCords] = useState<React.CSSProperties>({});

  return (
    <div
      id={id}
      className={styles.media}
      style={{
        ...cords,
        maxWidth: positionInfo.width + "px",
        maxHeight: positionInfo.height + "px",
        transform: isRotate ? `rotate(${positionInfo.rotation}deg)` : "",
      }}
    >
      <div>
        <span style={{ color: textInfo.textColor }}>
          {isWithGenericEmotes
            ? replaceEmotes(emotes, textInfo.text)
            : textInfo.text}
        </span>
      </div>
      <video
        ref={player}
        src={fileInfo.localFilePath}
        controls={false}
        autoPlay
        onLoadedMetadata={(event) => {
          if (player.current) {
            const newCords = getCoordinates(
              player.current,
              MediaInfo.mediaInfo
            );
            setCords(newCords);
          }

          if (event.currentTarget.duration < metaInfo.duration) {
            if (metaInfo.isLooped) {
              event.currentTarget.loop = true;
              setTimeout(() => {
                player.current?.pause();
                callback();
              }, metaInfo.duration * 1000);
            } else {
              event.currentTarget.onended = () => callback();
            }
          } else {
            event.currentTarget.onended = () => callback();
          }

          event.currentTarget.play();
        }}
      />
    </div>
  );
}
