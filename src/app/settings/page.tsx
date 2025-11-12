"use client";
import "./settings.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout, setSubscription } from "@/lib/store/authSlice";
import MainBars from "@/components/main-bars/MainBars";
import { openModal } from "@/lib/store/modalSlice";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { uid, subscription, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!uid) {
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

  const handleUpgrade = () => {
    dispatch(setSubscription("premium"));
  };

  const handleDowngrade = () => {
    dispatch(setSubscription("basic"));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <MainBars />
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Account Settings</div>
          {/* <p>
            <strong>User ID:</strong> {uid}
          </p> */}
          <div className="setting__content">
            <div className="settings__sub--title">Your Subscription Plan</div>
            <div className="settings__text">{subscription}</div>
          </div>

          {subscription === "basic" ? (
            <div className="setting__content">
              <button
                className="btn settings__upgrade--btn"
                onClick={handleUpgrade}
              >
                Upgrade to Premium
              </button>
            </div>
          ) : (
            <div className="setting__content">
              <button className="btn btn--secondary" onClick={handleDowngrade}>
                Downgrade to Basic
              </button>
            </div>
          )}

          <div style={{ marginTop: "24px" }} className="setting__content">
            <div className="settings__sub--title">Email</div>
            <div className="settings__text">fake@email.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
