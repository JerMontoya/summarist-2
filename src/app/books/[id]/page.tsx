import MainBars from "@/components/main-bars/MainBars";
import "./book.css";
import { Book } from "@/app/types";


export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );

//   const book: Book | null = (await res.text()) ? JSON.parse(await res.text()) : null;

  const book: Book = await res.json();
  
  return (
    <div>
      <MainBars />
      <div className="row">
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner-book--img-wrapper">
              <figure className="book__image--wrapper">
                <img className="book__image" src="" alt="" />
              </figure>
            </div>
            <div className="inner__book">
              <div className="inner-book__title">{book.title}</div>
              <div className="inner-book__author"></div>
              <div className="inner-book__sub-title"></div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                    <div className="inner-book__icon"></div>
                    <div className="inner-book__overall--rating"></div>
                    <div className="inner-book__total--rating"></div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"></div>
                    <div className="inner-book__duration"></div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"></div>
                    <div className="inner-book__type">Audio & Text</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"></div>
                    <div className="inner-book__key--ideas"></div>
                  </div>
                </div>
              </div>
              <div className="inner-book__read--btn-wrapper">
                <button className="inner-book__read--btn">
                    <div className="inner-book__read--icon"></div>
                    <div className="inner-book__read--text">Read</div>
                </button>
                <button className="inner-book__read--btn">
                    <div className="inner-book__read--icon"></div>
                    <div className="inner-book__read--text">Listen</div>
                </button>
              </div>
              <div className="inner-book__bookmark">
                <div className="inner-book__bookmark--icon">

                </div>
                <div className="inner-book__bookmark--text">Saved in My Library</div>
              </div>
              <div className="inner-book__secondary--title">What's it about?</div>
              <div className="inner-book__tags--wrapper"> 
                <div className="inner-book__tag"></div>
                <div className="inner-book__tag"></div>
              </div>
              <div className="inner-book__book--description"></div>
              <h2 className="inner-book__secondary--title"></h2>
              <div className="inner-book__author--description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
