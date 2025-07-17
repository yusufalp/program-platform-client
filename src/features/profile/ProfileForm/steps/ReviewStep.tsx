import ProfileAddressDetails from "../../components/ProfileAddressDetails";
import ProfileBioDetails from "../../components/ProfileBioDetails";
import ProfileLinksDetails from "../../components/ProfileLinksDetails";

import type { StepProps } from "../../types/profile";

export default function ReviewStep({ data }: StepProps) {
  return (
    <div>
      <h2>Review Your Profile Information</h2>
      <p>
        Please review all the details below. You can go back to edit your
        responses
      </p>

      <hr className="divider" />

      <section className="review-section">
        <ProfileBioDetails data={data} />
      </section>

      <hr className="divider" />

      <section className="review-section">
        <ProfileAddressDetails data={data} />
      </section>

      <hr className="divider" />

      <section className="review-section">
        <ProfileLinksDetails data={data} />
      </section>

      <hr className="divider" />
    </div>
  );
}
