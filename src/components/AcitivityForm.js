import { useState, useEffect, Fragment } from "react";

const initialActivity = {
  id: 0,
  title: "",
  priority: 0,
  description: "",
};

export default function AcitivityForm(props) {
  useEffect(() => {
    if (props.selectedActivity.id !== 0) {
      setActivity(props.selectedActivity);
    }
  }, [props.selectedActivity]);

  const [activity, setActivity] = useState(actualActivity());

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setActivity({ ...activity, [name]: value });
  };

  function actualActivity() {
    if (props.selectedActivity.id !== 0) return props.selectedActivity;
    else return initialActivity;
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setActivity(initialActivity);
  };

  return (
    <Fragment>
      <h1>
        Activity{" "}
        {activity.id !== 0 && props.selectedActivity.id !== undefined
          ? "number " + activity.id
          : ""}
      </h1>

      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="input title"
            name="title"
            onChange={inputTextHandler}
            value={activity.title}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <select
            id="priority"
            className="form-select"
            name="priority"
            onChange={inputTextHandler}
            value={activity.priority}
          >
            <option defaultValue={0}>Select...</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            id="description"
            type="text"
            className="form-control"
            placeholder="input description"
            name="description"
            onChange={inputTextHandler}
            value={activity.description}
          />
        </div>
        <hr />
        <div className="col-">
          {activity.id === 0 ? (
            <button
              className="btn btn-outline-secondary"
              onClick={props.addActivity}
            >
              <i className="fa fa-plus me-2"></i> Add Activity
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                <i className="fa fa-plus"></i> Salvar
              </button>

              <button className="btn btn-danger" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </Fragment>
  );
}
