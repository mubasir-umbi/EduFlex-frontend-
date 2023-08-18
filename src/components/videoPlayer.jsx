// import React from "react";
// import ReactPlayer from "react-player";

// const VideoPlayer = ({ url, onPlayHandler }) => {

//   const handlePlay = () => {
//     setIsPlaying(true);
//     // Call the onPlayHandler callback function and pass any necessary data
//     if (onPlayHandler) {
//       onPlayHandler(/* pass relevant data here */);
//     }
//   };

//   return (
//     <>
//       <ReactPlayer
//         onPlay={handlePlay}
//         onLoadedMetadata
//         style={{border: 3 , marginTop: "30px", backgroundColor: 'black', maxHeight: '560px' }}
//         url={url}
//         controls
//         width="70%"
//         height="auto"
//       />
//     </>
//   );
// };

// export default VideoPlayer;

// import React, { useState } from 'react';
// import ReactPlayer from 'react-player';

// const VideoPlayer = ({ url, progressHandler }) => {
//   const [videoProgress, setVideoProgress] = useState(0);

//   const handleProgress = (progress) => {
//     setVideoProgress(progress.played * 100);
//   };

//   const handlePlay = () => {
//     if (progressHandler) {
//       console.log(videoProgress, 'video progresssssssssssss');
//       progressHandler(videoProgress);
//     }
//   };

//   return (
//     <>
//       <ReactPlayer
//         url={url}
//         controls
//         width="100%"
//         height="auto"
//         playing={false}
//         onProgress={handleProgress}
//         onPlay={handlePlay}
//       />
//     </>
//   );
// };

// export default VideoPlayer;

// import React, { useState } from 'react';
// import ReactPlayer from 'react-player';

// const VideoPlayer = ({ url }) => {
//   const [videoDuration, setVideoDuration] = useState(0);

//   const handleLoadedMetadata = (metadata) => {
//     setVideoDuration(metadata.duration);
//   };

//   return (
//     <div>
//       <ReactPlayer
//         onLoadedMetadata={handleLoadedMetadata}
//         style={{ border: 3, marginTop: '30px', backgroundColor: 'black', maxHeight: '560px' }}
//         url={url}
//         controls
//         width="70%"
//         height="auto"
//       />
//       <p>Video Duration: {videoDuration.toFixed(2)} seconds</p>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useState } from "react";
import ReactPlayer from "react-player";
import { styled } from '@mui/material/styles';
    
    const StyledReactPlayer = styled(ReactPlayer)(({ theme }) => ({
      maxHeight: {
        xs: '200px',
        sm: '300px',
        md: '400px',
        lg: '500px',
      },
      overflowY: 'auto',
      border: '3px solid black',
      marginTop: '30px',
      backgroundColor: 'black',
    }));

const VideoPlayer = ({ url, lessonId, onComplete }) => {

  return (
    <>
    
    <StyledReactPlayer
     onEnded={() => onComplete(lessonId)}
      url={url}
      controls
      width="70%"
      height="auto"
      playing={false}
    />
    </>
    // <>
    //   <ReactPlayer
    //   sx={{
    //         maxHeight: {
    //           xs: "200px",
    //           sm: "300px",
    //           md: "400px",
    //           lg: "500px",
    //         },
    //         overflowY: "auto",
    //       }}
    //    style={{ border: 3, marginTop: '30px', backgroundColor: 'black'}}
    //     url={url}
    //     controls
    //     width="70%"
    //     height="auto"
    //     playing={false}
    //     onProgress={handleProgress}
    //   />
    // </>
  )
}

export default VideoPlayer;
