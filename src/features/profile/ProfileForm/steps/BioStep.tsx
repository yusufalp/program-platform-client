import { useEffect } from "react";

import { today } from "../../../../lib/getToday";
import type { StepProps } from "../../types/profile";

import RequiredFieldsNote from "../../../../common/components/RequiredFieldsNote";
import Required from "../../../../common/components/Required";

export default function BioStep({ data, setData, setIsStepValid }: StepProps) {
  useEffect(() => {
    const valid = !!(data.dateOfBirth && data.phoneNumber);

    setIsStepValid(valid);
  }, [data, setIsStepValid]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Personal Information</h2>

      <RequiredFieldsNote />

      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          value={data.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          rows={5}
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth">
          Date of Birth <Required />
        </label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          max={today}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">
          Phone Number <Required />
        </label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          // A more robust pattern might be: ^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="e.g., 123-456-7890"
          value={data.phoneNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
