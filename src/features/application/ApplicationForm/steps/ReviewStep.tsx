import type { StepProps } from "../../types/application";

export default function ReviewStep({ data }: StepProps) {
  const renderBoolean = (value: boolean) => (value ? "Yes" : "No");

  return (
    <div>
      <h2>Review Your Application</h2>
      <p>
        Please review all the information below before submitting your
        application.
      </p>

      <hr className="divider" />

      <section className="review-section">
        <h3>Personal Statement</h3>
        <div className="review-content-box">
          <p>{data.personalStatement.content || "Not provided"}</p>
        </div>
      </section>

      <hr className="divider" />

      <section className="review-section">
        <h3>Logic Problem</h3>
        <p>
          Describe how you'd find a missing number from a sequence of 1 to 100,
          and demonstrate with 1 to 10 missing 7.
        </p>
        <p>
          <strong>Steps: </strong>
          {data.logicProblem.explanation || "Not provided"}
        </p>
        <p>
          <strong>Reasoning: </strong>
          {data.logicProblem.reasoning || "Not provided"}
        </p>
        <p>
          <strong>Example: </strong>
          {data.logicProblem.example || "Not provided"}
        </p>
      </section>

      <hr className="divider" />

      <section className="review-section">
        <p>
          <strong>Educational Background: </strong>
        </p>
        <div className="review-content-box">
          <p>
            {data.educationAndExperience.educationalBackground ||
              "Not specified"}
          </p>
        </div>
        <p>
          <strong>Prior Tech Experience: </strong>
        </p>
        <div className="review-content-box">
          <p>
            {data.educationAndExperience.priorTechExperience || "Not provided"}
          </p>
        </div>
      </section>

      <hr className="divider" />

      <section className="review-section">
        <p>
          <strong>Lives in Boston: </strong>
          {renderBoolean(data.location.livesInBoston)}
        </p>
        {data.location.livesInBoston && (
          <p>
            <strong>Boston Neighborhood: </strong>
            {data.location.bostonNeighborhood || "Not specified"}
          </p>
        )}
        <p>
          <strong>How did you hear about CodeSquad?: </strong>
          {data.referralSource || "Not specified"}
        </p>
      </section>

      <hr className="divider" />

      <section className="review-section">
        <p>
          <strong>Household Size: </strong>
          {data.incomeAndCircumstances.householdSize || 0}
        </p>
        <p>
          <strong>Annual Income: </strong> $
          {data.incomeAndCircumstances.annualIncome.toLocaleString() || "0"}
        </p>
        <p>
          <strong>Receives Government Assistance: </strong>
          {renderBoolean(
            data.incomeAndCircumstances.receivesGovernmentAssistance
          )}
        </p>
        <p>
          <strong>Homeless or at risk: </strong>
          {renderBoolean(data.incomeAndCircumstances.isHomelessOrNearHomeless)}
        </p>
        <p>
          <strong>Authorized to work in US: </strong>
          {renderBoolean(data.incomeAndCircumstances.authorizedToWorkInUS)}
        </p>
      </section>

      <hr className="divider" />

      <section className="review-section">
        <p>
          <strong>Underrepresented in Tech: </strong>
          {renderBoolean(data.optionalSection.underrepresentedInTech)}
        </p>
        {data.optionalSection.underrepresentedInTech && (
          <p>
            <strong>Details: </strong>
            {data.optionalSection.underrepresentedDetails || "Not specified"}
          </p>
        )}
        <p>
          <strong>Has CORI: </strong>
          {renderBoolean(data.optionalSection.hasCORI)}
        </p>
      </section>
    </div>
  );
}
