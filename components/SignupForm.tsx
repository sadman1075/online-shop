/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import OtpModal from "./OtpModal";

/* ===== Custom Hook: localStorage state ===== */
function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [showOtp, setShowOtp] = useState(false);

  /* ===== Lifted State for All Steps ===== */
  const [fullName, setFullName] = useLocalStorage("fullName", "");
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [phone, setPhone] = useLocalStorage("phone", "");
  const [dob, setDob] = useLocalStorage("dob", "");
  const [gender, setGender] = useLocalStorage("gender", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [confirmPassword, setConfirmPassword] = useLocalStorage("confirmPassword", "");

  /* ===== Step Validation ===== */
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return fullName.trim() !== "" && userName.trim() !== "";
      case 2:
        return (
          email.trim() !== "" &&
          /\S+@\S+\.\S+/.test(email) &&
          phone.trim() !== "" &&
          /^\d{7,15}$/.test(phone)
        );
      case 3:
        return dob.trim() !== "" && gender.trim() !== "";
      case 4:
        return (
          password.trim() !== "" &&
          confirmPassword.trim() !== "" &&
          password === confirmPassword &&
          password.length >= 6
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      alert("Please fill all required fields correctly before proceeding.");
      return;
    }

    if (step === 4) {
      setShowOtp(true);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <>
      <div className=" w-full md:w-[500px] p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold  text-center mb-6 tracking-tight">
          Signup Form
        </h2>

        <Stepper step={step} />

        <div className="mt-6">
          {step === 1 && <NameStep fullName={fullName} setFullName={setFullName} userName={userName} setUserName={setUserName} />}
          {step === 2 && <ContactStep email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />}
          {step === 3 && <BirthStep dob={dob} setDob={setDob} gender={gender} setGender={setGender} />}
          {step === 4 && <SubmitStep password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />}
        </div>

        <div className="flex justify-between mt-6">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="bg-pink-500 dark:bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-40"
          >
            PREVIOUS
          </button>

          <button
            onClick={handleNext}
            className={`bg-pink-500 dark:bg-pink-500 text-white px-4 py-2 rounded ${
              !validateStep(step) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {step === 4 ? "SUBMIT" : "NEXT"}
          </button>
        </div>
      </div>

      <OtpModal open={showOtp} onClose={() => setShowOtp(false)} />
    </>
  );
}

/* ================= FORM STEPS ================= */

function NameStep({ fullName, setFullName, userName, setUserName }: any) {
  return (
    <>
      <label className="mt-2 text-sm font-medium ">
        Full Name
      </label>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="mb-3 mt-2 w-full px-4 py-3 text-sm  backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {fullName.trim() === "" && <p className="text-red-500 text-sm">Full Name is required</p>}

      <label className="mt-2 text-sm font-medium ">
        User Name
      </label>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mt-2 mb-3 w-full px-4 py-3 text-sm  backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {userName.trim() === "" && <p className="text-red-500 text-sm">Username is required</p>}
    </>
  );
}

function ContactStep({ email, setEmail, phone, setPhone }: any) {
  return (
    <>
      <h3 className="font-semibold mb-2">Contact Info:</h3>

      <label className="mt-2 text-sm font-medium ">
        Email
      </label>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 mt-2 w-full px-4 py-3 text-sm  backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {!/\S+@\S+\.\S+/.test(email) && <p className="text-red-500  text-sm">Enter a valid email</p>}

      <label className="mt-2 text-sm font-medium ">
        Phone Number
      </label>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mt-2 mb-3 w-full px-4 py-3 text-sm backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {!/^\d{7,15}$/.test(phone) && <p className="text-red-500 text-sm">Enter a valid phone number</p>}
    </>
  );
}

function BirthStep({ dob, setDob, gender, setGender }: any) {
  return (
    <>
      <label className="mt-2 text-sm font-medium ">
        Date of Birth
      </label>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="mt-2 mb-3 w-full px-4 py-3 text-sm  backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {dob.trim() === "" && <p className="text-red-500 text-sm">Date of Birth is required</p>}

      <label className="mt-2 text-sm font-medium ">
        Gender
      </label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="text-black dark:bg-black dark:text-white w-full px-4 py-3 text-sm   border border-gray-300 rounded-lg outline-none transition duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 appearance-none cursor-pointer"
      >
        <option className="text-black dark:text-white" value="">Select gender</option>
        <option className="text-black dark:text-white">Male</option>
        <option className="text-black dark:text-white">Female</option>
      </select>
      {gender.trim() === "" && <p className="text-red-500 text-sm">Gender is required</p>}
    </>
  );
}

function SubmitStep({ password, setPassword, confirmPassword, setConfirmPassword }: any) {
  return (
    <>
      <label className="mt-2 text-sm font-medium ">
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 mt-2 w-full px-4 py-3 text-sm  backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {password.length > 0 && password.length < 6 && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

      <label className="mt-2  text-sm font-medium ">
        Confirm Password
      </label>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-2 mb-3 w-full px-4 py-3 text-sm  backdrop-blur border border-gray-300 rounded-xl outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-100 placeholder-gray-400"
      />
      {confirmPassword && password !== confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}

      <div className="text-center mt-4">
        <h3 className="font-semibold text-lg">Confirm & Submit</h3>
        <p className="text-gray-500 mt-2">Click Submit to receive OTP</p>
      </div>
    </>
  );
}