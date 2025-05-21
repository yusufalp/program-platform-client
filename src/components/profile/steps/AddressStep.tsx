import type React from "react";

import type { Profile } from "../../../types/profile";
import { STATES } from "../../../constants/states";
import { COUNTRIES } from "../../../constants/countries";

interface AddressStepProps {
  data: Profile;
  setData: (value: Profile) => void;
}

export default function AddressStep({ data, setData }: AddressStepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData({
      ...data,
      address: {
        ...data.address,
        ...(name === "line1" || name === "line2"
          ? {
              street: {
                ...data.address?.street,
                [name]: value,
              },
            }
          : { [name]: value }),
      },
    });
  };

  return (
    <div>
      <h2>Address</h2>
      <div>
        <label htmlFor="line1">Street Line 1</label>
        <input
          type="text"
          name="line1"
          id="line1"
          value={data.address?.street?.line1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="line2">Street Line 2</label>
        <input
          type="text"
          name="line2"
          id="line2"
          value={data.address?.street?.line2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={data.address?.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <select
          name="state"
          id="state"
          defaultValue="default"
          value={data.address?.state}
          onChange={handleChange}
        >
          <option value="default" disabled>
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
          value={data.address?.postalCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          defaultValue="default"
          value={data.address?.country}
          onChange={handleChange}
        >
          <option value="default" disabled>
            Select a country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country.alpha3} value={country.alpha3}>
              {country.alpha3} - {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
