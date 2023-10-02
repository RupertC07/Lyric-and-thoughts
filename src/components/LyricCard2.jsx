import { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import MUSIC from "../assets/hk.mp3";
import BG from "../assets/bg2.png";
import "./css/LyricCard.css";

export const LyricCard2 = () => {
  const chorusLyrics = [
    "Dipping my face in this cold hands of mine",
    "Heaven knows how embittered I am",
    "'Cause this angel has flown away from me",
    "Leaving me with drunken misery",
    "I should have clipped her wings",
    "And made her mine for all eternity",
    "Now this angel has flown away from me",
    "Thought I had the strength to set ser free",
    "Did what I did beacause i love her so",
    "Will she ever find her away back home to me",
  ];

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentLyric, setCurrentLyric] = useState(chorusLyrics[0]);
  const [typingComplete, setTypingComplete] = useState(false);
  const [audioPlayer] = useState(new Audio(MUSIC));
  const [isPlaying, setIsPlaying] = useState(true);
  const playButtonRef = useRef(null);

  useEffect(() => {
    audioPlayer.removeAttribute("controls");

    // Autoplay the audio when the component mounts
    audioPlayer
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Autoplay failed:", error);
      });

    // Set up event listener for audio time updates
    audioPlayer.addEventListener("timeupdate", handleTimeUpdate);

    // Set up event listener for audio ended event
    audioPlayer.addEventListener("ended", handleAudioEnded);

    // Clean up the event listeners when the component unmounts
    return () => {
      audioPlayer.removeEventListener("timeupdate", handleTimeUpdate);
      audioPlayer.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  useEffect(() => {
    // Trigger a click on the play button when the component mounts
    playButtonRef.current.click();
  }, []);

  const handleTimeUpdate = () => {
    const currentTime = audioPlayer.currentTime;

    let lyricIndex = -1;

    if (currentTime < 5) {
      lyricIndex = 0;
    } else if (currentTime < 14) {
      lyricIndex = 1;
    } else if (currentTime < 20) {
      lyricIndex = 2;
    } else if (currentTime < 25) {
      lyricIndex = 3;
    } else if (currentTime < 28) {
      lyricIndex = 4;
    } else if (currentTime < 35) {
      lyricIndex = 5;
    } else if (currentTime < 41) {
      lyricIndex = 6;
    } else if (currentTime < 46) {
      lyricIndex = 7;
    } else if (currentTime < 52) {
      lyricIndex = 8;
    } else {
      lyricIndex = 9;
    }

    // const lyricIndex = Math.floor(
    //   (currentTime / audioPlayer.duration) * chorusLyrics.length
    // );

    if (lyricIndex !== currentLyricIndex && lyricIndex !== -1) {
      setCurrentLyricIndex(lyricIndex);
      setCurrentLyric(chorusLyrics[lyricIndex]);
    }
  };

  const handleAudioEnded = () => {
    // Reset the current lyrics when the audio ends
    setCurrentLyricIndex(0);
    setCurrentLyric(chorusLyrics[0]);
    setIsPlaying(false); // Optional: Set isPlaying to false when the song ends
  };

  // Function to toggle play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
    } else {
      audioPlayer.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="card md:w-96 bg-base-100 shadow-xl m-4">
      <div className="flex justify-center my-4 p-1">
        <div
          className="card  md:w-80 md:h-auto m-6"
          style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: "cover", // Adjust as needed
            backgroundPosition: "center", // Adjust as needed
            backgroundRepeat: "no-repeat", // Adjust as needed
          }}
        >
          <div
            className="card-body rounded-xl  items-center text-center"
            style={{ backgroundColor: "rgba(255,255,255, 0.58)" }}
          >
            <p className="md:text-lg font-bold text-black font py-10">
              <i>"Our shared history, a symphony of cherished moments."</i>
            </p>
          </div>
        </div>
      </div>

      <div
        className="card-body items-center text-center mt-0"
        style={{ marginTop: -25 }}
      >
        <h2 className="card-title font-bold">Heaven Knows</h2>
        <br />
        <p className={`md:text-lg ${isPlaying ? "fade-in" : "fade-out"}`}>
          {currentLyric}
        </p>
        <br />
        <div className="card-actions">
          <button
            ref={playButtonRef}
            onClick={toggleAudio}
            className="text-4xl tex-slate-300"
          >
            {isPlaying ? <FaIcons.FaPause /> : <FaIcons.FaPlay />}
          </button>
        </div>
      </div>
    </div>
  );
};
