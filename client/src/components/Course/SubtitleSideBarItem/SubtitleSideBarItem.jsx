import React from 'react'
import "./SubtitleSideBarItem.css"
import { useState } from 'react'
import SubtitleTypeCard from '../SubtitleTypeCard/SubtitleTypeCard';
import { fetchCourseDetails , fetchSubtitle} from '../../../network';
import { useEffect } from 'react';


const SubtitleSideBarItem = (props) => {
  const subtitleID = props.subtitleContent;
  const [open , setOpen] = useState(false);
  const [subtitleContent , setSubtitleContent] = useState([]);
  const [subtitleNumber , setSubtitleNumber] = useState([]);


  const fetchingSubtitle = async()=>{
    const fetchedSubtitle = await fetchSubtitle(subtitleID);
    setSubtitleNumber(fetchedSubtitle.subtitleNumber);
    setSubtitleContent(fetchedSubtitle.subTitle_Content);
  }

  useEffect (()=>{
    fetchingSubtitle();
  },[]);
  

  return (
    <div className={open ? "sidebar-item open" : "sidebar-item"}  >
      <div className="sidebar-title" onClick ={()=>{setOpen(!open)}}>
        <i class="bi bi-chevron-compact-down toggle-btn"></i>
        <span>
          Section {subtitleNumber}
        </span>
      </div>
      <div className="sidebar-content">
        {/* from each subtitle get the array of subTitle_Content and insert each content and Excercise */}
        { subtitleContent.map((subtitleContent)=> {
          return (
            <SubtitleTypeCard contentID={subtitleContent.subTitle_Content_id} contentType={subtitleContent.type}/>
          );
        })}

        
      </div>
    </div>
  )
}

export default SubtitleSideBarItem