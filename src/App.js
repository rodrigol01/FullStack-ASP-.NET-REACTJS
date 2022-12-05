import { Fragment, useState } from "react";
import "./App.css";
import AcitivityForm from "./components/AcitivityForm";
import Activity from "./components/Activity";

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

  return (
    <Fragment>
      <AcitivityForm addActivity={addActivity} activities={activities} />
      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <Activity
              key= {act.id}
              act={act}
              deleteActivity={deleteActivity}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default App;
