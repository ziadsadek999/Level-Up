import React from "react";
import { useState, useEffect } from "react";
import { fetchSubtitle } from "../../network";
import { useNavigate } from "react-router-dom";

function SubtitleCard(props) {
  const navigate = useNavigate();
  const [subtitle, setSubtitle] = useState({ subTitle_Content: [] });
  const getSubtitle = async () => {
    try {
      const fetchedSubtitle = await fetchSubtitle(props.subtitleId);
      setSubtitle(fetchedSubtitle);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubtitle();
  }, []);

  return (
    <>
      <h5>{"subtitle: " + subtitle.subtitleNumber}</h5>
      <ol style={{ border: "1px dotted black" }}>
        {subtitle.subTitle_Content.map((content, index) => {
          return (
            <li>
              <h5>
                {"content " + (index + 1) + ": "}
                <a href={"/subtitle/"+props.subtitleId+"?idx="+ index}>
                  {content.type === "content"
                    ? "watch video"
                    : "solve exercise"}
                </a>
              </h5>
              <br />
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default SubtitleCard;
