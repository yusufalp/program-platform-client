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
  const { user, token } = useAuth();
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  ] as const;

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

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const body = { ...applicationData };

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = "/applications/create";

    const url = new URL(`${baseUrl}${endpoint}`);

    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong");
        throw new Error(result.message || "Something went wrong");
      }

      navigate("/application");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleApplicationSubmit}>
        <CurrentStepComponent
          data={applicationData}
          setData={setApplicationData}
        />

        {error && <p>{error}</p>}

        {currentStep === steps.length - 1 ? (
          <div className="form-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setCurrentStep(0)}
              disabled={loading}
            >
              Edit Application
            </button>
            <button type="submit" className="button-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
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
              disabled={currentStep === steps.length - 1 || loading}
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
