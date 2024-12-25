/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum BadgeColor {
  Value1 = 1,
  Value100 = 100,
  Value1000 = 1000,
  Value5000 = 5000,
  Value10000 = 10000,
}

export interface BadgeEmoteSet {
  setId?: string | null;
  versions?: BadgeVersion[] | null;
}

export interface BadgeVersion {
  id?: string | null;
  imageUrl1x?: string | null;
  imageUrl2x?: string | null;
  imageUrl4x?: string | null;
}

export type ChatMessage = TwitchLibMessage & {
  badgeInfo?: StringStringKeyValuePair[] | null;
  /** @format int32 */
  bits?: number;
  /** @format double */
  bitsInDollars?: number;
  channel?: string | null;
  cheerBadge?: CheerBadge | null;
  customRewardId?: string | null;
  emoteReplacedMessage?: string | null;
  id?: string | null;
  isBroadcaster?: boolean;
  isFirstMessage?: boolean;
  isHighlighted?: boolean;
  isMe?: boolean;
  isModerator?: boolean;
  isSkippingSubMode?: boolean;
  isSubscriber?: boolean;
  isVip?: boolean;
  isStaff?: boolean;
  isPartner?: boolean;
  message?: string | null;
  noisy?: Noisy;
  roomId?: string | null;
  /** @format int32 */
  subscribedMonthCount?: number;
  tmiSentTs?: string | null;
  chatReply?: ChatReply | null;
};

export interface ChatReply {
  parentDisplayName?: string | null;
  parentMsgBody?: string | null;
  parentMsgId?: string | null;
  parentUserId?: string | null;
  parentUserLogin?: string | null;
}

export interface CheerBadge {
  /** @format int32 */
  cheerAmount: number;
  color: BadgeColor;
}

export interface Color {
  /** @format int32 */
  r: number;
  /** @format int32 */
  g: number;
  /** @format int32 */
  b: number;
  /** @format int32 */
  a: number;
  isKnownColor: boolean;
  isEmpty: boolean;
  isNamedColor: boolean;
  isSystemColor: boolean;
  name: string;
}

export interface Emote {
  id?: string | null;
  name?: string | null;
  /** @format int32 */
  startIndex: number;
  /** @format int32 */
  endIndex: number;
  imageUrl?: string | null;
}

export interface EmoteSet {
  emotes?: Emote[] | null;
  rawEmoteSetString?: string | null;
}

export interface GenericEmote {
  name: string;
  url: string;
  isTwitch: boolean;
}

export interface GetGlobalChatBadgesResponse {
  emoteSet?: BadgeEmoteSet[] | null;
}

export interface Image {
  signature?: string | null;
  extension?: string | null;
  /** @format int32 */
  imageID: number;
  /** @format int32 */
  favorites: number;
  dominantColor?: string | null;
  source?: string | null;
  artist?: any;
  /** @format date-time */
  uploadedAt: string;
  likedAt?: any;
  isNsfw: boolean;
  /** @format int32 */
  width: number;
  /** @format int32 */
  height: number;
  /** @format int32 */
  byteSize: number;
  url?: string | null;
  previewURL?: string | null;
  tags?: Tag[] | null;
}

export interface MediaDto {
  mediaInfo: MediaInfo;
  /** @format date-time */
  uploadStartTime: string;
}

export interface MediaFileInfo {
  type: MediaType;
  localFilePath: string;
  fileName: string;
  extension: string;
}

export interface MediaInfo {
  /** @format uuid */
  id: string;
  textInfo: MediaTextInfo;
  fileInfo: MediaFileInfo;
  positionInfo: MediaPositionInfo;
  isWithGenericEmotes: boolean;
  emotes?: GenericEmote[] | null;
  metaInfo: MediaMetaInfo;
  stylesInfo: MediaStylesInfo;
}

export interface MediaMetaInfo {
  /** @format int32 */
  twitchPointsCost: number;
  vip: boolean;
  displayName: string;
  isLooped: boolean;
  /** @format int32 */
  duration: number;
}

export interface MediaPositionInfo {
  isProportion: boolean;
  isResizeRequires: boolean;
  /** @format int32 */
  height: number;
  /** @format int32 */
  width: number;
  isRotated: boolean;
  /** @format int32 */
  rotation: number;
  /** @format int32 */
  xCoordinate: number;
  /** @format int32 */
  yCoordinate: number;
  randomCoordinates: boolean;
}

export interface MediaStylesInfo {
  isBorder: boolean;
}

export interface MediaTextInfo {
  keyWordsColor?: string;
  keyWord?: string;
  text?: string;
  textColor?: string;
}

/** @format int32 */
export enum MediaType {
  None,
  Image, //Изображение
  Audio, //Аудио, музыка, голосовое сообщение
  Video, //Видео, может быть разных фарматов, наиболее вероятные mp4/webm
  TelegramSticker, //tgs стикеры телеги
  Voice,
  Gif,
}

/** @format int32 */
export enum Noisy {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

export interface StringStringKeyValuePair {
  key?: string;
  value?: string;
}

export interface Tag {
  /** @format int32 */
  tag_id: number;
  name: string;
  description: string;
  is_nsfw: boolean;
}

export interface TwitchLibMessage {
  badges?: StringStringKeyValuePair[];
  botUsername?: string;
  color: Color;
  colorHex?: string;
  displayName?: string;
  emoteSet?: EmoteSet;
  isTurbo: boolean;
  userId?: string;
  username?: string;
  userType: UserType;
  rawIrcMessage?: string;
}

export type TwitchLibMessageBuilder = TwitchLibMessage & object;

/** @format int32 */
export enum UserType {
  None = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
}

export interface Waifu {
  /** @minLength 1 */
  shikiId: string;
  name?: string;
  /** @format int64 */
  age: number;
  anime?: string;
  manga?: string;
  /** @format date-time */
  whenAdded: string;
  /** @format date-time */
  lastOrder: string;
  /** @format int32 */
  orderCount: number;
  isPrivated: boolean;
  imageUrl?: string;
  isAdded?: boolean;
  merged?: boolean;
}

export type WhisperMessage = TwitchLibMessage & {
  messageId?: string;
  threadId?: string;
  message?: string;
};
