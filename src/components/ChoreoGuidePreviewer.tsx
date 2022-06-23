import * as React from "react";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

interface Props {
  guide: ChoreoGuide;
  level: 5 | 1 | 2 | 3 | 4;
}

export default function ChoreoGuidePreviewer({ guide, level }: Props) {
  return (
    <Row gutter={[16, 16]}>
      {guide.songs.map((song) => (
        <Col xs={24} lg={12} xl={8} key={song.id}>
          <Title level={level}>{song.name}</Title>
          {song.previewVideo && (
            <video
              src={song.previewVideo}
              className='preview-video'
              style={{ width: "100%", height: "auto" }}
              controls
              preload='metadata'></video>
          )}
        </Col>
      ))}
    </Row>
  );
}
