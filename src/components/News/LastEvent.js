import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import PlayerControls from "../utils/PlayerControls";

const lastEvents = [
  'https://www.youtube.com/watch?v=DeTimoK9qrg',
  'https://www.youtube.com/watch?v=4YnSk1gI_Oo',
  'https://www.youtube.com/watch?v=Zp8aZmqf_rU',
]


const LastEvent = () => {
  const [error, setError] = useState(null)
  const [mutedVideo, setMutedVideo] = useState(false)
  const [playingVideo, setPlayingVideo] = useState(false)


  // Quick access for toggling functions
  const toggleMute = () => setMutedVideo(!mutedVideo)
  const togglePlaying = () => setPlayingVideo(!playingVideo)


  return <section>
    <h4>Ultimo evento</h4>

    <div className='videoWrapper'>
      {
        !error
          ? <>
            <ReactPlayer
              // url prop can receive an array of URLs and it will create a playlist (youtube)
              url={lastEvents}

              // Mute and playing state
              muted={mutedVideo}
              playing={playingVideo}
              // Manually handles state when clicking on the video
              onPlay={() => setPlayingVideo(true)}
              onPause={() => setPlayingVideo(false)}

              // On error
              onError={error => setError(error)}
            />

            <PlayerControls
              muted={mutedVideo}
              playing={playingVideo}
              
              //  Video state handler
              toggleMute={toggleMute}
              togglePlaying={togglePlaying}
            />
          </>
          : <strong> {error} </strong>
      }
    </div>
  </section>

}

export default LastEvent