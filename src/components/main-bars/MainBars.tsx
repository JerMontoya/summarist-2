import { FaBookmark, FaHighlighter, FaSearch } from "react-icons/fa";
import "./MainBars.css";
import { FaCircleQuestion, FaGear, FaHouse, FaRightToBracket } from "react-icons/fa6";

export default function MainBars() {
  return (
    <div>
      <div className="search__background">
        <div className="search__wrapper">
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search for books"
                />
                <div className="search__icon">
                  <FaSearch className="fasearch" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__overlay"></div>
      <div className="sidebar sidebar--opened">
        <div className="sidebar__logo">
          <img className="logo__img" src="/logo.png" alt="" />
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <a className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__link--line active--tab"></div>
              <div className="sidebar__icon--wrapper">
                <FaHouse className="img" />
              </div>
              <div className="sidebar__link--text">For You</div>
            </a>

            <a className="sidebar__link--wrapper" href="/library">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaBookmark className="img" />
              </div>
              <div className="sidebar__link--text">Library</div>
            </a>

            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaHighlighter className="img" />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>

            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaSearch className="img" />
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>

          <div className="sidebar__bottom">
            <a className="sidebar__link--wrapper" href="/settings">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaGear className="img" />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </a>

            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaCircleQuestion className="img" />
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>

            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaRightToBracket className="img" />
              </div>
              <div className="sidebar__link--text">Login</div>
            </div>

          </div>
        </div>
      </div>
      {/* <div className="row"></div> */}
    </div>
  );
}
