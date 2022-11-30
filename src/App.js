import { Fragment, useState } from "react";
import "./App.css";

let initialState = [
  {
    id: 1,
    description: "primeira atividade",
  },
  {
    id: 2,
    description: "segunda atividade",
  },
];

function App() {
  const [activities, setActivities] = useState(initialState);

  function addActivity(e) {
    e.preventDefault();
    const activity = {
      id: document.getElementById("id").value,
      description: document.getElementById("description").value,
    };

    console.log(activity);
    //first execution: add initial state
    //second execution: add initial state + activity
    setActivities([...activities, {...activity} ]);
  }

  return (
    <Fragment>
      <form className="row g-3">
        <div class="col-md-6">
          <label for="id" class="form-label">Id</label>
          <input id="id" type="text" className="form-control" placeholder="input id" />
        </div>

        <div class="col-md-6">
          <label for="description" class="form-label">Description</label>
          <input id="description" type="text" className="form-control" placeholder="input description" />
        </div>
        <hr />
        <div className="col-">
          <button className="btn btn-outline-secondary" onClick={addActivity}>Add Activity</button>
        </div>
      </form>

      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <li key={act.id} className="list-group-item">
              {act.id} - {act.description}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default App;
