import { Fragment, useState, useEffect } from "react";
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
  const [index, setIndex] = useState(0);
  const [activities, setActivities] = useState(initialState);
  const [activity, setActivity] = useState({id: 0});

  useEffect(() => {
    activities.length <= 0
      ? setIndex(1)
      : setIndex(
          Math.max.apply(
            Math,
            activities.map((item) => item.id)
          ) + 1
        );
  }, [activities]);

  function addActivity(activ) {
    //first execution: add initial state
    //second execution: add initial state + activity
    setActivities([
      ...activities,
      {
        ...activ,
        id: index,
      },
    ]);
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

  function updateActivity(activ) {
    setActivities(
      activities.map((item) => (item.id === activ.id ? activ : item))
    );
    setActivity({ id: 0 });
  }

  function cancelActivity() {
    setActivity({ id: 0 });
  }

  return (
    <Fragment>
      <AcitivityForm
        updateActivity={updateActivity}
        cancelActivity={cancelActivity}
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
