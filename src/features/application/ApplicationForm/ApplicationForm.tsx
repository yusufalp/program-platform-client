import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Application } from "../types/application";

import LocationAndReferralStep from "./steps/LocationAndReferralStep";
import IncomeAndCircumstancesStep from "./steps/IncomeAndCircumstancesStep";
import EducationStep from "./steps/EducationStep";
import PersonalStatementStep from "./steps/PersonalStatementStep";
import LogicProblemStep from "./steps/LogicProblemStep";
import ReviewStep from "./steps/ReviewStep";

export default function ApplicationForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [applicationData, setApplicationData] = useState<Application>({
    userId: user?._id || "",
    status: "draft",
    location: {
      livesInBoston: false,
      bostonNeighborhood: "",
    },
    referralSource: "",
    personalStatement: {
      content: "",
      usesAI: false,
    },
    logicProblem: {
      explanation: "",
      reasoning: "",
      example: "",
    },
    incomeAndCircumstances: {
      householdSize: 0,
      annualIncome: 0,
      receivesGovernmentAssistance: false,
      isHomelessOrNearHomeless: false,
      authorizedToWorkInUS: false,
    },

    optionalSection: {
      underrepresentedInTech: false,
      underrepresentedDetails: "",
      hasCORI: false,
    },

    educationAndExperience: {
      educationalBackground: "",
      priorTechExperience: "",
    },

    comments: "",
  });

  const steps = [
    { component: LocationAndReferralStep, title: "Location and Referral" },
    {
      component: IncomeAndCircumstancesStep,
      title: "Income and Circumstances",
    },
    { component: EducationStep, title: "Education" },
    { component: LogicProblemStep, title: "Logic Problem" },
    { component: PersonalStatementStep, title: "Personal Statement" },
    { component: ReviewStep, title: "Review Application" },
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
    console.log("applicationData :>> ", applicationData);

    try {
      const body = { ...applicationData };

      const APPLICATION_SERVICE_URL = `${
        import.meta.env.VITE_BASE_URL
      }/application`;

      const url = `${APPLICATION_SERVICE_URL}/create`;
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
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      console.log("result :>> ", result);

      navigate("/application");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CurrentStepComponent
          data={applicationData}
          setData={setApplicationData}
        />

        {currentStep === steps.length - 1 ? (
          <div className="form-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setCurrentStep(0)}
            >
              Edit Application
            </button>
            <button type="button" className="button-primary">
              Submit Application
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
