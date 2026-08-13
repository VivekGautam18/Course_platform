// // import React, { useState } from "react";

// // interface CloudinaryPdfUploadProps {
// //   onUploadComplete: (pdfUrl: string) => void;
// // }

// // const CLOUD_NAME = "uwryaoa8";
// // const UPLOAD_PRESET = "sneha-course-pdfs";

// // export default function CloudinaryPdfUpload({
// //   onUploadComplete,
// // }: CloudinaryPdfUploadProps) {
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [progress, setProgress] = useState(0);
// //   const [error, setError] = useState("");
// //   const [uploaded, setUploaded] = useState(false);

// //   const handleFileChange = (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     const file = event.target.files?.[0];

// //     if (!file) return;

// //     console.log("PDF SELECTED:", file.name);

// //     if (
// //       file.type !== "application/pdf" &&
// //       !file.name.toLowerCase().endsWith(".pdf")
// //     ) {
// //       setError("Please select a PDF file.");
// //       return;
// //     }

// //     setSelectedFile(file);
// //     setUploaded(false);
// //     setError("");
// //     setProgress(0);
// //   };

// //   const uploadPdf = () => {
// //     if (!selectedFile) {
// //       setError("Please select a PDF first.");
// //       return;
// //     }

// //     console.log("STARTING PDF UPLOAD:", selectedFile.name);

// //     setUploading(true);
// //     setError("");
// //     setProgress(0);

// //     const formData = new FormData();

// //     formData.append("file", selectedFile);
// //     formData.append("upload_preset", UPLOAD_PRESET);

// //     const xhr = new XMLHttpRequest();

// //     // PDFs are uploaded as Cloudinary image assets.
// //     xhr.open(
// //       "POST",
// //       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
// //     );

// //     xhr.upload.onprogress = (event) => {
// //       if (event.lengthComputable) {
// //         const percent = Math.round(
// //           (event.loaded / event.total) * 100
// //         );

// //         setProgress(percent);
// //       }
// //     };

// //     xhr.onload = () => {
// //       console.log("CLOUDINARY STATUS:", xhr.status);
// //       console.log("CLOUDINARY RESPONSE:", xhr.responseText);

// //       if (xhr.status >= 200 && xhr.status < 300) {
// //         try {
// //           const response = JSON.parse(xhr.responseText);
// //           const pdfUrl = response.secure_url;

// //           if (!pdfUrl) {
// //             throw new Error("Cloudinary did not return a PDF URL.");
// //           }

// //           console.log("PDF URL:", pdfUrl);

// //           onUploadComplete(pdfUrl);

// //           setProgress(100);
// //           setUploading(false);
// //           setUploaded(true);
// //         } catch (err) {
// //           console.error(err);
// //           setError("Upload succeeded, but the PDF URL could not be read.");
// //           setUploading(false);
// //         }
// //       } else {
// //         setError(
// //           `Cloudinary upload failed (${xhr.status}). ${xhr.responseText}`
// //         );
// //         setUploading(false);
// //       }
// //     };

// //     xhr.onerror = () => {
// //       console.error("PDF NETWORK ERROR");
// //       setError("Network error while uploading PDF.");
// //       setUploading(false);
// //     };

// //     xhr.send(formData);
// //   };

// //   return (
// //     <div className="space-y-3">
// //       <label className="block font-semibold text-sm">
// //         Upload PDF
// //       </label>

// //       <input
// //         type="file"
// //         accept=".pdf,application/pdf"
// //         disabled={uploading}
// //         onChange={handleFileChange}
// //         className="w-full border rounded-xl p-2 text-sm"
// //       />

// //       {selectedFile && (
// //         <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
// //           <strong>Selected:</strong> {selectedFile.name}
// //         </div>
// //       )}

// //       {selectedFile && !uploading && !uploaded && (
// //         <button
// //           type="button"
// //           onClick={uploadPdf}
// //           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
// //         >
// //           Upload PDF
// //         </button>
// //       )}

// //       {uploading && (
// //         <div className="space-y-2">
// //           <div className="flex justify-between text-xs">
// //             <span>Uploading PDF...</span>
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

// //       {uploaded && (
// //         <p className="text-sm text-green-600 font-semibold">
// //           ✅ PDF uploaded successfully
// //         </p>
// //       )}

// //       {error && (
// //         <p className="text-sm text-red-600 whitespace-pre-wrap">
// //           {error}
// //         </p>
// //       )}
// //     </div>
// //   );
// // }




// import React, { useRef, useState } from "react";

// interface CloudinaryPdfUploadProps {
//   onUploadComplete: (pdfUrl: string) => void;
// }

// const CLOUD_NAME = "uwryaoa8";
// const UPLOAD_PRESET = "sneha-course-pdfs";

// export default function CloudinaryPdfUpload({
//   onUploadComplete,
// }: CloudinaryPdfUploadProps) {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");

//   const handlePdfChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setError("");
//     setProgress(0);

//     const isPdf =
//       file.type === "application/pdf" ||
//       file.name.toLowerCase().endsWith(".pdf");

//     if (!isPdf) {
//       setError("Please select a PDF file.");
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
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
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

//           window.alert("PDF uploaded successfully!");
//         } else {
//           console.error("Cloudinary PDF error:", response);
//           setError(
//             response.error?.message ||
//               `PDF upload failed (HTTP ${xhr.status}).`
//           );
//           setUploading(false);
//         }
//       } catch (error) {
//         console.error("PDF response error:", error);
//         setError("Cloudinary returned an invalid response.");
//         setUploading(false);
//       }
//     };

//     xhr.onerror = () => {
//       setError("Network error while uploading PDF.");
//       setUploading(false);
//     };

//     xhr.send(formData);
//   };

//   return (
//     <div className="space-y-3">
//       <label className="block font-semibold text-sm">
//         Upload PDF
//       </label>

//       <input
//         ref={inputRef}
//         type="file"
//         accept=".pdf,application/pdf"
//         disabled={uploading}
//         onChange={handlePdfChange}
//         className="w-full border rounded-xl p-2 text-sm"
//       />

//       {uploading && (
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs">
//             <span>Uploading PDF...</span>
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
const UPLOAD_PRESET = "sneha-course-pdfs";

export default function CloudinaryPdfUpload({ onUploadComplete }: Props) {
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

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please select a PDF file.");
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
          window.alert("PDF uploaded successfully!");
        } else {
          console.error("Cloudinary PDF:", data);
          setError(data?.error?.message || `PDF upload failed (${xhr.status}).`);
          setUploading(false);
        }
      } catch {
        setError("Invalid Cloudinary response.");
        setUploading(false);
      }
    };

    xhr.onerror = () => {
      setError("Network error while uploading PDF.");
      setUploading(false);
    };

    xhr.send(form);
  };

  return (
    <div className="space-y-2">
      <label className="block font-bold text-sm">Upload PDF</label>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        disabled={uploading}
        onChange={handleChange}
        className="w-full border rounded-xl p-2"
      />
      {uploading && <div className="text-xs">Uploading PDF... {progress}%</div>}
      {success && <div className="text-sm font-semibold text-green-600">✓ PDF uploaded successfully</div>}
      {error && <div className="text-sm font-semibold text-red-600">{error}</div>}
    </div>
  );
}