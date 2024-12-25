import { Col, Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import { MediaInfoDto } from "../../..";

export function BigTextBlockForVoice(mediaInfoDto: MediaInfoDto) {
  const { MetaInfo, FileInfo } = mediaInfoDto.MediaInfo;

  return (
    <Container className="grid">
      <Col>
        <Row
          className="grid_cell_sh bg-black"
          style={{ height: "calc(100vh/5)" }}
        >
          <Textfit>
            Стример, заткнись
          </Textfit>
        </Row>
        <img
          className="grid_cell_sh"
          src="Alerts/mute.png"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Row
          className="grid_cell_sh down-cell bg-black"
          style={{ height: "calc(100vh/5)" }}
        >
          Сейчас говорит <img className="emote" src={FileInfo.FileName} />
          {MetaInfo.DisplayName}
        </Row>
      </Col>
    </Container>
  );
}
