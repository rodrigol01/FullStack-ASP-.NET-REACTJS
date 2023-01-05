import { Fragment, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ActivityList from "./ActivityList";
import AcitivityForm from "./AcitivityForm";
import api from "../../api/activity";
import TitlePage from './../../components/TitlePage';

export default function Activity() {
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState({ id: 0 });
    const [showModalActivity, setShowModalActivity] = useState(false);
    const [showModalConfirmActivity, setShowModalConfirmActivity] =
        useState(false);

    const handleModalActivity = () => {
        setShowModalActivity(!showModalActivity);
    };

    const handleConfirmModalActivity = (id) => {
        if (id !== 0 && id !== undefined) {
            const activity = activities.filter((activity) => activity.id === id);
            setActivity(activity[0]);
        } else {
            setActivity({ id: 0 });
        }

        setShowModalConfirmActivity(!showModalConfirmActivity);
    };

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

    const newActivity = () => {
        setActivity({ id: 0 });
        handleModalActivity();
    };

    const addActivity = async (activ) => {
        handleModalActivity();
        const response = await api.post("activity", activ);

        //first execution: add initial state
        //second execution: add initial state + activity
        setActivities([...activities, response.data]);
    };

    const deleteActivity = async (id) => {
        handleConfirmModalActivity(0);

        if (await api.delete(`activity/${id}`)) {
            const filteredActivities = activities.filter(
                (activity) => activity.id !== id
            );

            setActivities([...filteredActivities]);
        }
    };

    const getActivity = (id) => {
        const activity = activities.filter((activity) => activity.id === id);

        setActivity(activity[0]);
        handleModalActivity();
    };

    const updateActivity = async (activ) => {
        const response = await api.put(`activity/${activ.id}`, activ);
        const { id } = response.data;

        setActivities(
            activities.map((item) => (item.id === id ? response.data : item))
        );
        setActivity({ id: 0 });
        handleModalActivity();
    };

    const cancelActivity = () => {
        setActivity({ id: 0 });
        handleModalActivity();
    };

    return (
        <Fragment>
            <TitlePage>
                <Button variant="outline-secondary" onClick={newActivity}>
                    <i className="fas fa-plus"></i>
                </Button>
            </TitlePage>

            <ActivityList
                activities={activities}
                getActivity={getActivity}
                handleConfirmModalActivity={handleConfirmModalActivity}
            />

            <Modal show={showModalActivity} onHide={handleModalActivity}>
                <Modal.Header closeButton>
                    <Modal.Title>Task {activity.id !== 0 ? activity.id : ""}</Modal.Title>
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

            <Modal
                size="sm"
                show={showModalConfirmActivity}
                onHide={handleConfirmModalActivity}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Deleting activity: {activity.id !== 0 ? activity.id : ""}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You are deleting the activity . Are you sure you want to remove this
                    task?
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <button
                        className="btn btn-outline-success me-2"
                        onClick={() => deleteActivity(activity.id)}
                    >
                        <i className="fa fa-check me-2"></i> Yes
                    </button>
                    <button
                        className="btn btn-danger me-2"
                        onClick={() => handleConfirmModalActivity(0)}
                    >
                        <i className="fa fa-times me-2"></i> No
                    </button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}