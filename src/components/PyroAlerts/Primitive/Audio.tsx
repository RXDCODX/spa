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
    <div ref={divRef}>
      <BigTextBlockForAudio
        MediaInfo={mediaInfo.mediaInfo}
        UploadStartTime={mediaInfo.uploadStartTime}
      />
      <audio
        id={Id}
        key={Id}
        ref={audioRef}
        controls={false}
        onEnded={() => callback()}
        onLoadedMetadata={() => {
          audioRef.current?.play();
        }}
      >
        <source src={fileInfo.localFilePath} />
      </audio>
    </div>
  );
}
