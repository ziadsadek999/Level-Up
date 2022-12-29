import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createNewSubtitle } from "../../../network";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "./AddSubtitle.css";
import colors from "../../../colors.json";
function AddSubtitle(props) {
  const { course, setCourse, setSubtitles } = props;
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newSubtitle, setNewSubtitle] = useState(null);
  const cancel = () => {
    setEditing(false);
    setNewSubtitle(null);
  };
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      const updatedCourse = await createNewSubtitle(course._id, newSubtitle);
      setCourse(updatedCourse);
      setSubtitles(updatedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="addSubtitleWrapper">
      {editing ? (
        <Form
          noValidate
          validated={validated}
          onSubmit={submit}
          id="addSubtitleForm"
        >
          <Form.Group className="mb-1" id="innerAddSubtitleForm">
            <Form.Control
              type="text"
              placeholder="Add subtitle"
              required
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Subtitle can not be empty
            </Form.Control.Feedback>
          </Form.Group>

          <Button id="saveSubtitleButton" type="submit">
            <FaSave color={colors.blue} size={20} />
          </Button>
          <Button id="cancelSubtitleButton" onClick={cancel}>
            <MdCancel color={colors.red} size={20} />
          </Button>
        </Form>
      ) : (
        <h5 id="addIconWrapper">
          <AiOutlinePlusCircle
            onClick={() => setEditing(true)}
            style={{ marginBottom: 4, cursor: "pointer" }}
          />{" "}
          &nbsp;Add a subtitle
        </h5>
      )}
    </div>
  );
}

export default AddSubtitle;
