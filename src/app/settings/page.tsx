"use client";
import "./settings.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setSubscription } from "@/lib/store/authSlice";
import MainBars from "@/components/main-bars/MainBars";
import { openModal } from "@/lib/store/modalSlice";
import Link from "next/link";
import ClientMountDelay from "@/components/skeletons/ClientMountDelay";
import SkeletonSettings from "@/components/skeletons/SkeletonSettings";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { uid, subscription } = useSelector((state: RootState) => state.auth);

  if (uid === undefined) {
    return (
      <div className="row">
        <MainBars />
        <div className="section__title page__title">Account Settings</div>
        <ClientMountDelay ms={350} fallback={<SkeletonSettings />}>
        <></></ClientMountDelay>
      </div>
    );
  }

  if (uid === null) {
    return (
      <div>
        <MainBars />
        <div className="container">
          <div className="row">
            <div className="section__title page__title">Account Settings</div>
            <div className="settings__login--wrapper">
              <img className="img" src="/not-logged-in.webp" alt="" />
              <div className="settings__login--text">
                Log in to view your settings.
              </div>
              <button
                onClick={() => dispatch(openModal())}
                className="btn settings__login--btn"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDowngrade = () => {
    dispatch(setSubscription("basic"));
  };

  return (
    <div>
      <MainBars />
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Account Settings</div>
          <ClientMountDelay ms={350} fallback={<SkeletonSettings />}>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription Plan</div>
              <div className="settings__text">{subscription}</div>
            </div>

            {subscription === "basic" ? (
              <div className="setting__content">
                <Link
                  className="btn settings__upgrade--btn"
                  href="./sales-page"
                >
                  Upgrade to Premium
                </Link>
              </div>
            ) : (
              <div className="setting__content">
                <button
                  className="btn btn--secondary settings__login--btn"
                  onClick={handleDowngrade}
                >
                  Downgrade to Basic
                </button>
              </div>
            )}

            <div style={{ marginTop: "24px" }} className="setting__content">
              <div className="settings__sub--title">Email</div>
              <div className="settings__text">fake@email.com</div>
            </div>
          </ClientMountDelay>
        </div>
      </div>
    </div>
  );
}
