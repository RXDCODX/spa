import parse from "html-react-parser";

import { GenericEmote, MediaInfo } from "../../components";
import { BadgeEmoteSet, ChatMessage } from "../api/generated/baza";

export { BigTextBlockForVoice } from "./BigTexts/BigTextBlockForVoice";
export { BigTextBlockForAudio } from "./BigTexts/BigTextBlockForAudio";
export { FullText } from "./FullText/FullText";

export function replaceEmotes(
  collection?: GenericEmote[] | null,
  text?: string | null
) {
  if (text) {
    if (collection) {
      collection.forEach(function (elem) {
        try {
          elem.name = elem.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          //// Обновляем регулярное выражение
          //const regex = new RegExp(`(?<!<)(?:(^|\\s))${elem.name}(?:(\\s+|$))(?!<)|(^|\\s)${elem.name}(?!<)`, "g");
          // Обновляем регулярное выражение
          const regex = new RegExp(
            `(?<!<[^>]*)(?<=^|\\s)${elem.name}(?=\\s|$)(?![^<]*>)`,
            "g"
          );
          if (elem.isTwitch) {
            text = text?.replace(
              regex,
              `<img class="emote" src="${elem.url}" type="image">`
            );
          } else {
            text = text?.replaceAll(
              regex,
              `<img class="emote" src="${elem.url}" type="image">`
            );
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  }

  if (!text) {
    return undefined;
  }

  const result = parse(text);

  return result;
}

export function AddBorderToElement(info: MediaInfo): React.CSSProperties {
  return {
    border: `6px solid ${info.textInfo.keyWordsColor}`,
    borderRadius: "50px",
  };
}

export function getRandomInt(min: number, max: number): number {
  // Создаем буфер для одного 32-битного беззнакового целого числа
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  const randomNumber = buffer[0] / (0xffffffff + 1); // Преобразовываем в число от 0 до 1 (включительно)

  // Преобразуем в число в заданном диапазоне
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

export function getCoordinates(
  ref: HTMLImageElement | HTMLVideoElement,
  info: MediaInfo
): React.CSSProperties {
  var returnObj: React.CSSProperties = {};

  if (info?.positionInfo.randomCoordinates) {
    if (!ref?.width) {
      ref.width = info.positionInfo.width;
      ref.height = info.positionInfo.height;
    }

    const getXLong = window.innerWidth - ref.width;
    const getYLong = window.innerHeight - ref.height;
    const randomX = getRandomInt(
      0,
      isNaN(getXLong) ? window.innerWidth : getXLong
    );
    const randomY = getRandomInt(
      0,
      isNaN(getYLong) ? window.innerHeight : getYLong
    );

    returnObj.left = `${randomX >= 1 ? randomX : 0}px`;
    returnObj.top = `${randomY >= 1 ? randomY : 0}px`;
  } else {
    if (
      info?.positionInfo.IsHorizontalCenter &&
      info?.positionInfo.IsVerticallCenter
    ) {
      returnObj = {
        ...returnObj,
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        msTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      };
    } else if (info?.positionInfo.IsHorizontalCenter) {
      returnObj = {
        ...returnObj,
        margin: 0,
        position: "absolute",
        left: "50%",
        msTransform: "translateX(-50%)",
        transform: "translateX(-50%)",
        top: info.positionInfo.yCoordinate + "px",
      };
    } else if (info?.positionInfo.IsVerticallCenter) {
      returnObj = {
        ...returnObj,
        margin: 0,
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        left: info.positionInfo.xCoordinate + "px",
      };
    }
  }

  console.log(returnObj);
  return returnObj;
}

export function getFileExtensionWithoutDot(extension: string | null) {
  const result = extension?.startsWith(".")
    ? extension.substring(1)
    : extension;

  return result;
}

export function getRandomRotation(mediaInfo: MediaInfo) {
  const returnObj: React.CSSProperties = {};

  if (mediaInfo?.positionInfo.isRotated) {
    returnObj.transform = `rotate(${getRandomInt(mediaInfo.positionInfo.rotation * -1, mediaInfo.positionInfo.rotation)}deg)`;
  }

  return returnObj;
}

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function replaceBadges(
  badges: BadgeEmoteSet[],
  chatMessage: ChatMessage
) {
  let sub = "";
  const text = chatMessage.message;

  chatMessage.badges?.forEach(function (b) {
    const set = badges.find((e) => e.setId == b.key);
    const lastVersion = set?.versions?.slice(-1);

    if (!lastVersion) {
      return undefined;
    }

    const link = lastVersion[0].imageUrl1x;
    sub = sub + `<img class="badge" src="${link}" type="image/png">\n`;
  });

  if (!text) {
    return undefined;
  }

  const result = parse(sub);

  if (typeof result === "string") {
    return undefined;
  }

  return result;
}
