import { useRef, useState } from "react";
import { Textfit } from "react-textfit";

import { KeyWordText } from "../../../shared/components/KeyWordText";
import { getRandomRotation } from "../../../shared/Utils";
import { getCoordinates, MediaDto, replaceEmotes } from "../..";
import styles from "./Media.module.scss";

interface Props {
  callback: () => any;
  MediaInfo: MediaDto;
}

/**
 * Component for rendering a video with a text overlay.
 *
 * @param {Object} props Component props.
 * @param {MediaDto} props.MediaInfo Media info for the video.
 * @param {function} props.callback Callback function to be called when the video finishes playing.
 *
 * @returns {ReactElement} The rendered video component.
 */
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

  const player = useRef<HTMLVideoElement>(null);

  const [baseStyles, setBaseStyles] = useState<React.CSSProperties>(
    positionInfo.isProportion
      ? {
          maxWidth: positionInfo.width + "px",
          maxHeight: positionInfo.height + "px",
        }
      : {
          width: positionInfo.width + "px",
          height: positionInfo.height + "px",
        }
  );

  return (
    <div id={id} className={styles.media} style={baseStyles}>
      <div>
        <video
          ref={player}
          src={fileInfo.localFilePath}
          controls={false}
          autoPlay
          style={baseStyles}
          onLoadedMetadata={(event) => {
            if (player.current) {
              const newCords = getCoordinates(MediaInfo.mediaInfo);
              const bazestyles = { ...baseStyles };
              setBaseStyles({
                ...bazestyles,
                ...newCords,
                ...getRandomRotation(MediaInfo.mediaInfo),
              });
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
      <Textfit
        forceSingleModeWidth
        mode="single"
        min={30}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <KeyWordText
          keyWordColor={textInfo.keyWordsColor}
          classNameForKeyWordedSpan={styles.key_word}
          keySymbol="#"
          isQuouted
          keyWordedString={
            (isWithGenericEmotes
              ? replaceEmotes(emotes, textInfo.text)
              : textInfo.text) || ""
          }
        />
      </Textfit>
    </div>
  );
}
