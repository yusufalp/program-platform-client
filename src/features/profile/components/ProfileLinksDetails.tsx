import type { StepProps } from "../types/profile";

export default function ProfileLinksDetails({ data }: StepProps) {
  return (
    <>
      <p>
        <strong>LinkedIn:</strong> {data.socials?.linkedin || "Not provided"}
      </p>
      <p>
        <strong>GitHub:</strong> {data.socials?.github || "Not provided"}
      </p>
      <p>
        <strong>Website:</strong> {data.socials?.website || "Not provided"}
      </p>
    </>
  );
}
