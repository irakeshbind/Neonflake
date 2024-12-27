import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card"

export function VideoPage() {
  const { id } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  // This would typically come from your API or database
  const videoUrl = `https://res.cloudinary.com/your-cloud-name/video/upload/your-video-${id}.mp4`;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold mb-4">Video Player</h1>
        <video 
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          className="w-full rounded-md"
        >
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  );
}
