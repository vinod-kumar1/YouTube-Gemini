import React, { useRef, useState } from "react";
import { setVideoComments } from "../utils/videoStore";
import { useDispatch, useSelector } from "react-redux";

const CommentsSection = ({ videoKey }) => {
  let videoComments = useSelector((state) => state.videos.videoComments);
  let [inp, setInp] = useState("");
  let dispatch = useDispatch();

  return (
    <div className="absolute top-150 left-2 right-[300px]">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div className="relative flex gap-2">
        <img
          src="https://yt3.ggpht.com/yti/ANjgQV_KCdTqkS7bKkYIONaWT6byiaEmykdw3BNwOTeZjavRLNU=s88-c-k-c0x00ffffff-no-rj"
          alt="user-icon"
          className="rounded-4xl w-10"
        />
        <input
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          type="text"
          className="w-[60%] border-b-[1px] border-gray-600 outline-none p-2 rounded"
          placeholder="Add a comment..."
        />
        <button
          onClick={() => setInp("")}
          className="hover:bg-gray-700 py-1 px-4 rounded-4xl cursor-pointer"
        >
          X
        </button>
        <button
          onClick={() => {
            dispatch(
              setVideoComments({
                [videoKey]: { value: inp, likes: 0, dislikes: 0 },
              })
            );
            setInp("");
          }}
          className="bg-blue-500 py-1 px-4 rounded-4xl cursor-pointer hover:bg-blue-600"
        >
          Comment
        </button>
      </div>

      <div className="mt-10 relative left-10">
        {videoComments.map((comment) => {
          let { value, likes, dislikes } = comment[videoKey];
          return (
            <div key={value} className="bg-gray-600 w-[60%] relative">
              <p>{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
