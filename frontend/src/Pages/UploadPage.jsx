import { useState } from "react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadVideo } from "@/Api";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await uploadVideo({
      title,
      description,
      thumbnail,
      video,
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Video uploaded successfully");
    } else {
      toast.error("Failed to upload video");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>
          Fill in the details and upload your video
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter video title"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter video description"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="thumbnail">Upload Thumbnail</Label>
              <Input
                id="thumbnail"
                type="file"
                accept=".jpg,.png"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="video">Upload Video</Label>
              <Input
                id="video"
                type="file"
                accept=".mpg,.avi,.mp4"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-6">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
