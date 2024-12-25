import { BigTextBlockForVoice, MediaDto } from "../..";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
}

export function Voice({ mediaInfo, callback }: Props) {
  const { id } = mediaInfo.mediaInfo;

  return (
    <div id={id}>
      <BigTextBlockForVoice
        MediaInfo={mediaInfo.mediaInfo}
        UploadStartTime={mediaInfo.uploadStartTime}
      />
      <audio
        controls={false}
        onEnded={() => callback()}
        onLoadedMetadata={() => {}}
        src={mediaInfo.mediaInfo.fileInfo.localFilePath}
        autoPlay
      />
    </div>
  );
}
