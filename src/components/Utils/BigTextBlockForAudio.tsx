import { Col, Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import { MediaInfoDto } from "../../..";
import { replaceEmotes } from ".";

export function BigTextBlockForAudio(mediaInfo: MediaInfoDto) {
  let text = mediaInfo.MediaInfo.TextInfo.Text;

  if (text === null && text === "") {
    return null;
  }

  text = replaceEmotes(mediaInfo.MediaInfo.Emotes, text);
  const splits = text.split(/-(?![^<>]*>)/g);

  const length = splits.length;

  if (length > 2) {
    console.error("Дохуя разделителей в тексте алерта");
    return null;
  }

  for (let i = 0; i < splits.length; i++) {
    splits[i] = splits[i].trim();
  }

  const is2Exists = splits[1] != undefined;

  return (
    <Container className="grid">
      <Col>
        <Row>
          <Textfit mode="single" forceSingleModeWidth>
            {splits[0]}
          </Textfit>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
        <Row className={`down-cell ${is2Exists ? "bg-black" : ""}`}>
          <Textfit mode="single" forceSingleModeWidth>
            {is2Exists ? splits[1] : ""}
          </Textfit>{" "}
        </Row>
      </Col>
    </Container>
  );
}
