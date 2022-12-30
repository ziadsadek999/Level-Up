import React, { useState } from "react";
import { FetchMark, fetchVideoContent, UpdateContentVisit } from "../../../network";
import "./SubtitleTypeCard.css";
import constants from "../../../constants/SubtitlesTypes.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisitedCard from "./VisitedCard/VisitedCard";
import {totalDurationWithColon} from '../../../utils/getVideoDurationUtils'

const SubtitleTypeCard = (props) => {
  const navigate = useNavigate();
  const courseID = props.cid;
  const subIDx = props.sidx;
  const contentIDx = props.contentIdx;

  const contentType = props.contentType;
  const contentID = props.contentID;
  const subtitleID = props.subtitleID;

  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [title , setTitle] = useState("");
  const [conID, setConID] = useState("");
  const [traineeMark, setTraineeMark] = useState("");
  const [excerciseMark, setExcerciseMark] = useState("");
  const [isVisited , setIsVisited] = useState(true);

  const fetchingContent = async () => {
    setType(contentType);
    setConID(contentID);
    if (contentType == constants.content) {
      const fetchedContent = await fetchVideoContent(contentID);
      setTitle(fetchedContent.title);
      setDescription(fetchedContent.description);
      setDuration(fetchedContent.duration);
    } else {
      const fetchedMark = await FetchMark(contentID);
      setTraineeMark(fetchedMark.Mark);
      setExcerciseMark(fetchedMark.ExerciseLength);
    }
  };

  useEffect(() => {
    fetchingContent();
  }, []);

  return (
    <div
      className={isVisited ? "Content-card visited" : "Content-card" }
      onClick={async (e) => {
        await UpdateContentVisit(contentID , contentType);
        type == constants.content
          ? navigate(
              "/watch/" + courseID + "?sId=" + subIDx + "&cId=" + contentIDx,
              { replace: true }
            )
          : navigate("/excercise/" + conID);
          navigate(0);
      }}
    >

      <div className="Content-card-details">
      <VisitedCard isVisited={isVisited} setIsVisited={setIsVisited} contentID={contentID} contentType={contentType}/>
      {/* <i class={type === constants.content ? "bi bi-play-circle" : "bi-card-checklist"}></i> */}
        <div className="course-card-icon-and-text">
         
          <span>{type === constants.content ? title ?? "Unknown" : "Excercise "} </span>
          <div class="content-duration">
          {type === constants.content ? (
            <i class="bi bi-clock-fill"></i>
          ) : (
            <i>Score : </i>
          )}
          {type === constants.content ? (
            <span>{totalDurationWithColon(duration)}</span>
          ) : (
            <span>
              {traineeMark === -1 ? "-" : traineeMark} / {excerciseMark}
            </span>
          )}
        </div>
        </div>
       


      </div>

     

    </div>
  );
};


export default SubtitleTypeCard;
