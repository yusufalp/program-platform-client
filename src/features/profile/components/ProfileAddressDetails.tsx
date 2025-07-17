import type { StepProps } from "../types/profile";

export default function ProfileAddressDetails({ data }: StepProps) {
  return (
    <>
      <p>
        <strong>Street Line 1: </strong>
        {data.address.street.line1 || "Not provided"}
      </p>
      <p>
        <strong>Street Line 2: </strong>
        {data.address.street.line2 || "N/A"}
      </p>
      <p>
        <strong>City: </strong>
        {data.address.city || "Not provided"}
      </p>
      <p>
        <strong>State: </strong>
        {data.address.state || "Not provided"}
      </p>
      <p>
        <strong>Postal Code: </strong>
        {data.address.postalCode || "Not provided"}
      </p>
      <p>
        <strong>Country:</strong> {data.address.country || "Not provided"}
      </p>
    </>
  );
}
