import type { StepProps } from "../../types/profile";

export default function ReviewStep({ data }: StepProps) {
  return (
    <div>
      <h2>Review Your Profile Information</h2>
      <p>
        Please review all the details below. You can go back to edit any section
        if needed.
      </p>

      <hr className="divider" />

      <section className="review-section">
        <p>
          <strong>Bio:</strong>
        </p>
        <div className="review-content-box">
          <p>{data.bio || "Not provided"}</p>
        </div>
        <p>
          <strong>Date of Birth:</strong> {data.dateOfBirth || "Not provided"}
        </p>
        <p>
          <strong>Phone Number:</strong> {data.phoneNumber || "Not provided"}
        </p>
      </section>

      <hr className="divider" />

      <section className="review-section">
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
          <strong>Postal Code:</strong>
          {data.address.postalCode || "Not provided"}
        </p>
        <p>
          <strong>Country:</strong> {data.address.country || "Not provided"}
        </p>
      </section>

      <hr className="divider" />

      <section className="review-section">
        <p>
          <strong>LinkedIn:</strong> {data.socials?.linkedin || "Not provided"}
        </p>
        <p>
          <strong>GitHub:</strong> {data.socials?.github || "Not provided"}
        </p>
        <p>
          <strong>Website:</strong> {data.socials?.website || "Not provided"}
        </p>
      </section>

      <hr className="divider" />
    </div>
  );
}
