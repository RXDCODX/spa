import { Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import { MediaDto } from "../../api/generated/baza";
import { replaceEmotes } from "..";
import styles from "./BigTextStyles.module.scss";

interface Props {
  mediaInfo: MediaDto;
}

export function BigTextBlockForAudio({ mediaInfo }: Props) {
  var text = mediaInfo.mediaInfo.textInfo.text;

  if (text === null && text === "") {
    return null;
  }

  text = replaceEmotes(mediaInfo.mediaInfo.emotes, text);
  const splits = text?.split("=");

  const length = splits?.length;

  if (!length) {
    return null;
  } else if (length && length > 2) {
    console.error("Дохуя разделителей в тексте алерта");
    return null;
  }

  for (let i = 0; i < splits.length; i++) {
    splits[i] = splits[i].trim();
  }

  const is2Exists = splits[1] != undefined;

  return (
    <Container className={styles.grid}>
      <Row className={styles.grid_cell}>
        <Textfit
          forceSingleModeWidth
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          {splits[0]}
        </Textfit>
      </Row>
      <Row className={styles.grid_cell}></Row>
      <Row className={styles.grid_cell}></Row>
      <Row className={styles.grid_cell}></Row>
      <Row
        className={
          styles.grid_cell + ` down-cell ${is2Exists ? " bg-black" : ""}`
        }
      >
        <Textfit
          forceSingleModeWidth
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          {is2Exists ? splits[1] : ""}
        </Textfit>
      </Row>
    </Container>
  );
}
