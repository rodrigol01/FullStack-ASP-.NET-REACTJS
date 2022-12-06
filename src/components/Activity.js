import React from "react";

export default function Activity(props) {
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
    <div
      key={props.id}
      className={
        "card mb-2 shadow-sm border-" + setPriorityStyle(props.act.priority)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge text-bg-primary me-1">{props.act.id}</span>-{" "}
            {props.act.title}
          </h5>
          <h6>
            Priority:
            <span
              className={"ms-1 text-" + setPriorityStyle(props.act.priority)}
            >
              <i
                className={
                  "me-1 fa-regular fa-" +
                  setPriorityStyle(props.act.priority, true)
                }
              />
              {setPriorityMessage(props.act.priority)}
            </span>
          </h6>
        </div>
        <p className="card-text">{props.act.description}</p>
        <div className="d-flex justify-content-end border-top pt-2 m-0">
          <button className="btn btn-sm btn-outline-primary me-2 ">
            <i
              className="fas fa-pen me-2"
              onClick={() => props.getActivity(props.act.id)}
            ></i>
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => props.deleteActivity(props.act.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
