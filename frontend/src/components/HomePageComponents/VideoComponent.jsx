
import React from "react";
import video from "../../assets/video/learnexa.mp4";

const VideoPlayer = () => {
  return (
    <div className="relative bg-transparent flex items-center justify-center p-4 -mt-20">
      {" "}
      {/* Negative margin to overlap */}
      <div className="w-full max-w-6xl">
        <div className="relative z-10 mx-auto overflow-hidden border-10 border-gray-200 rounded-3xl shadow-2xl bg-black">
          {" "}
          {/* Added z-10 */}
          <video
            className="w-full h-auto object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
     
      </div>
    </div>
  );
};

export default VideoPlayer;