import { useState } from "react";

import AddressStep from "./steps/AddressStep";
import BioStep from "./steps/BioStep";
import LinksStep from "./steps/LinksStep";

import type { Profile } from "../../types/profile";
import ReviewStep from "./steps/ReviewStep";

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Profile>({
    userId: "", // Or some default value if applicable
    bio: "",
    dateOfBirth: "",
    phoneNumber: "",
    status: "active",
    cohort: 0,
    graduationDate: "",
    address: {},
    socials: {},
  });

  const steps = [
    <AddressStep data={profileData} setData={setProfileData} />,
    <BioStep data={profileData} setData={setProfileData} />,
    <LinksStep data={profileData} setData={setProfileData} />,
    <ReviewStep data={profileData} />,
  ];

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

  console.log("currentStep :>> ", currentStep);
  console.log("profileData :>> ", profileData);

  return (
    <div>
      <form>
        <div>{steps[currentStep]}</div>
        {currentStep === steps.length - 1 && (
          <div className="navigation">
            <button onClick={() => setCurrentStep(0)}>Edit</button>
            <button className="submit-button">Submit</button>
          </div>
        )}
      </form>
      {currentStep !== steps.length - 1 && (
        <div className="navigation">
          <button onClick={prevStep} disabled={currentStep === 0}>
            Previous Step
          </button>
          <button onClick={nextStep}>Next Step</button>
        </div>
      )}
    </div>
  );
}
