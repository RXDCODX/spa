import { EmoteFetcher, EmoteParser } from "@mkody/twitch-emoticons";
import type {} from "@redux-devtools/extension";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { BadgeEmoteSet } from "../../components";

interface Actions {
  init: (clientId: string, clientSecret: string) => void;
  setBadges: (badges: BadgeEmoteSet[]) => void;
  parse: (text: string, size?: number) => string;
}

interface State {
  fetcher?: EmoteFetcher;
  parser?: EmoteParser;
  badges: BadgeEmoteSet[];
}

const initialState: State = {
  badges: [],
};

export const useTwitchStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    init: (clientId: string, clientSecret: string) => {
      const fetcher = new EmoteFetcher(clientId, clientSecret);
      const parser = new EmoteParser(fetcher, {
        template:
          '<img class="emote" crossorigin="anonymous" alt="{name}" src="{link}" style="height: 100%; margin: 0 20px" />',
        match: /(\w+)+?/g,
      });

      Promise.all([
        // Twitch global
        fetcher.fetchTwitchEmotes(),
        // Twitch channel
        fetcher.fetchTwitchEmotes(785975641),
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
        .then(() => {
          console.log("Emotes loaded");
          set({ fetcher, parser });
        })
        .catch((err) => {
          console.error("Error loading emotes...");
          console.error(err);
        });
    },
  }))
);

export default useTwitchStore;
