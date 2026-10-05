"use client";

import { useState } from "react";
import { useCurrentUser, useSource } from "sanity";
import styles from "./admin-account.module.css";

export default function AdminAccount() {
  const currentUser = useCurrentUser();
  const source = useSource();
  const [confirming, setConfirming] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    if (!source.auth.logout) {
      setError(
        "Logout is temporarily unavailable. Open Sanity account settings and sign out there.",
      );
      return;
    }

    setLoggingOut(true);
    setError("");
    try {
      await source.auth.logout();
      window.location.assign("/admin/");
    } catch {
      setError("Logout could not be completed. Please try again.");
      setLoggingOut(false);
    }
  };

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-labelledby="account-title">
        <p className={styles.eyebrow}>CubiclePro Admin</p>
        <h1 id="account-title">Account &amp; security</h1>
        <p className={styles.intro}>
          Review the signed-in administrator and securely end this dashboard
          session.
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Signed in as</dt>
            <dd>{currentUser?.name || "CubiclePro administrator"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{currentUser?.email || "Available in Sanity account settings"}</dd>
          </div>
          <div>
            <dt>Two-factor authentication</dt>
            <dd>Required through the connected identity provider</dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <a href="/admin/dashboard">Back to dashboard</a>
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noreferrer"
          >
            Open account settings ↗
          </a>
          {!confirming ? (
            <button
              className={styles.logoutButton}
              type="button"
              onClick={() => setConfirming(true)}
            >
              Log out
            </button>
          ) : null}
        </div>

        {confirming ? (
          <div
            className={styles.confirmation}
            role="alertdialog"
            aria-labelledby="logout-title"
            aria-describedby="logout-copy"
          >
            <div>
              <strong id="logout-title">Log out of CubiclePro Admin?</strong>
              <p id="logout-copy">Unsaved edits in open documents may be lost.</p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                disabled={loggingOut}
              >
                Cancel
              </button>
              <button
                className={styles.logoutButton}
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out…" : "Confirm log out"}
              </button>
            </div>
          </div>
        ) : null}

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </section>
    </main>
  );
}
