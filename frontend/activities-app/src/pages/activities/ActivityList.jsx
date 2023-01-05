import ActivityItem from "./ActivityItem";

export default function ActivityList(props) {
  return (
    <div className="mt-3">
      {props.activities.map((act) => (
        <ActivityItem
          key={act.id}
          act={act}
          getActivity={props.getActivity}
          handleConfirmModalActivity={props.handleConfirmModalActivity}
        />
      ))}
    </div>
  );
}
