import { Fragment, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./App.css";
import AcitivityForm from "./components/AcitivityForm";
import ActivityList from "./components/ActivityList";
import api from "./api/activity.js";

function App() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });
  const [showModalActivity, setShowModalActivity] = useState(false);

  const handleModalActivity = () => setShowModalActivity(!showModalActivity);

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
    handleModalActivity();
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
    handleModalActivity();
  }

  const updateActivity = async (activ) => {
    const response = await api.put(`activity/${activ.id}`, activ);
    const { id } = response.data;

    setActivities(
      activities.map((item) => (item.id === id ? response.data : item))
    );
    setActivity({ id: 0 });
    handleModalActivity();
  };

  function cancelActivity() {
    setActivity({ id: 0 });
    handleModalActivity();
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
          To do list {activity.id !== 0 ? activity.id : ""}
        </h1>
        <Button variant="outline-secondary" onClick={handleModalActivity}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      <ActivityList
        activities={activities}
        deleteActivity={deleteActivity}
        getActivity={getActivity}
      />

      <Modal show={showModalActivity} onHide={handleModalActivity}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AcitivityForm
            updateActivity={updateActivity}
            cancelActivity={cancelActivity}
            addActivity={addActivity}
            activities={activities}
            selectedActivity={activity}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default App;
