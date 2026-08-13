import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddChapterModal({
  isOpen,
  onClose,
}: Props) {

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-5">
          Add New Chapter
        </h2>

        <input
          className="w-full border rounded p-2 mb-4"
          placeholder="Chapter Title"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded p-2"
          placeholder="Description"
          value={chapterDescription}
          onChange={(e) =>
            setChapterDescription(e.target.value)
          }
        />

        <div className="flex justify-end mt-6 gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 rounded bg-blue-600 text-white"
          >
            Save Chapter
          </button>

        </div>

      </div>

    </div>
  );
}