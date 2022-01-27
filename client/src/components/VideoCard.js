import ReactPlayer from "react-player";

const VideoCard = ({ video }) => {
  return (
    <>
      <ReactPlayer controls url={video.url} />
    </>
  );
};

export default VideoCard;
