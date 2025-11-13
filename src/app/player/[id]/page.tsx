import MainBars from "@/components/main-bars/MainBars";
import "./player.css";
import { Book } from "@/app/types";
import AudioPlayer from "@/components/AudioPlayer";
import SummaryWithFontSize from "@/components/SummaryWithFontSize";
import ClientMountDelay from "@/components/skeletons/ClientMountDelay";
import Spinner from "@/components/skeletons/Spinner";
import { FaSpinner } from "react-icons/fa";

interface PlayerProps {
  params: { id: string };
}

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
      <ClientMountDelay ms={350} fallback={<Spinner />}>
        <div className="summary">
          <div className="audio__book--summary">
            <div className="audio__book--summary-title">{book.title}</div>
            <div className="audio__book--summary-text">
              <SummaryWithFontSize summary={book.summary} />
            </div>
          </div>
          <AudioPlayer
            audioLink={book.audioLink}
            title={book.title}
            author={book.author}
            imageLink={book.imageLink}
          />
        </div>
      </ClientMountDelay>
    </div>
  );
}
