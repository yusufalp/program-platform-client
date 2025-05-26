import type { Profile } from "../../../../types/profile";

interface ReviewStepProps {
  data: Profile;
}

export default function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div>
      <div>
        <h3>Address</h3>
        <p>Street Line 1: {data.address?.street?.line1 || "N/A"}</p>
        <p>Street Line 2: {data.address?.street?.line2 || "N/A"}</p>
        <p>City: {data.address?.city || "N/A"}</p>
        <p>State: {data.address?.state || "N/A"}</p>
        <p>Postal Code: {data.address?.postalCode || "N/A"}</p>
        <p>Country: {data.address?.country || "N/A"}</p>
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
