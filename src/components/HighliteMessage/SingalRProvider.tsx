import { JSX } from "react";

import { SignalRContext } from "../../app";

interface Props {
  children: JSX.Element;
}

export default function SignalRProvider({ children }: Props) {
  return (
    <SignalRContext.Provider
      automaticReconnect={true}
      onError={(error) => new Promise((resolve) => resolve(console.log(error)))}
      onClosed={(event) => console.log(event)}
      logger={console}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "chathub"}
      logMessageContent
    >
      {children}
    </SignalRContext.Provider>
  );
}
