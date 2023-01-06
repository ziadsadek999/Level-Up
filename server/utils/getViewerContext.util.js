const Course = require("../models/Course.model");
const viewerContexts = require("../viewer-contexts.json");
const constants = require("../constants.json");

const getVC = async (userId, userType, courseId) => {
  const course = await Course.findById(courseId);
  if (userType === constants.admin) {
    return viewerContexts.admin;
  }
  if (
    userType === constants.instructor &&
    course.instructorInfo.instructorId.toString() === userId.toString()
  ) {
    if (course.published) {
      return viewerContexts.savedAuthor;
    }
    return viewerContexts.author;
  }
  if (course.refundingTrainees?.includes(userId)) {
    return viewerContexts.refundingTrainee;
  }
  if (course.trainees.includes(userId)) {
    return viewerContexts.enrolledTrainee;
  }
  if (userType === constants.corporateTrainee) {
    if (course.pendingTrainees?.includes(userId)) {
      return viewerContexts.pendingCorporateTrainee;
    }
    return viewerContexts.nonEnrolledCorporateTrainee;
  }
  return viewerContexts.guest;
};

module.exports = { getVC };
