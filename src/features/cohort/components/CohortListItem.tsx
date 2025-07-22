import { Link } from "react-router-dom";
import type { CohortListPageProps } from "../../attendance/types/cohort";

export default function CohortListItem({ cohorts }: CohortListPageProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Archived</th>
        </tr>
      </thead>
      <tbody>
        {cohorts.map((cohort) => (
          <tr key={cohort._id}>
            <td>
              <Link to={`/cohorts/${cohort._id}`}>{cohort.name}</Link>
            </td>
            <td>{cohort.code}</td>
            <td>{cohort.isArchived ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
