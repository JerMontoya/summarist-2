import MainBars from "@/components/main-bars/MainBars";
import "./player.css"
import { Book } from "@/app/types";
import { FaCirclePlay, FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import AudioPlayer from "@/components/AudioPlayer";


export default async function Player({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  const book: Book = await res.json();
  return (
    <div>
      <MainBars />
      <div className="summary">
        <div className="audio__book--summary">
          <div className="audio__book--summary-title">{book.title}</div>
          <div className="audio__book--summary-text">{book.summary}</div>
        </div>
        <AudioPlayer
          audioLink={book.audioLink}
          title={book.title}
          author={book.author}
          imageLink={book.imageLink}
        />
      
      </div>
    </div>
  );
}
