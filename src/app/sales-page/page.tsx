"use client";
import { FaCaretDown, FaFile, FaHandshake, FaSeedling } from "react-icons/fa";
import "./sales-page.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SalesPage() {
  const [selected, setSelected] = useState<"yearly" | "monthly" | null>(
    "yearly"
  );

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const collapseRefs = useRef<HTMLDivElement[]>([]);
  const handleSelect = (which: "yearly" | "monthly") => setSelected(which);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleKey = (e: React.KeyboardEvent, which: "yearly" | "monthly") => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setSelected(which);
    }
  };

  const setCollapseRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    collapseRefs.current[i] = el;
    if (openIndex === i) {
      el.style.height = el.scrollHeight + "px";
    } else {
      el.style.height = "0px";
    }
  };

  const toggleAccordion = (i: number) => {
    const currentlyOpen = openIndex;
    if (currentlyOpen !== null && collapseRefs.current[currentlyOpen]) {
      const prevEl = collapseRefs.current[currentlyOpen];
      prevEl.style.height = "0px";
      prevEl.parentElement?.classList.remove("open");
    }

    if (currentlyOpen === i) {
      setOpenIndex(null);
      return;
    }

    const el = collapseRefs.current[i];
    if (el) {
      const h = el.scrollHeight;
      el.style.height = h + "px";
      el.parentElement?.classList.add("open");
    }

    setOpenIndex(i);
  };

  useEffect(() => {
    const onResize = () => {
      if (openIndex !== null && collapseRefs.current[openIndex]) {
        const el = collapseRefs.current[openIndex];
        el.style.height = el.scrollHeight + "px";
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openIndex]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-right">
      <div id="__next">
        <div className="wrapper wrapper__full">
          <div className="plan">
            <div className="plan__header--wrapper">
              <div className="plan__header">
                <div className="plan__title">
                  Get unlimited access to many amazing books to read
                </div>
                <div className="plan__sub--title">
                  Turn ordinary moments into amazing learning opportunities
                </div>
                <figure className="plan__img--mask">
                  <img className="pricing" src="/pricing-top.webp" alt="" />
                </figure>
              </div>
            </div>
            <div className="row">
              <div className="container">
                <div className="plan__features--wrapper">
                  <div className="plan__features">
                    <figure className="plan__features--icon">
                      <FaFile className="plan__features--icon svg" />
                    </figure>
                    <div className="plan__features--text">
                      <b>Key Ideas in a few minutes</b> with many books to read
                    </div>
                  </div>
                  <div className="plan__features">
                    <figure className="plan__features--icon">
                      <FaSeedling className="plan__features--icon svg" />
                    </figure>
                    <div className="plan__features--text">
                      <b>3 million</b> people growing with Summarist everyday
                    </div>
                  </div>
                  <div className="plan__features">
                    <figure className="plan__features--icon">
                      <FaHandshake className="plan__features--icon svg" />
                    </figure>
                    <div className="plan__features--text">
                      <b>Precise recommendations</b> collections curated by
                      experts
                    </div>
                  </div>
                </div>
                <div className="section__title">
                  Choose the plan that fits you
                </div>
                <div
                  className={`plan__card ${
                    selected === "yearly" ? "selected" : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected === "yearly"}
                  onClick={() => handleSelect("yearly")}
                  onKeyDown={(e) => handleKey(e, "yearly")}
                >
                  <div className="plan__card--circle"></div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">Premium Plus Yearly</div>
                    <div className="plan__card--price">$99.99/year</div>
                    <div className="plan__card--text">
                      7-day free trial included
                    </div>
                  </div>
                </div>
                <div className="plan__card--separator">
                  <div className="plan__separator">or</div>
                </div>
                <div
                  className={`plan__card ${
                    selected === "monthly" ? "selected" : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected === "monthly"}
                  onClick={() => handleSelect("monthly")}
                  onKeyDown={(e) => handleKey(e, "monthly")}
                >
                  <div className="plan__card--circle"></div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">Premium Monthly</div>
                    <div className="plan__card--price">$9.99/month</div>
                    <div className="plan__card--text">No trial included</div>
                  </div>
                </div>
                <div className="plan__card--cta">
                  <span className="btn--wrapper">
                    <button
                      className="btn"
                      disabled={loading}
                      onClick={() => {
                        setLoading(true);
                        const plan =
                          selected === "yearly" ? "yearly" : "monthly";
                        const price = selected === "yearly" ? "99.99" : "9.99";
                        setTimeout(() => {
                          router.push(`/payment?plan=${plan}&price=${price}`);
                        }, 500);
                      }}
                    >
                      {loading ? (
                        <FaSpinner className="spinner" />
                      ) : (
                        <>
                          Start your{" "}
                          {selected === "yearly"
                            ? "free 7-day trial"
                            : "first month"}
                        </>
                      )}
                    </button>
                  </span>
                  <div className="plan__disclaimer">
                    {selected === "yearly"
                      ? "Cancel your trial at any time before it ends, and you won't be charged."
                      : "30-day money back guarantee, no questions asked"}
                  </div>
                </div>
                <div className="faq__wrapper">
                  {[
                    {
                      q: "How does the free 7-day trial work?",
                      a: `Begin your complimentary 7-day trial with a Summarist
                         annual membership. You are under no obligation to
                         continue your subscription, and you will only be billed
                         when the trial period expires. With Premium access, you
                         can learn at your own pace and as frequently as you
                         desire, and you may terminate your subscription prior to
                         the conclusion of the 7-day free trial.`,
                    },
                    {
                      q: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
                      a: `While an annual plan is active, it is not feasible to
                         switch to a monthly plan. However, once the current
                         month ends, transitioning from a monthly plan to an
                         annual plan is an option.`,
                    },
                    {
                      q: "What's included in the Premium plan?",
                      a: `Premium membership provides you with the ultimate
                         Summarist experience, including unrestricted entry to
                         many best-selling books, high-quality audio, the ability
                         to download titles for offline reading, and the option
                         to send your reads to your Kindle.`,
                    },
                    {
                      q: "Can I cancel during my trial or subscription?",
                      a: `You will not be charged if you cancel your trial before
                         its conclusion. While you will not have complete access
                         to the entire Summarist library, you can still expand
                         your knowledge with one curated book per day.`,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`accordion__card ${
                        openIndex === i ? "open" : ""
                      }`}
                    >
                      <div
                        className="accordion__header"
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleAccordion(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleAccordion(i);
                          }
                        }}
                      >
                        <div className="accordion__title">{item.q}</div>
                        <FaCaretDown
                          className={`accordion__icon ${
                            openIndex === i ? "rotated" : ""
                          }`}
                        />
                      </div>

                      <div
                        className="collapse"
                        ref={(el) => {
                          if (el) setCollapseRef(el, i);
                        }}
                      >
                        <div className="accordion__body">{item.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="container">
                <div className="row">
                  <div className="footer__top--wrapper">
                    <div className="footer__block">
                      <div className="footer__link--title">Actions</div>
                      <div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Summarist Magazine</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Cancel Subscription</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Help</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Contact Us</a>
                        </div>
                      </div>
                    </div>
                    <div className="footer__block">
                      <div className="footer__link--title">Useful Links</div>
                      <div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Pricing</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Summarist Business</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Gift Cards</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Authors & Publishers</a>
                        </div>
                      </div>
                    </div>
                    <div className="footer__block">
                      <div className="footer__link--title">Company</div>
                      <div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">About</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Careers</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Partners</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Code of Conduct</a>
                        </div>
                      </div>
                    </div>
                    <div className="footer__block">
                      <div className="footer__link--title">Other</div>
                      <div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Sitemap</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Legal Notice</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Terms of Service</a>
                        </div>
                        <div className="footer__link--wrapper">
                          <a className="footer__link">Privacy Policies</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer__copyright--wrapper">
                    <div className="footer__copyright">
                      Copyright © 2025 Summarist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
