import { BigTextBlockForVoice, MediaDto } from "../..";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
}

export function Voice({ mediaInfo, callback }: Props) {
  return (
    <>
      <BigTextBlockForVoice mediaInfo={mediaInfo} />
      <audio
        controls={false}
        onEnded={() => callback()}
        src={mediaInfo.mediaInfo.fileInfo.localFilePath}
        autoPlay
      />
    </>
  );
}
