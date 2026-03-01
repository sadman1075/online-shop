"use client";

import { motion, AnimatePresence } from "framer-motion";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface OtpModalProps {
    open: boolean;
    onClose: () => void;
}

export default function OtpModal({ open, onClose }: OtpModalProps) {
    const [stage, setStage] = useState(1);
    const [otp, setOtp] = useState("");

    const handleVerify = () => {
        if (otp === "1234") {
            onClose();
            toast.success("OTP verified successfully!");
            redirect("/products");
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white w-[320px] p-6 rounded-xl"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                    >
                        {stage === 1 ? (
                            <>
                                <h3 className="text-lg font-bold mb-4 dark:text-black">
                                    Where should we send the OTP?
                                </h3>

                                {["Email", "SMS", "WhatsApp"].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setStage(2)}
                                        className="w-full border p-2 mb-2 rounded text-black dark:bg-black dark:text-white hover:bg-gray-100"
                                    >
                                        {method}
                                    </button>
                                ))}
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg dark:text-black text-center font-bold mb-4">
                                    Enter OTP
                                </h3>

                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={4}
                             
                                    className="border w-full p-2 text-center rounded dark:bg-black"
                                />

                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Use OTP: <b>1234</b>
                                </p>

                                <div className="mt-3 flex  justify-center">
                                    <button
                                        onClick={handleVerify}
                                        className="bg-pink-500 text-white px-4 py-2 rounded"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}