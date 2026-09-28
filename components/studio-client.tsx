"use client";
import dynamic from "next/dynamic";
const Studio = dynamic(() => import("./studio-loaded"), { ssr: false, loading: () => <p style={{ padding: 24 }}>Loading the content studio…</p> });
export default function StudioClient() { return <Studio />; }
