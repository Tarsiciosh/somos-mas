import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

const PlayerControls = ({ muted, toggleMute, playing, togglePlaying }) => {

  return (
    <>

      <button onClick={togglePlaying}>
        <FontAwesomeIcon
          icon={playing ? faPause : faPlay}
        />
      </button>

      <button onClick={toggleMute}>
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
        />
      </button>

    </>
  )
}

export default PlayerControls