import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { getYoutubeVideoID } from "../../../utils/getVideoDurationUtils";
import ViewerContexts from "../../../constants/ViewerContexts.json";

function IntroVideo(props) {
  const { introVideo, vc, newVideo, setNewVideo, uploadIntroVideo } = props;
  return (
    <div id="intro">
      {introVideo !== "" && (
        <iframe
          style={{
            height: 300,
            width: 500,
            marginLeft: 190,
            borderRadius: 8,
          }}
          src={
            "https://www.youtube.com/embed/" +
            getYoutubeVideoID(introVideo ?? "")
          }
        ></iframe>
      )}
      {vc === ViewerContexts.author ? (
        <Form>
          <Container className="mt-4">
            <Form.Group className="mt-3">
              <Form.Control
                type="text"
                placeholder="Video url"
                value={newVideo}
                required
                onChange={(e) => {
                  setNewVideo(e.target.value);
                }}
                id="urlInput"
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button id="addVideo" onClick={uploadIntroVideo}>
                Add video
              </Button>
            </div>
          </Container>
        </Form>
      ) : null}
    </div>
  );
}

export default IntroVideo;
