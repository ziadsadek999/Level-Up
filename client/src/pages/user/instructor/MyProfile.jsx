import { useState, useEffect } from "react";
import ReviewCard from "../../../components/ReviewsCard/ReviewsCard";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import { getMyProfile } from "../../../network";
import EditMyProfileForm from "../../../components/EditMyProfileForm/EditMyProfileForm";
import userTypes from "../../../constants/UserTypes.json";
import { ReactSession } from "react-client-session";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingNo, setRatingNo] = useState(0);
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    try {
      const myProfileData = await getMyProfile();
      setName(`${myProfileData.firstName} ${myProfileData.lastName}`);
      setImg(myProfileData.image);
      setAbout(myProfileData.about);
      setRating(myProfileData.totalRating);
      setRatingNo(myProfileData.ratings.length);
      setEmail(myProfileData.email);
      setReviews(myProfileData.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (ReactSession.get("userType") === userTypes.instructor) {
    return (
      <div>
        <ProfileCard
          name={name}
          img={img}
          rating={rating}
          ratingNo={ratingNo}
        />
        <EditMyProfileForm
          email={email}
          setEmail={setEmail}
          about={about}
          setAbout={setAbout}
        />
        <ReviewCard reviews={reviews} />
      </div>
    );
  }
  return null;
};

export default MyProfile;
