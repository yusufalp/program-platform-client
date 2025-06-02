import type { StepProps } from "../../types/profile";

export default function LinksStep({ data, setData }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      socials: {
        ...prevData.socials,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h2>Social Media Information</h2>
      <div>
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          id="linkedin"
          value={data.socials?.linkedin}
          onChange={handleChange}
          placeholder="e.g., https://linkedin.com/in/yourprofile"
        />
      </div>
      <div>
        <label htmlFor="github">GitHub</label>
        <input
          type="url"
          name="github"
          id="github"
          value={data.socials?.github}
          onChange={handleChange}
          placeholder="e.g., https://github.com/yourusername"
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          type="url"
          name="website"
          id="website"
          value={data.socials?.website}
          onChange={handleChange}
          placeholder="e.g., https://www.yourwebsite.com"
        />
      </div>
    </div>
  );
}
