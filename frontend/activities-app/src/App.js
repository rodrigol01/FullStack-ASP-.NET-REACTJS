import { Fragment, useState, useEffect } from "react";
import "./App.css";
import AcitivityForm from "./components/AcitivityForm";
import ActivityList from "./components/ActivityList";
import api from "./api/activity.js";

function App() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });

  const getActivitiesFromApi = async () => {
    const response = await api.get("activity");
    return response.data;
  };

  useEffect(() => {
    const getActivities = async () => {
      const allActivities = await getActivitiesFromApi();

      if (allActivities) setActivities(allActivities);
    };

    getActivities();
  }, []);

  const addActivity = async (activ) => {
    const response = await api.post("activity", activ);
    //first execution: add initial state
    //second execution: add initial state + activity
    setActivities([...activities, response.data]);
  };

  const deleteActivity = async (id) => {
    if (await api.delete(`activity/${id}`)) {
      const filteredActivities = activities.filter(
        (activity) => activity.id !== id
      );

      setActivities([...filteredActivities]);
    }
  };

  function getActivity(id) {
    const activity = activities.filter((activity) => activity.id === id);

    setActivity(activity[0]);
  }

  const updateActivity = async (activ) => {
    const response = await api.put(`activity/${activ.id}`, activ);
    

    
    setActivities(
      activities.map((item) => (item.id === activ.id ? activ : response.data))
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
