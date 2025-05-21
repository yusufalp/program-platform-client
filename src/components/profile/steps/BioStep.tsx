import type { Profile } from "../../../types/profile";

interface BioStepProps {
  data: Profile;
  setData: (value: Profile) => void;
}

export default function BioStep({ data, setData }: BioStepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Personal Information</h2>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          value={data.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
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
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={data.phoneNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
