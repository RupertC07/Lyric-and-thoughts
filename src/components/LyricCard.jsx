import { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import FS from "../assets/fs.mp3";
import BG from "../assets/bg.jpg";
import "./css/LyricCard.css";

export const LyricCard = () => {
  const chorusLyrics = [
    "It's not time to make a change",
    "Just relax, take it easy",
    "You're still young, that's your fault",
    "There's so much you have to know",
  ];
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentLyric, setCurrentLyric] = useState(chorusLyrics[0]);
  const [typingComplete, setTypingComplete] = useState(false);
  const [audioPlayer] = useState(new Audio(FS));
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
    const lyricIndex = Math.floor(
      (currentTime / audioPlayer.duration) * chorusLyrics.length
    );

    if (lyricIndex !== currentLyricIndex) {
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
              <i>
                "Too young for rushing things, but too old for wasting time."
              </i>
            </p>
          </div>
        </div>
      </div>

      <div
        className="card-body items-center text-center mt-0"
        style={{ marginTop: -25 }}
      >
        <h2 className="card-title font-bold">Father and Son</h2>
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
