export interface Profile {
  _id?: string;
  userId: string;
  bio: string;
  dateOfBirth: string;
  phoneNumber: string;
  status: "active" | "inactive" | "graduated";
  cohort: number;
  graduationDate: string;

  address: {
    street: {
      line1: string;
      line2?: string;
    };
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  socials?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface StepProps {
  data: Profile;
  setData?: React.Dispatch<React.SetStateAction<Profile>>;
  setIsStepValid?: (valid: boolean) => void;
}
