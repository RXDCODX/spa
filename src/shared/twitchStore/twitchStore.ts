import { EmoteFetcher, EmoteParser } from "@mkody/twitch-emoticons";
import type {} from "@redux-devtools/extension";
import { ApiClient } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { SignalRContext } from "../../app";
import { BadgeEmoteSet } from "../api/generated/baza";

interface Actions {
  init: (clientId: string, clientSecret: string) => void;
  setBadges: (badges: BadgeEmoteSet[]) => void;
  parse: (text: string, size?: number) => string;
  sendMsgToPyrokxnezxz: (msg: string) => Promise<void>;
}

interface State {
  fetcher?: EmoteFetcher;
  parser?: EmoteParser;
  badges: BadgeEmoteSet[];
  twitchApiClient?: ApiClient;
}

const initialState: State = {
  badges: [],
};

export const useTwitchStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    init: (clientId: string, clientSecret: string) => {
      const { client, fetcher, parser } = initialization(
        clientId,
        clientSecret
      );

      Promise.all([
        // Twitch global
        fetcher.fetchTwitchEmotes(),
        // Twitch channel
        fetcher.fetchTwitchEmotes(785975641),
        // Twitch badges
        getBadges(client),
        //BTTV global
        fetcher.fetchBTTVEmotes(),
        // BTTV channel
        //fetcher.fetchBTTVEmotes(785975641),
        // 7TV global
        fetcher.fetchSevenTVEmotes(),
        // 7TV channel
        fetcher.fetchSevenTVEmotes(785975641),
        // FFZ global
        fetcher.fetchFFZEmotes(),
        // FFZ channel
        //fetcher.fetchFFZEmotes(785975641),
      ])
        .then(({ "2": badges }) => {
          console.log("Emotes loaded");
          set({ fetcher, parser, twitchApiClient: client, badges });
        })
        .catch((err) => {
          console.error("Error loading emotes...");
          console.error(err);
        });
    },
    sendMsgToPyrokxnezxz: async (msg: string) => {
      await SignalRContext.invoke("TwitchMsg", msg);
    },
  }))
);

function initialization(clientId: string, clientSecret: string) {
  const provider = new AppTokenAuthProvider(clientId, clientSecret);
  const client = new ApiClient({ authProvider: provider });
  const fetcher = new EmoteFetcher(undefined, undefined, {
    apiClient: client,
  });
  const parser = new EmoteParser(fetcher, {
    template:
      '<img class="emote" crossorigin="anonymous" alt="{name}" src="{link}" />',
    match: /(\w+)+?/g,
  });

  return { fetcher, parser, client };
}

async function getBadges(apiClient: ApiClient) {
  const badges = await apiClient.chat.getChannelBadges(785975641);
  const channelBadges: BadgeEmoteSet[] = badges.map((b) => ({
    setId: b.id,
    versions: b.versions,
  }));
  const globalBadges: BadgeEmoteSet[] = await apiClient.chat.getGlobalBadges();

  const result = [...channelBadges, ...globalBadges];
  return result;
}

export default useTwitchStore;
