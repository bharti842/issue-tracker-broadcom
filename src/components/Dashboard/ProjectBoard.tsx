import React, { useEffect, useState } from "react";
import axios from "axios";

interface Issue {
  id: string;
  summary: string;
  priority: number;
}

const ProjectBoard: React.FC = () => {
  const [allIssues, setAllIssues] = useState<Issue[]>([]);

  useEffect(() => {
    axios
      .get<Issue[]>(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue"
      )
      .then((response) => {
        setAllIssues(response.data);
      });
  }, []);

  return (
    <>
      {allIssues.map((issue) => (
        <div className="issue-outer" key={issue.id}>
          <div className="issue-container">
            <div style={{ marginLeft: "5px" }}>
              <p>{issue?.id}</p>
              <span>{issue?.summary}</span>
              <p>Priority</p>
              <div>
                {issue?.priority === 1 ? (
                  <p className="prio-high">High</p>
                ) : issue?.priority === 2 ? (
                  <p className="prio-med">Medium</p>
                ) : (
                  <p className="prio-low">Low</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectBoard;
