import type { Profile } from "../../../types/profile";

interface ReviewStepProps {
  data: Profile;
}

export default function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div>
      <h2>Review</h2>
      <p>Please review your information</p>
      <div>
        <h3>Address</h3>
        <address>
          <p>
            {data.address?.street?.line1} {data.address?.street?.line2}
          </p>
          <p>
            {data.address?.city}, {data.address?.state}{" "}
            {data.address?.postalCode}
          </p>
        </address>
      </div>

      <hr className="divider" />

      <div>
        <h3>Personal Information</h3>
        <p>Bio: {data.bio}</p>
        <p>Date of Birth: {data.dateOfBirth}</p>
        <p>Phone number: {data.phoneNumber}</p>
      </div>

      <hr className="divider" />

      <div>
        <h3>Links</h3>
        <p>LinkedIn: {data.socials?.linkedin}</p>
        <p>GitHub: {data.socials?.github}</p>
        <p>Website: {data.socials?.website}</p>
      </div>

      <hr className="divider" />
    </div>
  );
}
