import React, { useRef, useEffect, useState } from 'react';
import Wavesurfer from 'wavesurfer.js';
import { IonIcon } from '@ionic/react';
import { play, pause } from 'ionicons/icons';

const AudioPlayer = ({ audioSrc, onPlay, onPause }) => {
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(false);
  const wavesurfer = useRef(null);

  const playAudio = () => {
    if (wavesurfer.current) {
      const isCurrentlyPlaying = wavesurfer.current.isPlaying();
      if (!isCurrentlyPlaying) {
        wavesurfer.current.play();
        onPlay();
      } else {
        wavesurfer.current.pause();
        onPause();
      }
      setIsPlaying(!isCurrentlyPlaying);
    }
  };

  useEffect(() => {
    // Initialize Wavesurfer
    wavesurfer.current = Wavesurfer.create({
      container: wavesurferRef.current,
      waveColor: 'black', // Customize waveform color
      progressColor: 'blue', // Customize progress color
      barWidth: 2, // Customize bar width
      height: 30 // Customize waveform height
    });

    // Load the audio file
    wavesurfer.current.load(audioSrc);
    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration());
    });
    wavesurfer.current.on('finish', () => {
      // Pause the audio when it reaches the end
      wavesurfer.current.pause();
      setIsPlaying(false);
    });

    // Clean up Wavesurfer on unmount
    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioSrc]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '35px',
        background: '#f3f3f3',
        alignItems: 'center',
        padding: '2px'
      }}>
      <IonIcon onClick={playAudio} icon={isPlaying ? pause : play} className="clickable-cursor" />
      <div ref={wavesurferRef} style={{ flex: 1, marginLeft: '10px' }}></div>
      {duration && <p>{formatTime(duration)}</p>}
    </div>
  );
};

export default AudioPlayer;
