import { Button, Card, Checkbox, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";

const { Title } = Typography;

interface Props {
  drop: Drop;
}

export default function DropCard({ drop }: Props) {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [tryingPlay, setTryingPlay] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

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

  const handleAddToCart = () => {
    dispatch(addToCart(drop));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3500);
  };

  return (
    <Card
      hoverable
      onMouseOver={animate}
      onMouseLeave={reset}
      cover={
        drop.previewVideo && (
          <video
            ref={videoRef}
            src={drop.previewVideo}
            muted
            loop
            width='320'
          />
        )
      }>
      <Title level={5} style={{ margin: 0 }}>
        {drop.name} <Tag color='cyan'>#{drop.id}</Tag>
      </Title>
      {/* <Button 
        type="primary" 
        className={!isAdded ? "" : "added"}
        style={{ marginTop: "16px", minWidth: "125px", transition: "all .3s ease-in" }}
        onClick={handleAddToCart}
      >
       {!isAdded ? "ADD TO CART" : "✔ ADDED"}
      </Button> */}
    </Card>
  );
}
