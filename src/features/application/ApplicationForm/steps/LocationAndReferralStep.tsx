import type { StepProps } from "../../types/application";

export default function LocationAndReferralStep({ data, setData }: StepProps) {
  const handleLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let newValue: boolean | string = value;

    if (name === "livesInBoston") {
      newValue = value === "yes";
    }

    setData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: newValue,
      },
    }));
  };

  const handleReferralSourceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((prevData) => ({
      ...prevData,
      referralSource: e.target.value,
    }));
  };

  return (
    <div>
      <h2>Location & Referral</h2>
      <div>
        <label>Do you live in Boston?</label>
        <select
          name="livesInBoston"
          value={data.location.livesInBoston ? "yes" : "no"}
          onChange={handleLocationChange}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div>
        <label>If yes, what neighborhood do you live in?</label>
        <input
          type="text"
          name="bostonNeighborhood"
          value={data.location.bostonNeighborhood}
          onChange={handleLocationChange}
          disabled={!data.location.livesInBoston}
          placeholder={data.location.livesInBoston ? "Select 'Yes' above" : ""}
        />
      </div>
      <div>
        <label>How did you hear about CodeSquad?</label>
        <input
          type="text"
          name="referralSource"
          value={data.referralSource}
          onChange={handleReferralSourceChange}
        />
      </div>
    </div>
  );
}
