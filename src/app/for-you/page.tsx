import MainBars from "@/components/main-bars/MainBars";
import "./for-you.css";
import { FaCirclePlay } from "react-icons/fa6";
import { Book } from "@/app/types";
import Wheel from "@/components/wheel/Wheel";
import Duration from "@/components/Duration";
import SkeletonSelectedBook from "@/components/skeletons/SkeletonSelectedBook";
import SkeletonWheel from "@/components/skeletons/SkeletonWheel";
import ClientMountDelay from "@/components/skeletons/ClientMountDelay";

export default async function ForYou() {
  const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
      {
        next: { revalidate: 60 },
      }
    ),
    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
      { next: { revalidate: 60 } }
    ),
    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
      { next: { revalidate: 60 } }
    ),
  ]);

  const [selectedBooks, recommendedBooks, suggestedBooks]: [
    Book[],
    Book[],
    Book[]
  ] = await Promise.all([
    selectedRes.json(),
    recommendedRes.json(),
    suggestedRes.json(),
  ]);

  const showSkeletons = false;

  return (
    <div>
      <MainBars />
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected Just For You</div>
            <ul>
              <ClientMountDelay
                ms={350}
                fallback={
                  <>
                    <SkeletonSelectedBook />
                  </>
                }
              >
                {selectedBooks.map((book) => (
                  <li key={book.id} className="selected__book">
                    <div className="selected__book--sub-title">
                      {book.subTitle}
                    </div>
                    <div className="selected__book--line"></div>
                    <div className="selected__book--content">
                      <figure className="book__image--wrapper">
                        <img
                          className="book__image"
                          src={book.imageLink}
                          alt=""
                        />
                      </figure>
                      <div className="selected__book--text">
                        <div className="selected__book--title">
                          {book.title}
                        </div>
                        <div className="selected__book--author">
                          {book.author}
                        </div>
                        <div className="selected__book--duration-wrapper">
                          <div className="selected__book--icon">
                            <FaCirclePlay />
                          </div>
                          <div className="selected__book--duration">
                            <Duration audioLink={book.audioLink} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ClientMountDelay>
            </ul>
            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you'll like these
              </div>
              <ClientMountDelay ms={350} fallback={<SkeletonWheel />}>
                <Wheel books={recommendedBooks} />
              </ClientMountDelay>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse these books</div>
              <ClientMountDelay ms={350} fallback={<SkeletonWheel />}>
                <Wheel books={suggestedBooks} />
              </ClientMountDelay>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
