import type { StepProps } from "../../types/application";

export default function PersonalStatementStep({ data, setData }: StepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const target = e.target;
    const { name } = target;

    let newValue: string | boolean;

    if (target.type === "checkbox") {
      newValue = (target as HTMLInputElement).checked;
    } else {
      newValue = target.value;
    }

    setData((prevData) => ({
      ...prevData,
      personalStatement: {
        ...prevData.personalStatement,
        [name]: newValue,
      },
    }));
  };

  return (
    <div>
      <h2>Personal Statement</h2>
      <div>
        <label>
          Please tell us about yourself (1,500–2,000 characters). Include your
          goals, why they matter, how CodeSquad helps, and any steps you've
          taken toward tech.
        </label>
        <textarea
          name="content"
          rows={10}
          value={data.personalStatement.content}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="usesAI"
            checked={data.personalStatement.usesAI}
            onChange={handleChange}
          />
          I confirm this personal statement is my original work and does not
          contain AI-generated text.
        </label>
      </div>
    </div>
  );
}
