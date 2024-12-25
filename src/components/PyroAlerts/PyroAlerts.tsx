import { useEffect, useReducer, useState } from "react";

import { SignalRContext } from "../../app";
import { MediaDto, MediaType } from "..";
import Announce from "../Utils/Announce";
import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";

enum StateStatus {
  add,
  remove,
}

interface State {
  messages: (MediaDto | undefined)[];
  audioQueue: (MediaDto | undefined)[];
  isAudioPlaying: boolean;
}

function reducer(
  state: State,
  action: { type: StateStatus; mediaInfo?: MediaDto }
) {
  switch (action.type) {
    case StateStatus.add:
      if (
        action.mediaInfo &&
        action.mediaInfo.mediaInfo.fileInfo.type === MediaType.Audio
      ) {
        if (state.isAudioPlaying) {
          return {
            ...state,
            audioQueue: [...state.audioQueue, action.mediaInfo],
          };
        } else {
          return {
            ...state,
            messages: [...state.messages, action.mediaInfo],
            isAudioPlaying: true,
          };
        }
      }

      return { ...state, messages: [...state.messages, action.mediaInfo] };

    case StateStatus.remove:
      if (
        action.mediaInfo &&
        action.mediaInfo.mediaInfo.fileInfo.type === MediaType.Audio
      ) {
        if (state.isAudioPlaying) {
          const audio = state.audioQueue.shift();
          return {
            ...state,
            messages: [
              ...state.messages.filter(
                (m) => m!.mediaInfo.id !== action.mediaInfo!.mediaInfo.id
              ),
              audio,
            ],
            isAudioPlaying: true,
          };
        } else {
          throw new Error("Audio is not playing");
        }
      }

      return {
        ...state,
        messages: state.messages.filter(
          (m) => m!.mediaInfo.id !== action.mediaInfo!.mediaInfo.id
        ),
      };
  }
}

export default function PyroAlerts() {
  document.title = "PyroAlerts";

  const initState: State = {
    messages: [],
    audioQueue: [],
    isAudioPlaying: false,
  };
  const [{ messages }, dispatch] = useReducer(reducer, initState);
  const [announced, setAnnounced] = useState(false);

  SignalRContext.useSignalREffect(
    "alert",
    (message) => {
      const parsedMessage: MediaDto = { ...message };
      parsedMessage.mediaInfo.fileInfo.localFilePath =
        "https://localhost:9155/" +
        parsedMessage.mediaInfo.fileInfo.localFilePath;
      handleAddEvent(parsedMessage);
    },
    []
  );

  function handleAddEvent(mediaInfo: MediaDto) {
    dispatch({ type: StateStatus.add, mediaInfo });
  }

  function handleRemoveEvent(mediaInfo: MediaDto) {
    dispatch({ type: StateStatus.remove, mediaInfo });
  }

  useEffect(() => {
    setAnnounced(false);
  }, []);

  return (
    <>
      {!announced && (
        <Announce title={"PyroAlerts"} callback={() => setAnnounced(true)} />
      )}
      {
        <div id="animation-container">
          <div id="media-container">
            {messages.map((message) => {
              if (!message) return null;

              const { fileInfo, id } = message.mediaInfo;
              const callback = () => handleRemoveEvent(message);

              switch (fileInfo.type) {
                case MediaType.Image || MediaType.Gif:
                  return (
                    <Image key={id} mediaInfo={message} callBack={callback} />
                  );
                case MediaType.Video:
                  return (
                    <Video key={id} MediaInfo={message} callback={callback} />
                  );
                case MediaType.Audio:
                  return (
                    <Audio key={id} mediaInfo={message} callback={callback} />
                  );
                case MediaType.Voice:
                  return <Voice callback={callback} mediaInfo={message} />;
                case MediaType.TelegramSticker:
                  return (
                    <TelegramSticker
                      key={id}
                      mediaInfo={message}
                      callBack={callback}
                    />
                  );
                default:
                  console.dir(message);
                  return null;
              }
            })}
          </div>
        </div>
      }
    </>
  );
}
