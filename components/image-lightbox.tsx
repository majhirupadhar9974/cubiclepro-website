"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
};

export default function ImageLightbox({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 70vw",
  caption = "Product Visual",
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, []);

  return (
    <>
      <figure className={`image-lightbox-trigger ${className}`}>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={`Open full image: ${alt}`}
        >
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
          <span>View full image ↗</span>
        </button>
        <figcaption>{caption}</figcaption>
      </figure>
      <dialog ref={dialogRef} className={`image-lightbox ${className.includes("variant-shape-image") ? "is-shape-reference" : ""}`} aria-label={`Full image: ${alt}`}>
        <button type="button" className="image-lightbox-close" onClick={() => dialogRef.current?.close()} aria-label="Close full image">×</button>
        <div>
          <Image src={src} alt={alt} fill sizes="100vw" />
        </div>
        <p>{caption}</p>
      </dialog>
    </>
  );
}
