import * as React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface Props {
  guide: ChoreoGuide;
  level: 5 | 1 | 2 | 3 | 4;
}

export default function ChoreoGuidePreviewer({ guide, level }: Props) {
  return (
    <>
      {guide.songs.map((song) => (
        <div key={song.id}>
          <Title level={level}>{song.name}</Title>
          {song.previewVideo && (
            <video
              src={song.previewVideo}
              height="360"
              controls
              preload="metadata"
            ></video>
          )}
        </div>
      ))}
    </>
  );
}
