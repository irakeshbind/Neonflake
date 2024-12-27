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
import { uploadVideo } from "@/Api";
import { toast } from "sonner";
import { Puff } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigateToHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check file sizes
    const maxThumbnailSize = 5 * 1024 * 1024; // 5MB
    if (thumbnail.size > maxThumbnailSize) {
      toast.error("Thumbnail file size must be less than 5MB");
      return;
    }

    const maxVideoSize = 50 * 1024 * 1024; // 50MB
    if (video.size > maxVideoSize) {
      toast.error("Video file size must be less than 50MB");
      return;
    }

    try {
      const response = await uploadVideo({
        video,
        thumbnail,
        title,
        description,
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success("Video uploaded successfully");
        // Reset form
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setVideo(null);
        navigateToHome();
      } else {
        setLoading(false);
        toast.error(response.data?.message || "Failed to upload video");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred while uploading");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {loading == true ? (
        <div className="flex justify-center items-center h-screen">
          <Puff
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <>
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
                    required
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
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="thumbnail">Upload Thumbnail</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept=".jpg,.png"
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="video">Upload Video</Label>
                  <Input
                    id="video"
                    type="file"
                    accept=".mpg,.avi,.mp4"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    required
                  />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setDescription("");
                    setThumbnail(null);
                    setVideo(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </CardFooter>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
}
