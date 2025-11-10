"use client";

import "./LoginModal.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation"
import Link from "next/link";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
    const router = useRouter();

  const handleClose = () => {
    onClose();
  };
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const firebaseErrorMessage = (code: string | undefined) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found for that email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already registered. Try signing in.";
      case "auth/invalid-email":
        return "That email isn't valid. Check and try again.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      default:
        return "Authentication error. Please try again.";
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signIn") {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/for-you");
      } else {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email,
          createdAt: serverTimestamp(),
        });
        router.push("/for-you");
      }

      // Reset form and close modal
      setEmail("");
      setPassword("");
      setLoading(false);
      onClose()
    } catch (err: any) {
      setLoading(false);
      const code = err?.code;
      setError(firebaseErrorMessage(code));
      console.error("Auth error:", err);
    }
  };

  const onInputChange =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error) setError(null);
      setter(e.target.value);
    };
  const switchMode = (m: "signIn" | "signUp") => {
    setMode(m);
    setError(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={() => onClose()} className="modal-close">
          ✕
        </button>
        {/* SIGN IN TOGGLE */}
        {mode === "signUp" && (
          <>
            <h2 className="modal-title">Sign up to Summarist</h2>

            <form className="modal-form" onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onInputChange(setEmail)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={onInputChange(setPassword)}
                required
              />
              {error && <div className="auth-error">{error}</div>}

              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Sign up"}
              </button>
            </form>

            <button
              className="switch"
              onClick={() => switchMode("signIn")}
              type="button"
            >
              Already have an account?
            </button>
          </>
        )}
        {/* LOG IN TOGGLE: */}
        {mode === "signIn" && (
          <>
            <h2 className="modal-title">Log in to Summarist</h2>

            <Link href="/for-you" className="guest-login" onClick={() => onClose()}>
              <FaUser className="fauser" />
              <div>Login as a Guest</div>
            </Link>

            <div className="auth-separator">
              <span className="auth-separator-text">or</span>
            </div>

            <form className="modal-form" onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onInputChange(setEmail)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={onInputChange(setPassword)}
                required
              />

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <button
              className="switch"
              onClick={() => switchMode("signUp")}
              type="button"
            >
              Don't have an account?
            </button>
          </>
        )}
      </div>
    </div>
  );
}
