import React, { useRef, useState } from "react";

type Props = { onUploadComplete: (url: string) => void };

const CLOUD_NAME = "uwryaoa8";
// NOTE: this preset must exist in your Cloudinary dashboard (Settings > Upload
// > Upload presets > Add upload preset), signing mode "Unsigned", the same way
// "sneha-course-videos" and "sneha-course-pdfs" already do.
const UPLOAD_PRESET = "sneha-course-thumbnails";

export default function CloudinaryImageUpload({ onUploadComplete }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess(false);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WEBP).");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setProgress(0);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
          onUploadComplete(data.secure_url);
          setUploading(false);
          setProgress(100);
          setSuccess(true);
          if (inputRef.current) inputRef.current.value = "";
        } else {
          console.error("Cloudinary thumbnail:", data);
          setError(
            data?.error?.message ||
              `Image upload failed (${xhr.status}). If this preset doesn't exist yet, create an unsigned preset named "${UPLOAD_PRESET}" in your Cloudinary dashboard.`
          );
          setUploading(false);
        }
      } catch {
        setError("Invalid Cloudinary response.");
        setUploading(false);
      }
    };

    xhr.onerror = () => {
      setError("Network error while uploading image.");
      setUploading(false);
    };

    xhr.send(form);
  };

  return (
    <div className="space-y-2">
      <label className="block font-bold text-sm">Upload Thumbnail Image</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={handleChange}
        className="w-full border rounded-xl p-2"
      />
      {uploading && <div className="text-xs">Uploading image... {progress}%</div>}
      {success && <div className="text-sm font-semibold text-green-600">✓ Thumbnail uploaded successfully</div>}
      {error && <div className="text-sm font-semibold text-red-600 whitespace-pre-wrap">{error}</div>}
    </div>
  );
}