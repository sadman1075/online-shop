"use client";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function AosWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    return <>{children}</>;
}