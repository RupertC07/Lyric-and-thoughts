import React, { useEffect, useState } from "react";
import { LyricCard } from "../components/LyricCard";
import { NF } from "../components/404";
import { LyricCard2 } from "../components/LyricCard2";

export const Lyric = () => {
  // Get the search query from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const titlecode = searchParams.get("titlecode");

  const [card, setCard] = useState(<LyricCard />);

  useEffect(() => {
    // Define your logic for setting the card based on the titlecode
    if (titlecode && titlecode === "LTFS01") {
      setCard(<LyricCard />);
    } else if (titlecode && titlecode === "LTHK01") {
      setCard(<LyricCard2 />);
    } else {
      setCard(<NF />);
    }
  }, [titlecode]);

  return (
    <div className="flex justify-center items-center h-screen md:px-14 max-w-screen-4xl mx-auto">
      {card}
    </div>
  );
};
