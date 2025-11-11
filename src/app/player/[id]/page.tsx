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
        {/* <div className="audio__wrapper">
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure className="book__image--wrapper">
                <img className="book__image" src={book.imageLink} alt="" />
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">{book.title}</div>
              <div className="audio__track--author">{book.author}</div>
            </div>
          </div>
          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button className="audio__controls--btn"><FaRotateLeft /></button>
              <button className="audio__controls--btn audio__controls--btn-play"><FaCirclePlay /></button>
              <button className="audio__controls--btn"><FaRotateRight /></button>
            </div>
          </div>
          <div className="audio__progress--wrapper">
            <div className="audio__time"></div>
            <input type="range" className="audio__progress--bar" value="0" />
            <div className="audio__time"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
