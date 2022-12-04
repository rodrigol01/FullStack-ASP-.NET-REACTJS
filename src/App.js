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
    setActivities([...activities, { ...activity }]);
  }

  return (
    <Fragment>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="id" className="form-label">
            Id
          </label>
          <input
            id="id"
            type="text"
            className="form-control"
            placeholder="input id"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="form-control"
            placeholder="input description"
          />
        </div>
        <hr />
        <div className="col-">
          <button className="btn btn-outline-secondary" onClick={addActivity}>
            Add Activity
          </button>
        </div>
      </form>

      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <div key={act.id} className="card mb-2 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">
                    <span className="badge text-bg-primary me-1">{act.id}</span>
                    - Title
                  </h5>
                  <h6>
                    Priority:
                    <span className="text-black ms-1">
                      <i className="me-1 fa-regular fa-face-frown" />
                      High
                    </span>
                  </h6>
                </div>
                <p className="card-text">{act.description}</p>
                <div className="d-flex justify-content-end border-top pt-2 m-0">
                  <button className="btn btn-sm btn-outline-primary me-2 ">
                    <i className="fas fa-pen me-2"></i>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="fas fa-trash me-2"></i>
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default App;
