import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Profile } from "../types/profile";

import { getDefaultProfile } from "../../../lib/getDefaultProfile";

import AddressStep from "./steps/AddressStep";
import BioStep from "./steps/BioStep";
import LinksStep from "./steps/LinksStep";
import ReviewStep from "./steps/ReviewStep";

export default function ProfileForm() {
  const { user, token } = useAuth();

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const [confirmation, setConfirmation] = useState(false);

  const [profileData, setProfileData] = useState<Profile>(
    getDefaultProfile(user?._id)
  );
  const [formLoading, setFormLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?._id) {
      setFormLoading(false);
      return;
    }

    async function fetchProfile() {
      setFormLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL as string;
        const endpoint = `/profiles/user/${user?._id}`;
        const url = new URL(`${baseUrl}${endpoint}`);

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok && result.data?.profile) {
          setProfileData(result.data.profile);
        } else {
          setProfileData(getDefaultProfile(user?._id));
        }
      } catch {
        setProfileData(getDefaultProfile(user?._id));
      } finally {
        setFormLoading(false);
      }
    }

    fetchProfile();
  }, [token, user]);

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

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const body = { ...profileData };

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = "/profiles/create";

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

  if (formLoading || !profileData) return <p>Loading profile form...</p>;

  if (!user?._id) {
    return <p>You must login to see your profile.</p>;
  }

  return (
    <div>
      <form onSubmit={handleProfileSubmit}>
        <CurrentStepComponent
          data={profileData}
          setData={setProfileData}
          setIsStepValid={setIsStepValid}
        />

        {error && <p>{error}</p>}

        {currentStep === steps.length - 1 ? (
          <div className="form-actions">
            <label htmlFor="confirm">
              <input
                type="checkbox"
                name="confirm"
                id="confirm"
                onChange={() => setConfirmation(!confirmation)}
              />
              I've reviewed and confirmed the information provided.
            </label>

            <button
              type="button"
              className="button-secondary"
              onClick={() => setCurrentStep(0)}
              disabled={loading}
            >
              Edit
            </button>

            <button
              type="submit"
              className="button-primary"
              disabled={loading || !confirmation}
            >
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
              disabled={loading || !isStepValid}
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
