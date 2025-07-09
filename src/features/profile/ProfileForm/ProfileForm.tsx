import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Profile } from "../types/profile";

import AddressStep from "./steps/AddressStep";
import BioStep from "./steps/BioStep";
import LinksStep from "./steps/LinksStep";
import ReviewStep from "./steps/ReviewStep";

export default function ProfileForm() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [profileData, setProfileData] = useState<Profile>({
    userId: user?._id || "",
    bio: "",
    dateOfBirth: "",
    phoneNumber: "",
    status: "active",
    cohort: 0,
    graduationDate: "",
    address: {
      street: {
        line1: "",
        line2: "",
      },
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    socials: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { component: AddressStep, title: "Address" },
    { component: BioStep, title: "Biography" },
    { component: LinksStep, title: "Social Links" },
    { component: ReviewStep, title: "Review Profile" },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  if (!user?._id) {
    return <p>You must login to see your profile.</p>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const body = { ...profileData };

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = "/profile/create";

    const url = new URL(`${baseUrl}${endpoint}`);

    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit Profile");
      }

      navigate("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CurrentStepComponent data={profileData} setData={setProfileData} />

        {error && <p>{error}</p>}

        {currentStep === steps.length - 1 ? (
          <div className="form-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setCurrentStep(0)}
              disabled={loading}
            >
              Edit Profile
            </button>
            <button type="submit" className="button-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Profile"}
            </button>
          </div>
        ) : (
          <div className="step-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={prevStep}
              disabled={currentStep === 0 || loading}
            >
              Previous
            </button>
            <button
              type="button"
              className="button-primary"
              onClick={nextStep}
              disabled={loading}
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
