import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useMemo } from "react";
import { addRating, deleteRating, getTraineeRating } from "../../network";
import ViewerContexts from "../../constants/ViewerContexts.json";
import ReactStars from "react-rating-stars-component";
import Modal from "react-bootstrap/Modal";
import { ImPencil } from "react-icons/im";
import "./RatingCard.css";
import { Spinner } from "react-bootstrap";
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";
import { AiOutlinePlusCircle } from "react-icons/ai";
import colors from "../../colors.json";

function RatingCard(props) {
  const { courseId, vc, setTotalRating, setRatingsCount, setReviews } = props;
  const [traineeRating, setTraineeRating] = useState(null);
  const [traineeReview, setTraineeReview] = useState(null);
  const [newRating, setNewRating] = useState(null);
  const [newReview, setNewReview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [msg, setMsg] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const initializeRatings = async () => {
    const fetchedTraineeRating = await getTraineeRating(courseId);
    setTraineeRating(fetchedTraineeRating.rating);
    setTraineeReview(fetchedTraineeRating.review);
  };
  let AddRatingStars = useMemo(() => {
    return () => (
      <div id="starsWrapper">
        <ReactStars
          count={5}
          size={50}
          isHalf={true}
          activeColor="#ffd700"
          value={newRating ?? traineeRating ?? 0}
          edit={editing}
          onChange={(r) => setNewRating(r)}
        />
      </div>
    );
  }, [traineeRating, editing]);
  useEffect(() => {
    initializeRatings();
  }, []);
  let timeoutId;
  useEffect(() => {
    if (success || fail) {
      timeoutId = setTimeout(cancel, 3000);
    }
  }, [success, fail]);
  const rate = async () => {
    setSaveLoading(true);
    try {
      const addedReview = newReview ?? traineeReview;
      const addedRating = newRating ?? traineeRating ?? 0;
      const response = await addRating({
        courseId: courseId,
        rating: addedRating ?? 0,
        review: addedReview,
      });
      setRatingsCount(response.ratings.length);
      setReviews(response.ratings);
      setTotalRating(response.totalRating);
      setTraineeRating(addedRating);
      setTraineeReview(addedReview);
      setNewRating(null);
      setNewReview(null);
      setSuccess(true);
      setMsg("Review submitted successfully!");
    } catch (err) {
      setFail(true);
    }
    setSubmitted(true);
    setSaveLoading(false);
  };

  const deleteReview = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteRating({ courseId: courseId });
      setRatingsCount(response.ratings.length);
      setReviews(response.ratings);
      setTotalRating(response.totalRating);
      setTraineeRating(null);
      setTraineeReview(null);
      setNewRating(null);
      setNewReview(null);
      setSuccess(true);
      setMsg("Review deleted successfully");
    } catch (err) {
      setFail(true);
    }
    setSubmitted(true);
    setDeleteLoading(false);
  };
  const cancel = async () => {
    clearTimeout(timeoutId);
    setEditing(false);
    setNewRating(null);
    setNewReview(null);
    setSuccess(false);
    setFail(false);
    setMsg(null);
  };
  return (
    <>
      {vc === ViewerContexts.enrolledTrainee ? (
        <div id="rateCourseButton">
          <>
            <>
              <Modal show={editing} onHide={cancel} size={"lg"} centered>
                <Modal.Header>
                  <Modal.Title>Review course</Modal.Title>
                </Modal.Header>
                {submitted ? (
                  <>
                    {success ? (
                      <SuccessFeedback msg={msg} />
                    ) : (
                      <>{fail ? <ErrorFeedback /> : null}</>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    <Stack direction="vertical">
                      <div id="courseStars">
                        <AddRatingStars />
                      </div>
                      <div className="courseRatingForm">
                        <Form.Group as={Col}>
                          <Form.Control
                            as="textarea"
                            placeholder="Your review"
                            value={newReview ?? traineeReview}
                            onChange={(e) => setNewReview(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <div className="courseRatingForm" id="rateCourseFooter">
                        <Button
                          onClick={() => cancel()}
                          variant="secondary"
                          className="rateCourseFormButton greyBgHover"
                          disabled={saveLoading || deleteLoading}
                        >
                          Close
                        </Button>
                        {traineeRating != null ? (
                          <Button
                            onClick={() => deleteReview()}
                            className="rateCourseFormButton redBgHover"
                            disabled={saveLoading || deleteLoading}
                          >
                            {deleteLoading ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                {" Deleting..."}
                              </>
                            ) : (
                              <>{"Delete Review"}</>
                            )}
                          </Button>
                        ) : null}

                        <Button
                          onClick={() => rate()}
                          className="rateCourseFormButton blueBgHover"
                          disabled={saveLoading || deleteLoading}
                        >
                          {saveLoading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              {" Saving..."}
                            </>
                          ) : (
                            <>{"Submit"}</>
                          )}
                        </Button>
                      </div>
                    </Stack>
                  </>
                )}
              </Modal>
            </>
            {traineeRating != null ? (
              <h6
                style={{ marginTop: "7%", cursor: "pointer" }}
                onClick={() => {
                  setEditing(true);
                  setSubmitted(false);
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Edit your review
                <ImPencil
                  color={colors.blue}
                  size={15}
                  style={{ marginBottom: 5, marginLeft: 5, cursor: "pointer" }}
                  onClick={() => {
                    setEditing(true);
                    setSubmitted(false);
                  }}
                />
              </h6>
            ) : (
              <h6
                style={{ marginTop: "9%", cursor: "pointer" }}
                onClick={() => {
                  setEditing(true);
                  setSubmitted(false);
                }}
              >
                <AiOutlinePlusCircle
                  color={colors.blue}
                  size={15}
                  style={{ marginBottom: 3, marginLeft: 7, cursor: "pointer" }}
                  onClick={() => {
                    setEditing(true);
                    setSubmitted(false);
                  }}
                />
                &nbsp;Add a review
              </h6>
            )}
          </>
        </div>
      ) : null}
    </>
  );
}
export default RatingCard;
