export interface Application {
  _id?: string;
  userId: string;
  status: string;
  location: {
    livesInBoston: boolean;
    bostonNeighborhood: string;
  };

  referralSource: string;

  personalStatement: {
    content: string;
    usesAI: boolean;
  };

  logicProblem: {
    explanation: string;
    reasoning: string;
    example: string;
  };

  incomeAndCircumstances: {
    householdSize: number;
    annualIncome: number;
    receivesGovernmentAssistance: boolean;
    isHomelessOrNearHomeless: boolean;
    authorizedToWorkInUS: boolean;
  };

  optionalSection: {
    underrepresentedInTech: boolean;
    underrepresentedDetails: string;
    hasCORI: boolean;
  };

  educationAndExperience: {
    educationalBackground: string;
    priorTechExperience: string;
  };

  comments: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface StepProps {
  data: Application;
  setData: React.Dispatch<React.SetStateAction<Application>>;
}
