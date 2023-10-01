import React, { useEffect, useState } from "react";
import { LyricCard } from "../components/LyricCard";
import { NF } from "../components/404";

export const Lyric = () => {
  // Get the search query from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const title = searchParams.get("title");

  const [card, setCard] = useState(<LyricCard />);

  useEffect(() => {
    // Define your logic for setting the card based on the title
    if (title && title === "TakeItEasy") {
      setCard(<LyricCard />);
    } else {
      setCard(<LyricCard />);
    }
  }, [title]);

  return (
    <div className="flex justify-center items-center h-screen md:px-14 max-w-screen-4xl mx-auto">
      {card}
    </div>
  );
};
