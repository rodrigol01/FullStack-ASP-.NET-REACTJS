import { Fragment, useState, useEffect } from "react";
import "./App.css";
import AcitivityForm from "./components/AcitivityForm";
import ActivityList from "./components/ActivityList";
import api from './api/activity.js'

function App() {
  const [index] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({id: 0});


  const getActivitiesFromApi = () => {
    const response = api.get('activity');
    return response.data;
  }

  useEffect(() => {
    const getActivities = () => {
      const allActivities = getActivitiesFromApi();

      if (allActivities)
        setActivities(allActivities);
    }

    getActivities();
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
