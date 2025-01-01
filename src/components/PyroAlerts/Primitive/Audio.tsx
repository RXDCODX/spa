import { useRef } from "react";

import { BigTextBlockForAudio, MediaDto } from "../..";

interface Props {
  callback: () => any;
  mediaInfo: MediaDto;
}

export function Audio({ mediaInfo, callback }: Props) {
  const { fileInfo, id: Id } = mediaInfo.mediaInfo;

  const audioRef = useRef<HTMLAudioElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ width: "100%" }}>
      <BigTextBlockForAudio mediaInfo={mediaInfo} />
      <audio
        id={Id}
        key={Id}
        ref={audioRef}
        controls={false}
        onEnded={() => {
          setTimeout(() => {
            callback();
          }, 1000);
        }}
        onLoadedMetadata={() => {
          audioRef.current?.play();
        }}
      >
        <source src={fileInfo.localFilePath} />
      </audio>
    </div>
  );
}
