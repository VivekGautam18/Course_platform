// // import React, { useState } from "react";

// // interface CloudinaryVideoUploadProps {
// //   onUploadComplete: (videoUrl: string) => void;
// // }

// // const CLOUD_NAME = "uwryaoa8";
// // const UPLOAD_PRESET = "sneha-course-videos";

// // export default function CloudinaryVideoUpload({
// //   onUploadComplete,
// // }: CloudinaryVideoUploadProps) {
// //   const [uploading, setUploading] = useState(false);
// //   const [progress, setProgress] = useState(0);
// //   const [error, setError] = useState("");

// //   const handleUpload = async (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     const file = event.target.files?.[0];

// //     if (!file) return;

// //     setError("");
// //     setProgress(0);

// //     // Only allow video files
// //     if (!file.type.startsWith("video/")) {
// //       setError("Please select a video file.");
// //       return;
// //     }

// //     setUploading(true);

// //     try {
// //       const formData = new FormData();

// //       formData.append("file", file);
// //       formData.append("upload_preset", UPLOAD_PRESET);

// //       const xhr = new XMLHttpRequest();

// //       xhr.open(
// //         "POST",
// //         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
// //       );

// //       xhr.upload.onprogress = (event) => {
// //         if (event.lengthComputable) {
// //           const percent = Math.round(
// //             (event.loaded / event.total) * 100
// //           );

// //           setProgress(percent);
// //         }
// //       };

// //       xhr.onload = () => {
// //         if (xhr.status >= 200 && xhr.status < 300) {
// //           const response = JSON.parse(xhr.responseText);

// //           const videoUrl = response.secure_url;

// //           onUploadComplete(videoUrl);

// //           setProgress(100);
// //           setUploading(false);
// //         } else {
// //           console.error(xhr.responseText);
// //           setError("Video upload failed.");
// //           setUploading(false);
// //         }
// //       };

// //       xhr.onerror = () => {
// //         setError("Network error while uploading video.");
// //         setUploading(false);
// //       };

// //       xhr.send(formData);

// //     } catch (err) {
// //       console.error(err);
// //       setError("Something went wrong while uploading.");
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-3">

// //       <label className="block font-semibold text-sm">
// //         Upload Video
// //       </label>

// //       <input
// //         type="file"
// //         accept="video/*"
// //         disabled={uploading}
// //         onChange={handleUpload}
// //         className="w-full border rounded-xl p-2 text-sm"
// //       />

// //       {uploading && (
// //         <div className="space-y-2">

// //           <div className="flex justify-between text-xs">
// //             <span>Uploading...</span>
// //             <span>{progress}%</span>
// //           </div>

// //           <div className="w-full bg-slate-200 rounded-full h-2">
// //             <div
// //               className="bg-blue-600 h-2 rounded-full transition-all"
// //               style={{ width: `${progress}%` }}
// //             />
// //           </div>

// //         </div>
// //       )}

// //       {error && (
// //         <p className="text-sm text-red-600">
// //           {error}
// //         </p>
// //       )}

// //     </div>
// //   );
// // }

// import React, { useRef, useState } from "react";

// interface CloudinaryVideoUploadProps {
//   onUploadComplete: (videoUrl: string) => void;
// }

// const CLOUD_NAME = "uwryaoa8";
// const UPLOAD_PRESET = "sneha-course-videos";

// export default function CloudinaryVideoUpload({
//   onUploadComplete,
// }: CloudinaryVideoUploadProps) {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");

//   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setError("");
//     setProgress(0);

//     if (!file.type.startsWith("video/")) {
//       setError("Please select a video file.");
//       event.target.value = "";
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     const xhr = new XMLHttpRequest();

//     xhr.open(
//       "POST",
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
//     );

//     xhr.upload.onprogress = (event) => {
//       if (event.lengthComputable) {
//         setProgress(Math.round((event.loaded / event.total) * 100));
//       }
//     };

//     xhr.onload = () => {
//       try {
//         const response = JSON.parse(xhr.responseText || "{}");

//         if (xhr.status >= 200 && xhr.status < 300 && response.secure_url) {
//           onUploadComplete(response.secure_url);
//           setProgress(100);
//           setUploading(false);

//           if (inputRef.current) {
//             inputRef.current.value = "";
//           }

//           window.alert("Video uploaded successfully!");
//         } else {
//           console.error("Cloudinary video error:", response);
//           setError(
//             response.error?.message ||
//               `Video upload failed (HTTP ${xhr.status}).`
//           );
//           setUploading(false);
//         }
//       } catch (error) {
//         console.error("Video response error:", error);
//         setError("Cloudinary returned an invalid response.");
//         setUploading(false);
//       }
//     };

//     xhr.onerror = () => {
//       setError("Network error while uploading video.");
//       setUploading(false);
//     };

//     xhr.send(formData);
//   };

//   return (
//     <div className="space-y-3">
//       <label className="block font-semibold text-sm">
//         Upload Video
//       </label>

//       <input
//         ref={inputRef}
//         type="file"
//         accept="video/*"
//         disabled={uploading}
//         onChange={handleUpload}
//         className="w-full border rounded-xl p-2 text-sm"
//       />

//       {uploading && (
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs">
//             <span>Uploading...</span>
//             <span>{progress}%</span>
//           </div>

//           <div className="w-full bg-slate-200 rounded-full h-2">
//             <div
//               className="bg-blue-600 h-2 rounded-full transition-all"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {error && (
//         <p className="text-sm text-red-600">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }
import React, { useRef, useState } from "react";

type Props = { onUploadComplete: (url: string) => void };

const CLOUD_NAME = "uwryaoa8";
const UPLOAD_PRESET = "sneha-course-videos";

export default function CloudinaryVideoUpload({ onUploadComplete }: Props) {
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

    if (!file.type.startsWith("video/")) {
      setError("Please select a video file.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setProgress(0);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`);

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
          window.alert("Video uploaded successfully!");
        } else {
          console.error("Cloudinary video:", data);
          setError(data?.error?.message || `Video upload failed (${xhr.status}).`);
          setUploading(false);
        }
      } catch {
        setError("Invalid Cloudinary response.");
        setUploading(false);
      }
    };

    xhr.onerror = () => {
      setError("Network error while uploading video.");
      setUploading(false);
    };

    xhr.send(form);
  };

  return (
    <div className="space-y-2">
      <label className="block font-bold text-sm">Upload Video</label>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        disabled={uploading}
        onChange={handleChange}
        className="w-full border rounded-xl p-2"
      />
      {uploading && <div className="text-xs">Uploading video... {progress}%</div>}
      {success && <div className="text-sm font-semibold text-green-600">✓ Video uploaded successfully</div>}
      {error && <div className="text-sm font-semibold text-red-600">{error}</div>}
    </div>
  );
}