import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { getPrice, fetchCourseDetails } from "../../network";
import SubtitleCard from "../../components/SubtitleCard/SubtitleCard";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import { getViewerContext } from "../../utils/viewerContext";
import "./CourseDetails.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import RatingCard from "../../components/RatingCard/RatingCard";
import Button from "react-bootstrap/Button";
import ViewerContexts from "../../constants/ViewerContexts.json";
import { updateCourse } from "../../network";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [price, setPrice] = useState("");
  const [vc, setVc] = useState("");
  const [durationMap, setDurationMap] = useState(new Map());
  const [duration, setDuration] = useState(0);
  const [newVideo, setNewVideo] = useState();
  const uploadIntroVideo = async () => {
    try {
      const newCourse = await updateCourse(course._id, {
        introVideo: newVideo,
      });
      setCourse(newCourse);
      setNewVideo("");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCourse = async () => {
    try {
      const fetchedCourse = await fetchCourseDetails(courseId);
      const fetchedVc = getViewerContext(fetchedCourse);
      console.log(fetchedVc);
      setVc(fetchedVc);
      setCourse(fetchedCourse);
      setReviews(fetchedCourse.reviews);
      setSubtitles(fetchedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(course.price);
      setPrice(fetchedPrice);
    } catch (err) {
      console.log(err);
    }
  };

  const claculateDuration = () => {
    if (durationMap.size > 0) {
      let d = 0;
      for (let [key, value] of durationMap) {
        if (!isNaN(value)) {
          d = parseInt(d) + parseInt(value ?? 0);
        }
      }
      setDuration(d);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), course]);
  useEffect(() => {
    claculateDuration();
  }, [durationMap, course]);
  return (
    <div>
      <>
        <Row id="courseCardContainer">
          <Col md={2}>
            <Image width={250} src={course.image} thumbnail />
          </Col>
          <Col>
            <Row>
              <h1 id="courseName">{course.name}</h1>
            </Row>
            <Row>
              <Col>
                <Stack gap={4} id="courseInfo">
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <h3>{course.reviews?.length ?? 0} reviews</h3>
                    </Stack>
                  </div>
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <h3>{course.subtitles?.length ?? 0} subtitles</h3>
                    </Stack>
                  </div>
                  {vc !== ViewerContexts.nonEnrolledCorporateTrainee &&
                  vc !== ViewerContexts.enrolledTrainee ? (
                    <div id="courseRating">
                      <Stack direction="horizontal" gap={3}>
                        <h3>Price: {price ?? 0}</h3>
                      </Stack>
                    </div>
                  ) : null}
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <RatingCard courseId={courseId} vc={vc} />
                    </Stack>
                  </div>
                  {vc === ViewerContexts.guest ? <Button>Enroll</Button> : null}
                </Stack>
              </Col>
              <Col>
                <Stack>
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <h3>Total duration: {duration ?? 0} hours</h3>
                    </Stack>
                  </div>
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <h3>Subject: {course.subject ?? ""}</h3>
                    </Stack>
                  </div>
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <h3>Summary: {course.description ?? ""}</h3>
                    </Stack>
                  </div>
                  <div id="introVideo">
                    {course.introVideo !== "" && (
                      <iframe
                        style={{ height: 200, width: "100%" }}
                        src={course.introVideo}
                      ></iframe>
                    )}
                    {vc === ViewerContexts.author ? (
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeHolder={
                            (course.introVideo === "" ? "Upload" : "Update") +
                            " Course Preview"
                          }
                          value={newVideo}
                          onChange={(e) => {
                            setNewVideo(e.target.value);
                          }}
                        ></Form.Control>
                        <div className="text-center">
                          <Button
                            className="m-2"
                            onClick={(e) => {
                              uploadIntroVideo();
                            }}
                          >
                            upload
                          </Button>
                        </div>
                      </Form.Group>
                    ) : null}
                  </div>
                </Stack>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
      {vc === ViewerContexts.enrolledTrainee ? (
        <Button>Go to Course</Button>
      ) : null}
      <Accordion>
        {subtitles.map((subtitleId, index) => (
          <SubtitleCard
            subtitles={subtitles}
            setSubtitles={setSubtitles}
            courseId={course._id}
            index={index}
            subtitleId={subtitleId}
            durationMap={durationMap}
            setDurationMap={setDurationMap}
            vc={vc}
          />
        ))}
        {vc === ViewerContexts.author ? <Button>Add Subtitle</Button> : null}
      </Accordion>
      <ReviewsCard reviews={reviews} />
    </div>
  );
};
export default CourseDetails;
