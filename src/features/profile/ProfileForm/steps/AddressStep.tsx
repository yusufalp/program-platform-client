import type { StepProps } from "../../types/profile";

import { STATES } from "../../../../constants/states";
import { COUNTRIES } from "../../../../constants/countries";

export default function AddressStep({ data, setData }: StepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData((prevData) => {
      const newAddress = { ...prevData.address };

      if (name === "line1" || name === "line2") {
        newAddress.street = {
          ...newAddress.street,
          [name]: value,
        };
      } else {
        return {
          ...prevData,
          address: {
            ...newAddress,
            [name]: value,
          },
        };
      }

      return {
        ...prevData,
        address: newAddress,
      };
    });
  };

  return (
    <div>
      <h2>Address Information</h2>
      <div>
        <label htmlFor="line1">Street Line 1</label>
        <input
          type="text"
          name="line1"
          id="line1"
          value={data.address.street.line1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="line2">Street Line 2</label>
        <input
          type="text"
          name="line2"
          id="line2"
          value={data.address.street.line2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={data.address.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <select
          name="state"
          id="state"
          value={data.address.state}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a state
          </option>
          {STATES.map((state) => (
            <option key={state.abbreviation} value={state.name}>
              {state.abbreviation} - {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          value={data.address.postalCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          value={data.address.country}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country.alpha3} value={country.name}>
              {country.alpha3} - {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
