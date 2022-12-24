import React, { useState } from "react";
import { Progress } from "antd";
import { FetchContentVisit, fetchSubtitle } from "../../../network";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import userTypes from "../../../constants//UserTypes.json";
import { ReactSession } from "react-client-session";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import RefundForm from "../../Course/Refund/RefundForm";
import { Stack } from "react-bootstrap";
function ProgressBar(props) {
  const [done, setDone] = useState(false);
  const { subContents, subtitles, vc, setVc, courseId  , setLoading} = props;
  const [percentage, setPercentage] = useState(0);

  const handleProgressPercentage = async () => {
    let totalPercentage = 0;
    let noOfFalse = 0;
    let noOftrue = 0;

    for (let subs = 0; subs < subtitles.length; subs++) {
      const sub = await fetchSubtitle(subtitles[subs]);

      if (sub === null) continue;
      let subContentArr = sub.subTitle_Content;
      noOfFalse += subContentArr.length;
      for (let con = 0; con < subContentArr.length; con++) {
        const content = await FetchContentVisit(
          subContentArr[con].subTitle_Content_id,
          subContentArr[con].type
        );
        if (content) noOftrue++;
      }
    }

    noOfFalse = noOfFalse === 0 ? 1 : noOfFalse;
    totalPercentage = noOftrue / noOfFalse;

    setPercentage((totalPercentage * 100).toFixed(1) ?? 0);
    if (subtitles.length !== 0) setDone(true);
   
  };

  useEffect (()=>{
    setLoading(true);
  }, [done])

  useEffect(() => {
    handleProgressPercentage();
  }, [subtitles]);

  return (
    <Stack direction="vertical">
      {done ? (
        <>
          <Progress type="circle" percent={percentage} />
          {(vc === ViewerContexts.enrolledTrainee &&
            ReactSession.get("userType") !== userTypes.corporateTrainee &&
            percentage <= 50) ||
          vc === ViewerContexts.refundingTrainee ? (
            <RefundForm vc={vc} setVc={setVc} courseId={courseId} />
          ) : null}
        </>
      ) : (
        <ReactLoading type={"spin"} color="#fff" />
      )}
    </Stack>
  );
}

export default ProgressBar;
