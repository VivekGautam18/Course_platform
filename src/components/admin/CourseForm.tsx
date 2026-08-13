import React, { useState } from "react";
import { CourseRepository } from "../../repositories/CourseRepository";

export default function CourseForm() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState(0);

  const [duration, setDuration] = useState("");

  const saveCourse = async () => {

    await CourseRepository.addCourse({

      title,

      subject,

      category: "CA Final",

      group: "Both Groups",

      description,

      longDescription: description,

      thumbnail: "",

      duration,

      price,

      originalPrice: price,

    });

    alert("Course Added Successfully");

    setTitle("");
    setSubject("");
    setDescription("");
    setPrice(0);
    setDuration("");

  };

  return (

    <div className="space-y-4">

      <input
        className="w-full border p-2 rounded"
        placeholder="Course Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Subject"
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(Number(e.target.value))}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Duration"
        value={duration}
        onChange={(e)=>setDuration(e.target.value)}
      />

      <button

        onClick={saveCourse}

        className="bg-blue-600 text-white px-5 py-2 rounded"

      >

        Save Course

      </button>

    </div>

  );

}