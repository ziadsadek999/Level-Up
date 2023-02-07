<img src = "./client/public/assets/logo.png" style = "width: 100%; background-color:#100F0F;">

# Level Up

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Level Up is an online learning platform that an instructor can use to publish their courses and trainees can use to enrol in these courses to improve their knowledge and skills, also corporates can use it to train their employees and give them access to some learning material published on our website.

# Motivation

In the past decade people all around the world satrted heading for learning new skills through online learning platfrom and instructor started posting valuable learning materials all over the internet. The Main idea behind Level Up is to allow instructors to post the content from outside open sources and create a unified platform for online learning and that contains multiple materials from different sources.

# Features

- If you are an instructor , you can:
  - Create a course and sets its price.
  - Set promotions on your courses.
  - Upload the course content.
  - Add exercises to the course.
  - View their earnings each month.
  - See the number of enrolled trainees in each course.
  - See their ratings and reviews.
  - Search and view their courses.
  - Report any issue.
- If you are a trainee , you can:
  - Browse, search and filter all the courses published on the website.
  - View the details of any course.
  - See the trending courses.
  - Pay and enroll in a course.
  - View the content and solve the exercises of their enrolled courses.
  - Rate and review the courses they are enrolled in.
  - Rate and review the instructors of the courses they are enrolled in.
  - View the ratings and reviews of any course or instructor.
  - Report any issue.
  - Refund a course and get its amount back in their wallet.
- If you are a corporate trainee, you can:
  - Browse, search and filter all the courses published on the website.
  - View the details of any course.
  - See the trending courses.
  - Request access for a course.
  - View the content and solve the exercises of their enrolled courses.
  - Rate and review the courses they are enrolled in.
  - Rate and review the instructors of the courses they are enrolled in.
  - View the ratings and reviews of any course or instructor.
  - Report any issue.
- If you are an admin, you can:
  - Add other admins to the system.
  - Add instructors.
  - Add corporate trainees.
  - Set promotions on selected/all courses.
  - Approve access requests for courses.
  - Approve refund requests.
  - View the reported issues.

# Screenshots

### Explore

  <img src = "./client/public/assets/Explore.png" style = "width: 100%;">

### All courses

  <img src = "./client/public/assets/AllCourses.png" style = "width: 100%;">

### Sign Up

  <img src = "./client/public/assets/signup.png" style = "width: 100%;">

### Log in

  <img src = "./client/public/assets/LogIn.png" style = "width: 100%;">

### Course details

  <img src = "./client/public/assets/CourseDetails.png" style = "width: 100%;">

### Course content

  <img src = "./client/public/assets/Content.png" style = "width: 100%;">

### Solve Exercises

  <img src = "./client/public/assets/exercise.png" style = "width: 100%;">
  
### Create course

  <img src = "./client/public/assets/CreateCourse.png" style = "width: 100%;">

### Instructor profile

  <img src = "./client/public/assets/InstructorProfile.png" style = "width: 100%;">

### Instructor earnings

  <img src = "./client/public/assets/Earnings.png" style = "width: 100%;">

### Admin view reports

  <img src = "./client/public/assets/Reports.png" style = "width: 100%;">

### Admin view corporate trainees access requests for courses

  <img src = "./client/public/assets/AccessReq.png" style = "width: 100%;">

### Admin set promotion

  <img src = "./client/public/assets/adminPromotion.png" style = "width: 100%;">

# Code Style

The application is built in Client/Server architecture, where the server logic is written in `server` directory and the client is in `client` directory.

## Technology

Level Up uses a number of open source projects to work properly:

- [React](https://reactjs.org/) - Front-end
- [mui](https://mui.com/) - UI
- [React Bootstrap](https://react-bootstrap.github.io/) - UI
- [node.js] - Backend
- [Express] - Backend
- [MongoDB](https://www.mongodb.com/home) - Database

## Installation & Running

Install the dependencies and start the server.

```sh
cd client
npm i --force
cd ..
cd server
npm i
npm start
```

## Color Palette

---

The background used for the whole website is this gradient: linear-gradient(to top, #E6E9F0 0%, #EEF1F5 100%)

| Color                                                                             | Hex Code |
| --------------------------------------------------------------------------------- | -------- |
| <img src="https://www.colorhexa.com/100F0F.png" style="height:70px; width:120px"> | #100F0F  |
| <img src="https://www.colorhexa.com/297f87.png" style="height:70px; width:120px"> | #297F87  |
| <img src="https://www.colorhexa.com/9d9d9d.png" style="height:70px; width:120px"> | #9D9D9D  |
| <img src="https://www.colorhexa.com/ffffff.png" style="height:70px; width:120px"> | #FFFFFF  |

---

# Credits

This project is delivered by a group of 5 Engineering students at the German University in Cairo:

- [Ziad Ahmed Sadek](https://github.com/ziadsadek999)
- [Aya Ahmed Fayed](https://github.com/AyaFayed)
- [Aly Hassan Elsokkary](https://github.com/Elsokkary101)
- [Abdelrahman Fathy Elsalh](https://github.com/abd0123)
- [Ahmed Moneer Esmail](https://github.com/Itchyyy110)

with the help of all the amazing and supportive TAs and the great professor Dr. Mervat Abu-ElKheir.

# Contribute

If you want to cotribute to this project send us email on (onlinelearningsystem10@gmail.com). And if you have suggestion don't hesitate to open issue about it.

# License

This application is licensed under [MIT](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) and [Stripe](https://github.com/stripe/stripe-js/blob/master/LICENSE) Licenses.

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: http://nodejs.org
[express]: http://expressjs.com
