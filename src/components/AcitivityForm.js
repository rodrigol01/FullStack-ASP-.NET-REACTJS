import React from "react";

export default function AcitivityForm(props) {

  const inputTextHandler = (e) => {
    const {name, value} = e.target;

    console.log(value)
  }

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Id</label>
        <input
          name="id"
          id="id"
          type="text"
          className="form-control bg-secondary"
          placeholder="input id"
          onChange={inputTextHandler}
          value={
            Math.max.apply(
              Math,
              props.activities.map((item) => item.id)
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
        <button
          className="btn btn-outline-secondary"
          onClick={props.addActivity}
        >
          + Add Activity
        </button>
      </div>
    </form>
  );
}
