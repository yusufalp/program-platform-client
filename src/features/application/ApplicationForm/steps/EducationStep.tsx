import type { StepProps } from "../../types/application";

export default function EducationStep({ data, setData }: StepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      educationAndExperience: {
        ...prevData.educationAndExperience,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h2>Education & Experience</h2>
      <div>
        <label>
          What is your educational background? List any school or training
          received, please.
        </label>
        <input
          name="educationalBackground"
          type="text"
          value={data.educationAndExperience.educationalBackground}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Do you have any prior experience in tech or coding? If yes, please
          explain.
        </label>
        <textarea
          name="priorTechExperience"
          rows={4}
          value={data.educationAndExperience.priorTechExperience}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
