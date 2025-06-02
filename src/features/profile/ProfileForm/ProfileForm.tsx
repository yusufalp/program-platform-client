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

  const [currentStep, setCurrentStep] = useState(0);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('profileData :>> ', profileData);

    try {
      const body = { ...profileData };

      const PROFILE_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/profile`;

      const url = `${PROFILE_SERVICE_URL}/create`;
      const options: RequestInit = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(url, options);
      console.log("response :>> ", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData :>> ", errorData);
        throw new Error(errorData.message || "Failed to submit Profile");
      }

      const result = await response.json();
      console.log("result :>> ", result);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <CurrentStepComponent data={profileData} setData={setProfileData} />

        {currentStep === steps.length - 1 ? (
          <div className="form-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setCurrentStep(0)}
            >
              Edit Profile
            </button>
            <button type="submit" className="button-primary">
              Submit Profile
            </button>
          </div>
        ) : (
          <div className="step-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button type="button" className="button-primary" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
