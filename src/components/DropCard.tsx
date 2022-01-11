import { Button, Card, Checkbox, Tag, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { Title } = Typography;

interface Props {
  drop: Drop;
}

export default function DropCard({ drop }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [tryingPlay, setTryingPlay] = useState(false);

  const animate = () => {
    if (!videoRef.current || playing || tryingPlay) return;
    videoRef.current
      .play()
      .then(() => {
        setPlaying(true);
      })
      .finally(() => {
        setTryingPlay(false);
      });
    setTryingPlay(true);
  };

  const reset = () => {
    if (!videoRef.current || !playing || tryingPlay) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0.0;
    setPlaying(false);
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
            width="320"
          />
        )
      }
      style={{ width: '320px' }}
    >
      <Title level={5} style={{ margin: 0 }}>
        {drop.name} <Tag color="cyan">#{drop.id}</Tag>
      </Title>
    </Card>
  );
}
