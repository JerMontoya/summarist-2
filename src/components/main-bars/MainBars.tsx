"use client";
import { FaBars, FaBookmark, FaHighlighter, FaSearch } from "react-icons/fa";
import "./MainBars.css";
import {
  FaCircleQuestion,
  FaGear,
  FaHouse,
  FaRightToBracket,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import LogoutButton from "../LogoutButton";

export default function MainBars() {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedQuery}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery]);

  useEffect(() => {
    setIsMounted(true);
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const ariaHidden = isMounted ? !open && isMobile : false;

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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="search__icon">
                  <FaSearch className="fasearch" />
                </div>
              </div>

              {query && (
                <div className="search__results">
                  {loading && <div>Loading...</div>}
                  {!loading && results.length === 0 && (
                    <div>No results found</div>
                  )}
                  {!loading &&
                    results.map((book: any, idx) => (
                      <div key={idx} className="search__result">
                        <div className="audio__track--wrapper">
                          <figure className="audio__track--image-mask">
                            <figure className="book__image--wrapper-audio">
                              <img
                                className="book__image-audio"
                                src={book.imageLink}
                                alt={book.title}
                              />
                            </figure>
                          </figure>
                          <div className="audio__track--details-wrapper">
                            <div className="audio__track--title">
                              {book.title}
                            </div>
                            <div className="audio__track--author">
                              {book.author}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className="mobile-menu-btn"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((s) => !s)}
        type="button"
      >
        {open ? "" : <FaBars />}
      </button>

      <div
        className={`sidebar__overlay ${open ? "is-visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`sidebar ${open ? "sidebar--opened" : ""}`}
        aria-hidden={ariaHidden}
      >
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
                <div className="sidebar__link--text">My Library</div>
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
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
