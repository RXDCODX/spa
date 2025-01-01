import { useCallback, useReducer, useState } from "react";

import { SignalRContext } from "../../app";
import Announce from "../../shared/Utils/Announce/Announce";
import { MediaDto, MediaType } from "..";
import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";

enum StateStatus {
  add,
  remove,
}

interface State {
  messages: (MediaDto | undefined)[];
  currentTrack?: MediaDto;
}

function reducer(
  state: State,
  action: { type: StateStatus; mediaInfo?: MediaDto }
): State {
  const md = action.mediaInfo;
  const ft = md?.mediaInfo.fileInfo;

  switch (action.type) {
    case StateStatus.add:
      if (
        md &&
        (ft!.type === MediaType.Audio || ft!.type === MediaType.Voice) &&
        !state.currentTrack
      ) {
        return {
          messages: [...state.messages],
          currentTrack: md,
        };
      }

      return { ...state, messages: [...state.messages, md] };

    case StateStatus.remove:
      if (
        md &&
        (ft!.type === MediaType.Audio || ft!.type === MediaType.Voice)
      ) {
        const audio = state.messages.find(
          (e) =>
            (ft!.type === MediaType.Audio || ft!.type === MediaType.Voice) &&
            e?.mediaInfo.index != md.mediaInfo.index
        );

        return {
          messages: state.messages.filter(
            (m) => m!.mediaInfo.index != md!.mediaInfo.index
          ),
          currentTrack: audio,
        };
      }

      return {
        ...state,
        messages: state.messages.filter(
          (m) => m!.mediaInfo.index != md!.mediaInfo.index
        ),
      };
  }
}

export default function PyroAlerts() {
  document.title = "PyroAlerts";

  const initState: State = {
    messages: [],
    currentTrack: undefined,
  };
  const [{ messages, currentTrack }, dispatch] = useReducer(reducer, initState);
  const [announced, setAnnounced] = useState(false);
  const [count, setCount] = useState(0);

  SignalRContext.useSignalREffect(
    "alert",
    (message) => {
      const parsedMessage: MediaDto = { ...message };
      parsedMessage.mediaInfo.fileInfo.localFilePath =
        import.meta.env.VITE_BASE_PATH +
        parsedMessage.mediaInfo.fileInfo.localFilePath;

      parsedMessage.mediaInfo.index = count;
      setCount(count + 1);
      add(parsedMessage);
    },
    []
  );

  const add = useCallback(
    function handleAddEvent(mediaInfo: MediaDto) {
      dispatch({ type: StateStatus.add, mediaInfo });
    },
    [messages, currentTrack, dispatch]
  );

  const remove = useCallback(
    function handleRemoveEvent(mediaInfo: MediaDto) {
      dispatch({ type: StateStatus.remove, mediaInfo });
    },
    [messages, currentTrack, dispatch]
  );

  return (
    <>
      {!announced && (
        <Announce title={"PyroAlerts"} callback={() => setAnnounced(true)} />
      )}
      {messages.map((message) => {
        if (!message) return null;

        const { fileInfo, index } = message.mediaInfo;
        const callback = () => remove(message);

        switch (fileInfo.type) {
          case MediaType.Image || MediaType.Gif:
            return (
              <Image key={index} mediaInfo={message} callBack={callback} />
            );
          case MediaType.Video:
            return (
              <Video key={index} MediaInfo={message} callback={callback} />
            );
          case MediaType.TelegramSticker:
            return (
              <TelegramSticker
                key={index}
                mediaInfo={message}
                callBack={callback}
              />
            );
        }
      })}
      {currentTrack &&
        currentTrack.mediaInfo.fileInfo.type === MediaType.Audio && (
          <Audio
            key={currentTrack.mediaInfo.index}
            mediaInfo={currentTrack}
            callback={() => remove(currentTrack)}
          />
        )}
      {currentTrack &&
        currentTrack.mediaInfo.fileInfo.type === MediaType.Voice && (
          <Voice
            key={currentTrack.mediaInfo.index}
            mediaInfo={currentTrack}
            callback={() => remove(currentTrack)}
          />
        )}
    </>
  );
}
