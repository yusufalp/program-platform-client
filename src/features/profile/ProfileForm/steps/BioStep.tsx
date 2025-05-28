import type { StepProps } from "../../types/profile";

export default function BioStep({ data, setData }: StepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Get today's date in YYYY-MM-DD format for the max attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h3>Personal Information</h3>
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
        <label htmlFor="dateOfBirth">Date of Birth</label>
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
        <label htmlFor="phoneNumber">Phone Number</label>
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
