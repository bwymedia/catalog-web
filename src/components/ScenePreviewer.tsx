interface Props {
  scene: Scene;
}

export default function ScenePreviewer({ scene }: Props) {
  return (
    <>
      {scene.links.previewVideo && (
        <video
          src={scene.links.previewVideo}
          height="360"
          controls
          preload="metadata"
        ></video>
      )}
    </>
  );
}
