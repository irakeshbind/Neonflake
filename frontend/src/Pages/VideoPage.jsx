import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { getVideoById } from "@/Api";

export function VideoPage() {
  const [videoUrl, setVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getVideoById(id).then((res) => setVideo(res.data.videoData.videoUrl));
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold mb-4">Video Player</h1>
        <div
          className="video-wrapper"
          style={{ position: "relative", paddingBottom: "56.25%" }}
        >
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full rounded-md"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
}
