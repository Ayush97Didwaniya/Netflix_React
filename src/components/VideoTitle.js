import React from "react";

const VideoTitle = ({ title, overview }) => {
	return (
		<div className="w-screen aspect-video pt-[25%] px-24 absolute text-white bg-gradient-to-r to-black">
			<h1 className="text-3xl font-bold">{title}</h1>
			<p className="text-lg py-6 w-1/4">{overview}</p>
			<div className="">
				<button className="mx-2 bg-white text-black p-4 px-8 text-xl rounded-lg hover:opacity-80">
					▶️ Play
				</button>
				<button className="mx-2 bg-gray-500 text-white p-4 px-8 text-xl  bg-opacity-50 rounded-lg hover:opacity-80">
					More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
