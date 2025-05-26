import type { Profile } from "../../../../types/profile";

interface LinksStepProps {
  data: Profile;
  setData: (value: Profile) => void;
}

export default function LinksStep({ data, setData }: LinksStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      socials: {
        ...data.socials,
        [name]: value,
      },
    });
  };

  return (
    <div>
      <h3>Social Media Information</h3>
      <div>
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          id="linkedin"
          value={data.socials?.linkedin}
          onChange={handleChange}
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
        />
      </div>
    </div>
  );
}
