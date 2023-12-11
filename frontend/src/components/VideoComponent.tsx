import React, { useEffect, useState } from 'react';

const VideoComponent = () => {
  const [playVideo, setPlayVideo] = useState<boolean>(() => {
    return localStorage.getItem('playVideo') === 'true' || true;
  });

  useEffect(() => {
    localStorage.setItem('playVideo', String(playVideo));
  }, [playVideo]);


  return (
    <video src="videos/news.mp4" autoPlay={playVideo} loop muted />
  );
};

export default VideoComponent;
