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
    props.cancelActivity();
    setActivity(initialActivity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.selectedActivity.id !== 0) props.updateActivity(activity);
    else props.addActivity(activity);

    setActivity(initialActivity);
  };

  return (
    <Fragment>
      <form className="row g-3" onSubmit={handleSubmit}>
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
            <option defaultValue={"Undefined"}>Select...</option>
            <option value={"Low"}>Low</option>
            <option value={"Medium"}>Medium</option>
            <option value={"High"}>High</option>
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
          <hr />
        </div>
        <div className="col-12 mt-0">
          {activity.id === 0 ? (
            <button className="btn btn-outline-secondary" type="submit">
              <i className="fa fa-plus me-2"></i> Activity
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
