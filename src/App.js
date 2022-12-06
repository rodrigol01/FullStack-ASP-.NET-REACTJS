import { Fragment, useState } from "react";
import "./App.css";
import AcitivityForm from "./components/AcitivityForm";
import ActivityList from "./components/ActivityList";

let initialState = [
  {
    id: 1,
    priority: "1",
    title: "Comer um bacon",
    description: "primeira atividade",
  },
  {
    id: 2,
    priority: "2",
    title: "Comer um pastel",
    description: "segunda atividade",
  },
];

function App() {
  const [activities, setActivities] = useState(initialState);
  const [activity, setActivity] = useState(initialState);

  function addActivity(e) {
    e.preventDefault();
    const activity = {
      id: document.getElementById("id").value,
      priority: document.getElementById("priority").value,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
    };

    console.log(activity);
    //first execution: add initial state
    //second execution: add initial state + activity
    setActivities([...activities, { ...activity }]);
  }

  function deleteActivity(id) {
    const filteredActivities = activities.filter(
      (activity) => activity.id !== id
    );

    setActivities([...filteredActivities]);
  }

  function getActivity(id) {
    const activity = activities.filter((activity) => activity.id === id);

    setActivity(activity[0]);
  }

  return (
    <Fragment>
      <AcitivityForm
        addActivity={addActivity}
        activities={activities}
        selectedActivity={activity}
      />
      <ActivityList
        activities={activities}
        deleteActivity={deleteActivity}
        getActivity={getActivity}
      />
    </Fragment>
  );
}

export default App;
