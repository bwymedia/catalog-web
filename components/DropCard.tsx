import { Card, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const { Title } = Typography;

interface Props {
  drop: any;
}

const DropCard = ({ drop }: Props) => {
  const [animated, setAnimated] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const animate = () => {
    setAnimated(true);
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
  };

  const reset = () => {
    setAnimated(false);
    if (!videoRef.current) return;
    if (!videoRef.current.paused) videoRef.current.pause();
    videoRef.current.currentTime = 0.0;
  };

  return (
    <Card
      hoverable
      onMouseOver={animate}
      onMouseLeave={reset}
      cover={
        drop.links.previewVideo && (
          <video
            ref={videoRef}
            src={drop.links.previewVideo}
            muted
            loop
            preload="auto"
          />
        )
      }
    >
      <Title level={5} style={{ margin: 0 }}>
        {drop.name} <Tag color="cyan">#{drop.id}</Tag>
      </Title>
    </Card>
  );
};

export default DropCard;
