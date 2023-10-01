import { useParams } from "react-router-dom";
import { LyricCard } from "../components/LyricCard";
import { useEffect, useState } from "react";
import { NF } from "../components/404";

export const Lyric = () => {
  const { title } = useParams();
  const [card, setCard] = useState(<LyricCard />);

  useEffect(() => {
    if (title) {
      switch (title) {
        case "TakeItEasy":
          setCard(<LyricCard />);

          break;

        default:
          setCard(<NF />);
          break;
      }
    }
  }, [title]);

  return (
    <div className="flex justify-center items-center h-screen md:px-14 max-w-screen-4xl mx-auto">
      {card}
    </div>
  );
};
