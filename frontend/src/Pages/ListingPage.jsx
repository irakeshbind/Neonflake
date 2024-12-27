import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";

// This would typically come from your API or database
const videos = [
  { id: 1, title: "Video 1", thumbnail: "/placeholder.svg" },
  { id: 2, title: "Video 2", thumbnail: "/placeholder.svg" },
  { id: 3, title: "Video 3", thumbnail: "/placeholder.svg" },
];

export function ListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Video Listing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link to={`/video/${video.id}`} key={video.id}>
            <Card>
              <CardContent className="p-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
                <h2 className="text-lg font-semibold">{video.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}