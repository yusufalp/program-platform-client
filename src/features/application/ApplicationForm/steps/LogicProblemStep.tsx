import type { StepProps } from "../../types/application";

export default function LogicProblemStep({ data, setData }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      logicProblem: {
        ...prevData.logicProblem,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h2>Logic Problem</h2>
      <p>
        Describe how you'd find a missing number from a sequence of 1 to 100,
        and demonstrate with 1 to 10 missing 7.
      </p>
      <div>
        <label>Steps:</label>
        <textarea
          name="explanation"
          rows={3}
          value={data.logicProblem.explanation}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Reasoning:</label>
        <textarea
          name="reasoning"
          rows={3}
          value={data.logicProblem.reasoning}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Example:</label>
        <textarea
          name="example"
          rows={3}
          value={data.logicProblem.example}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
