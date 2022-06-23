interface Props {
  scene: Scene;
}

export default function ScenePreviewer({ scene }: Props) {
  return (
    <>
      {scene.links.previewVideo && (
        <video
          src={scene.links.previewVideo}
          className='preview-video'
          height='360'
          controls
          style={{ width: "100%" }}
          preload='metadata'></video>
      )}
    </>
  );
}
