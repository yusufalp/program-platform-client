import { formatDate } from "../../../lib/formatDate";
import type { StepProps } from "../types/profile";

export default function ProfileBioDetails({ data }: StepProps) {
  return (
    <>
      <p>
        <strong>Bio:</strong>
      </p>
      <div className="review-content-box">
        <p>{data.bio || "Not provided"}</p>
      </div>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {formatDate(data.dateOfBirth) || "Not provided"}
      </p>
      <p>
        <strong>Phone Number:</strong> {data.phoneNumber || "Not provided"}
      </p>
    </>
  );
}
