import { Fragment, useState } from "react";
import "./App.css";

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

  function deleteActivity(id){
    const filteredActivities = activities.filter(activity => activity.id !== id);
    setActivities([...filteredActivities])
  }

  function setPriorityMessage(param) {
    switch (param) {
      case "1":
        return "Low";
      case "2":
        return "Medium";
      case "3":
        return "High";
      default:
        return "Undefined";
    }
  }

  function setPriorityStyle(param, icon) {
    switch (param) {
      case "1":
        return icon ? "face-smile" : "success";
      case "2":
        return icon ? "face-meh" : "info";
      case "3":
        return icon ? "face-frown" : "warning";
      default:
        return "";
    }
  }

  return (
    <Fragment>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Id</label>
          <input
            id="id"
            type="text"
            className="form-control bg-secondary"
            placeholder="input id"
            readOnly
            value={
              Math.max.apply(
                Math,
                activities.map((item) => item.id)
              ) + 1
            }
          ></input>
        </div>

        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <select id="priority" className="form-select">
            <option defaultValue={0}>Select...</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="input title"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
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
            + Add Activity
          </button>
        </div>
      </form>

      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <div
              key={act.id}
              className={
                "card mb-2 shadow-sm border-" + setPriorityStyle(act.priority)
              }
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">
                    <span className="badge text-bg-primary me-1">{act.id}</span>
                    - {act.title}
                  </h5>
                  <h6>
                    Priority:
                    <span
                      className={"ms-1 text-" + setPriorityStyle(act.priority)}
                    >
                      <i
                        className={
                          "me-1 fa-regular fa-" +
                          setPriorityStyle(act.priority, true)
                        }
                      />
                      {setPriorityMessage(act.priority)}
                    </span>
                  </h6>
                </div>
                <p className="card-text">{act.description}</p>
                <div className="d-flex justify-content-end border-top pt-2 m-0">
                  <button className="btn btn-sm btn-outline-primary me-2 ">
                    <i className="fas fa-pen me-2"></i>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteActivity(act.id)}>
                    <i className="fas fa-trash me-2"></i>
                    Delete
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
