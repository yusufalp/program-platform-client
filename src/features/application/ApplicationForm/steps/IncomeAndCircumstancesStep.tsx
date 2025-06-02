import type { StepProps } from "../../types/application";

export default function IncomeAndCircumstancesStep({
  data,
  setData,
}: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value, type, checked } = target;

    setData((prevData) => ({
      ...prevData,
      incomeAndCircumstances: {
        ...prevData.incomeAndCircumstances,
        [name]: type === "checkbox" ? checked : Number(value),
      },
    }));
  };

  return (
    <div>
      <h2>Income & Special Circumstances</h2>
      <div>
        <label>How many people live in your household?</label>
        <input
          name="householdSize"
          type="number"
          value={data.incomeAndCircumstances.householdSize ?? ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>What is your household's annual income?</label>
        <input
          name="annualIncome"
          type="number"
          value={data.incomeAndCircumstances.annualIncome ?? ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            name="receivesGovernmentAssistance"
            type="checkbox"
            checked={data.incomeAndCircumstances.receivesGovernmentAssistance}
            onChange={handleChange}
          />
          Receive government assistance?
        </label>
      </div>
      <div>
        <label>
          <input
            name="isHomelessOrNearHomeless"
            type="checkbox"
            checked={data.incomeAndCircumstances.isHomelessOrNearHomeless}
            onChange={handleChange}
          />
          Homeless or at risk of homelessness?
        </label>
      </div>
      <div>
        <label>
          <input
            name="authorizedToWorkInUS"
            type="checkbox"
            checked={data.incomeAndCircumstances.authorizedToWorkInUS}
            onChange={handleChange}
          />
          Legally authorized to work in the US?
        </label>
      </div>
    </div>
  );
}
