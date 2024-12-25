import { GenericEmote, MediaInfo } from "..";

export { BigTextBlockForVoice } from "./BigTextBlockForVoice";
export { BigTextBlockForAudio } from "./BigTextBlockForAudio";

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

  return text;
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
  const returnObj: React.CSSProperties = {};

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
    returnObj.left = `${info.positionInfo.xCoordinate}px`;
    returnObj.top = `${info.positionInfo.yCoordinate}px`;
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
