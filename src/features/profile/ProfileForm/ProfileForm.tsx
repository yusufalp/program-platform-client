import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Profile } from "../../../types/profile";

import AddressStep from "./steps/AddressStep";
import BioStep from "./steps/BioStep";
import LinksStep from "./steps/LinksStep";
import ReviewStep from "./steps/ReviewStep";

export default function ProfileForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Profile>({
    userId: user?._id || "", // Or some default value if applicable
    bio: "",
    dateOfBirth: "",
    phoneNumber: "",
    status: "active",
    cohort: 0,
    graduationDate: "",
    address: {},
    socials: {},
  });

  // const steps = [
  //   <AddressStep data={profileData} setData={setProfileData} />,
  //   <BioStep data={profileData} setData={setProfileData} />,
  //   <LinksStep data={profileData} setData={setProfileData} />,
  //   <ReviewStep data={profileData} />,
  // ];

  const steps = [
    { component: AddressStep, title: "Address" },
    { component: BioStep, title: "Bio" },
    { component: LinksStep, title: "Links" },
    { component: ReviewStep, title: "Review" },
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
    console.log(profileData);

    try {
      const body = { ...profileData, userId: user?._id };

      const url = import.meta.env.VITE_PROFILE_SERVICE_URL;
      const endpoint = "/create";

      const options: RequestInit = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(`${url}${endpoint}`, options);
      console.log("response :>> ", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData :>> ", errorData);
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      console.log("result :>> ", result);

      navigate(`/profile/${user?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        {currentStep === steps.length - 1 ? (
          <>
            <h2>Review</h2>
            <p>Please review your information below</p>
          </>
        ) : (
          <h2>Complete Your Profile</h2>
        )}

        <CurrentStepComponent data={profileData} setData={setProfileData} />

        {currentStep === steps.length - 1 ? (
          <div className="form-actions">
            <button type="button" onClick={() => setCurrentStep(0)}>
              Edit Profile
            </button>
            <button type="button" onClick={handleSubmit}>
              Submit Profile
            </button>
          </div>
        ) : (
          <div className="step-actions">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
