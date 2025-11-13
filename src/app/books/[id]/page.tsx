import MainBars from "@/components/main-bars/MainBars";
import "./book.css";
import { Book } from "@/app/types";
import {
  FaBookmark,
  FaBookOpen,
  FaClock,
  FaLightbulb,
  FaMicrophone,
  FaStar,
} from "react-icons/fa";
import SomeButton from "@/components/Button";
import AddToLibraryButton from "@/components/AddToLibrary";
import Duration from "@/components/Duration";
import ClientMountDelay from "@/components/skeletons/ClientMountDelay";
import SkeletonBook from "@/components/skeletons/SkeletonBook";

export default async function BookPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  const book: Book = await res.json();
  const isPremium = Boolean(book?.subscriptionRequired);

  // 5bxl50cz4bt

  return (
    <div>
      <MainBars />
      <div className="row">
        <div className="container">
          <div className="inner__wrapper">
            <ClientMountDelay ms={350} fallback={<SkeletonBook />}>
              <div className="inner__book">
                <div className="premium">
                  <div className="inner-book__title">{book.title}</div>
                  {book.subscriptionRequired && (
                    <div className="inner-book__title">(Premium)</div>
                  )}
                </div>
                <div className="inner-book__author">{book.author}</div>
                <div className="inner-book__sub-title">{book.subTitle}</div>
                <div className="inner-book__wrapper">
                  <div className="inner-book__description--wrapper">
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaStar />
                      </div>
                      <div className="inner-book__overall--rating">
                        {book.averageRating}
                      </div>
                      <div className="inner-book__total--rating">
                        ({book.totalRating} Ratings)
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaClock />
                      </div>
                      <div className="inner-book__duration">
                        <Duration audioLink={book.audioLink} />
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaMicrophone />
                      </div>
                      <div className="inner-book__type">Audio & Text</div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaLightbulb />
                      </div>
                      <div className="inner-book__key--ideas">
                        {book.keyIdeas}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inner-book__read--btn-wrapper">
                  <SomeButton
                    icon={<FaBookOpen />}
                    bookId={book.id}
                    isBookPremium={isPremium}
                  />
                  <SomeButton
                    text="Listen"
                    icon={<FaMicrophone />}
                    bookId={book.id}
                    isBookPremium={isPremium}
                  />
                </div>
                <div className="inner-book__bookmark">
                  <div className="inner-book__bookmark--icon"></div>
                  <FaBookmark />
                  <AddToLibraryButton
                    book={{
                      id: book.id,
                      title: book.title,
                      author: book.author,
                      imageLink: book.imageLink,
                      subscriptionRequired: book.subscriptionRequired,
                    }}
                  />
                </div>
                <div className="inner-book__secondary--title">
                  What's it about?
                </div>
                <div className="inner-book__tags--wrapper">
                  <div className="inner-book__tag">{book.tags[0]}</div>
                  <div className="inner-book__tag">{book.tags[1]}</div>
                </div>
                <div className="inner-book__book--description">
                  {book.bookDescription}
                </div>
                <h2 className="inner-book__secondary--title">
                  About the Author
                </h2>
                <div className="inner-book__author--description">
                  {book.authorDescription}
                </div>
              </div>
              <div className="inner-book--img-wrapper">
                <figure className="book__image--wrapper">
                  <img
                    className="book__image"
                    src={book.imageLink}
                    alt="Book Cover"
                  />
                </figure>
              </div>
            </ClientMountDelay>
          </div>
        </div>
      </div>
    </div>
  );
}
