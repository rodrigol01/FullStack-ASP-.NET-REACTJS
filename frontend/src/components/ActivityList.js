import React from "react";
import Activity from "./Activity";

export default function ActivityList(props) {
  return (
    <div className="mt-3">
      {props.activities.map((act) => (
        <Activity
          key={act.id}
          act={act}
          deleteActivity={props.deleteActivity}
          getActivity={props.getActivity}
        />
      ))}
    </div>
  );
}
