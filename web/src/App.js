import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./css/style.css";
import moment from "moment";

import BookingForm from "./components/BookingForm";
import Button from "./components/Button";
import FilterElement from "./components/FilterElement";
// import Footer from './components/Footer'
import Key from "./components/Key";
import MyBookings from "./components/MyBookings";
import NavBar from "./components/NavBar";
import RoomsList from "./components/RoomsList";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

import { signIn, signOut, signUp } from "./api/auth";
//Api calls
//بنجيب منه كل الRooms
import { listRooms } from "./api/rooms";
//بنجيب منه كل ال Rooms
import { getDecodedToken } from "./api/token";

//ملف ال APi اللى بنعمل منه الحجز ونحذف ونعمل نجديد  لل Booking
import { makeBooking, deleteBooking, updateStateRoom } from "./api/booking";

//ملف الكالندر
import Calendar from "./components/Calendar";

//المودل اللى بيفتح لم تدوس على الحجز
import BookingModal from "./components/BookingModal";

//الفلتره
import {
  floorParams,
  filterParams,
  capacityParams,
  onFilterByFloor,
  onFilterByFeature,
  onFilterByCapacity,
  onFilterByAvailablity,
} from "./helpers/filters";

import { initialRoom } from "./helpers/rooms";

class App extends Component {

  // اهم مكان فى البروجكت كله وهنا الستاتس بتعتنا علشان نحط فيها بيانات 
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,     //بيانات الغرف
    userBookings: null, //حجوزات كل يوزر معين
    calendarDate: new Date(), // calnder date تاريخ الكالندر بتحطه بالوقت الحالى 
    selectedBooking: null, //  حجز معين  
    filterParams: filterParams,
    capacityParams: capacityParams,
    floorParam: "all",
    availabilityParam: null,
    filteredData: null,
    checked: null,  
    currentRoom: null, //الغرفه الحاليه
    error: null,  // ايرور معين 
    disableRecurring: true,
    RoomStatus: true, //حالة الغرفه
  };

  // Pass supplied first name, lastname, email & password to the signUp function, returns the user's token
  onSignUp = ({ firstName, lastName, email, password }) => {
    signUp({ firstName, lastName, email, password }).then((decodedToken) => {
      this.setState({ decodedToken });
    });
  };

  // Pass supplied email & password to the signIn function, returns the users token
  // تسجل الدخول ومنها بنحط التوكن فى الستات الخاصه بيها 
  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then((decodedToken) => {
      this.setState({ decodedToken });
    });
  };

  // Removes the current token from local storage
  // بنمسح التوكن بتاعت اليوزر لم بيعمل ساين اوت
  onSignOut = () => {
    signOut();
    this.setState({ decodedToken: null });
  };

  // الديفولت بتاعه الوقت الحالى ولكن ممكن نبعتله بارام بوقت محدد يغير الوقت بتاعه 
  setCalendarDate = (date) => {
    this.setState({ calendarDate: date });
  };

  // لم بنروح على حجز معين والباراميتر بيبعتله من الكمبوننت 
  onShowBooking = (booking) => {
    const selectedBooking = booking;
    console.log("selectedBooking", selectedBooking);
    // علشان يجى هنا ويحط السيلكت بوكينج او حجز معين 
    this.setState(() => ({ selectedBooking }));
  };

    // لم تقفل البوكينج بنرجع السيليمت بوكينج لنال تانى زى ما كانت  من المودل اللى بيفتح لينا 
  onCloseBooking = () => {
    this.setState(() => ({ selectedBooking: null }));
  };

  // Makes a booking by updating the database and the React state
  // تبعت ريكوست للسيرفر علشان يعمل حجز
  onMakeBooking = ({
    startDate,  // تاريخ بداية الحجز
    endDate,  // تاريخ نهاية الحجز 
    businessUnit, // اليونت الخاص بالحجز 
    purpose,  // الغرض 
    roomId,   // ID الغرفه 
    recurringData, // تكرارية الحجز 
    RoomStatus  // حالة الغرفه مغتوحه ولا مغلقه 

  }) => {
    // الحجز بيساوى ال 5 حجات المهمين بتوعه 
    const bookingData = { startDate, endDate, businessUnit, purpose, roomId , RoomStatus };

    // الحجوزات اللى موجوده فى الغرفه دى 
    const existingBookings = this.state.currentRoom.bookings;

    // هنعمل تشيك لو فيه كلاش فى الحوزات علشان الغرفه متتحجزش مرتين 
    // Check if there is a clash and, if not, save the new booking to the database
    try {
      // هنعمل حجز بس الاول هنشوف لو فيه كلاش فى الحجز 
      // الMMaking Book 
      // بتاخد 2 براميتر واحد للداتا كلها والتانيه للحجوزات اللى موجوده سابقا 
      makeBooking(
        {
          startDate,
          endDate,
          businessUnit,
          purpose,
          roomId,
          recurringData,
          RoomStatus
        },
        existingBookings
      ).then((updatedRoom) => {
        // لو مفيش كلاش اعمل الحجز يا كبير وطلعلى الرت ان الحجز اتعمل يا برنس 
        // If the new booking is successfully saved to the database
        alert(`${updatedRoom.name} successfully booked.`);
        // اعمل ابديت للروم ودى بتاخد 3 برام 
        // الاولى زيس ؟؟
        // التانيه الغرفه اللى اتحجزت
        // ال3 فانكيشن بتعمل ابديت لحجوزات اليوزر علشان تعمل ابديت للحجوزات الخاصه بيه 
        updateStateRoom(this, updatedRoom, this.loadMyBookings);
      });
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      // لو فيه كلاش ابعت ايرور يا معلم 
      alert(
        "Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is a valid time in the future. or the isn't CLosed in the Meanwhile"
      );
      console.log(err);
    }
  };

  // Deletes a booking from the database and updates the React state
  // احذف حجز 
  onDeleteBooking = (roomId, bookingId) => {
    deleteBooking(roomId, bookingId)
      .then((updatedRoom) => {
        alert("Booking successfully deleted");
        // نفس الفانكيشن اللى فوق 
        updateStateRoom(this, updatedRoom, this.loadMyBookings);
      })
      .catch((error) => console.error(error.message));
  };

  setRoom = (id) => {

    // هنجيب بيانات غرفه معينه من خلال رووم معينه 
    //  اول غرفه فى الاراى وهنروح نجيب بيانتها الديفولت لاول فيرست روم مش فاهم يعنى ايه بس اشطا
    const room = this.state.roomData.find((room) => room._id === id);
    this.setState({ currentRoom: room });
  };


  // setting the feature filter parameters

  onToggleFeature = (feature) => {
    // Get the filter parameters
    let filterParams = this.state.filterParams;
    // Find the filter parameter that matches the the passed parameter
    let featureParam = filterParams.find((param) => param.name === feature);
    // Toggle the value of the parameter, eg if false, set to true
    featureParam.value = !featureParam.value;
    // Set state with the updated filter parameters
    this.setState({ filterParams: filterParams });
  };

  // setting the capacity filter parameters
  onToggleCapacity = (capacity) => {
    // Get the capacity parameters
    let capacityParams = this.state.capacityParams;
    // Find the capacity parameter that matches the the passed parameter
    let capacityParam = capacityParams.find((param) => param.id === capacity);
    // Toggle the value of the parameter, eg if false, set to true
    capacityParam.value = !capacityParam.value;
    // Set state with the updated capacity parameters
    this.setState({ capacityParams: capacityParams });
  };

  // changing the boolean value for the display attribute for the recurring date input
  onToggleRecurring = (value) => {
    let disableRecurring;
    if (value === "none") {
      disableRecurring = true;
    } else {
      disableRecurring = false;
    }
    this.setState({ disableRecurring: disableRecurring });
  };

  onSetFloorParam = (value) => {
    this.setState({ floorParam: value });
  };

  onSetAvailabilityParam = (availability) => {
    this.setState({ availabilityParam: availability });
  };


  // get today's bookings for all rooms
  oneSetCurrentDateBookings = () => {
    const currentDate = moment().format("DD-MM-YYYY");
    // const roomData = this.state.roomData
    const roomData = this.state.roomData;
    // array to collect todays bookings
    let todaysBookings = [];
    // loop through all rooms
    roomData.forEach((room) => {
      // loop through all bookings for that room
      room.bookings.forEach((booking) => {
        const bookingStart = moment(booking.bookingStart).format("DD-MM-YYYY");
        if (bookingStart === currentDate) {
          todaysBookings.push(booking);
        }
      });
    });
    console.log("todays bookings:", todaysBookings);
    // return todaysBookings
  };


  //حجوزات اليور كلها وتقدر تشوف الريفرنس بتاعها من من ال load()
  //طريقه خاطئه محتاجه تعديل
  loadMyBookings = () => {
    //Empty Array علشان نضيف فيها كل الحجوزات الخاصه بالوزر
    let myBookings = [];
    const userId = this.state.decodedToken.sub;
    // Loop through all the rooms 
    // هيعمل loops على كل الغرف ويجيب الغرفه اللى الاى دى بتاعها مساو لليوزر اى دى ويحطهم فى الماى بوكينج اراى
    this.state.roomData.forEach((room) => {

      // Loop through all the bookings in 'room'
      // هنعمل لووب على كل الحجوزات فى الغرف ونشوف البوكينج اللى اليوزر بتاعه مساوى للاى دى بتاع اليوزر
      room.bookings.forEach((booking) => {
        if (booking.user === userId) {
          //فى حالة ان فيه يوزر من اللى حاجزين الاى دى بتاعه مساو للاى دى بتاع اليوزر اللى محتاج الداتا
          // Push all bookings where the current userId is equal to the booking's userId into myBookings

          // هنضيف كل الروم اى دى من الرومن للبوكينج روم اى دى فى الامبتى اراى علشان نضيف لماى بوكينجز اراى
          booking.roomId = room._id;

          myBookings.push(booking);
        }
      });
    });
    // فى النهايه اضفنا كل البوكيز لليوزر بوكينج
    this.setState({ userBookings: myBookings });
  };

  render() {

    // { الستاتس اللى هنستخدمها فى الكومبوننت كلها بعد ما مليناها بيانات }
    const {
      decodedToken,
      currentRoom,
      userBookings,
      roomData,
      calendarDate,
      selectedBooking,  
      filterParams,
      capacityParams,
      floorParam,
      availabilityParam,
      disableRecurring,
      loading,
    } = this.state;


    const signedIn = !!decodedToken;
    const signOut = this.onSignOut;
    const loadMyBookings = this.loadMyBookings;
    const onDeleteBooking = this.onDeleteBooking;
    const setCalendarDate = this.setCalendarDate;
    const Loading = require("react-loading-animation");

    let filteredData = [];
    const featureParams = this.state.filterParams;
    const date = this.state.currentDate;

    if (!!roomData) { 

      // Send all room data and the selected floor, return filtered floors and store in filteredData
      filteredData = onFilterByFloor(floorParam, roomData);
      // Send the previously filtered data along with the feature params
      filteredData = onFilterByFeature(featureParams, filteredData);
      // Send the previously filtered data along with the capacity params
      filteredData = onFilterByCapacity(capacityParams, filteredData);
      // Send the previously filtered data along with the availability
      filteredData = onFilterByAvailablity(availabilityParam, filteredData);
    }

    const requireAuth = (render) => () =>
      signedIn ? render() : <Redirect to="/" />;

    return (
      <Router>
        <div id="app" className="App">
          <Fragment>
            <Switch>
              <Route
                path="/"
                exact
                render={() =>
                  !!decodedToken && signedIn ? (
                    <Redirect to="/bookings" />
                  ) : (
                    <div className="wrapper__form">
                      <div className="header__page">
                        <h2 className="header__heading header__heading--sub--alt">
                          Sign in with email
                        </h2>
                      </div>
                      <SignInForm onSignIn={this.onSignIn} />
                      <h3 className="header__heading header__heading--sub--alt">
                        Don't have an account?
                      </h3>
                      <SignUpForm onSignUp={this.onSignUp} />
                    </div>
                  )
                }
              />

              <Route
                path="/bookings"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {!!decodedToken && !roomData && loading && (
                      <div className="loading_animation">
                        <Loading />
                      </div>
                    )}
                    {!!decodedToken && !!roomData && !loading && (
                      <div className="wrapper">
                        <div className="header header__nav header--flex">
                          <h1 className="header__heading header__heading--main">
                            Company Name Here
                          </h1>
                          <NavBar
                            signOut={signOut}
                            loadMyBookings={loadMyBookings}
                            user={signedIn ? decodedToken.sub : null}
                          />
                        </div>
                        <div className="wrapper__content">
                          <div className="header__page">
                            <h2 className="header__heading header__heading--sub">
                              Book a room |{" "}
                              {moment(calendarDate).format("MMMM Do YYYY")}
                            </h2>
                          </div>
                          <div className="sidebar">
                            <div className="sidebar__box">
                              <Calendar setCalendarDate={setCalendarDate} />
                            </div>
                            <div className="sidebar__box">
                              <FilterElement
                                onSetFloorParam={this.onSetFloorParam}
                                onToggleFeature={this.onToggleFeature}
                                onToggleCapacity={this.onToggleCapacity}
                                onSetAvailabilityParam={
                                  this.onSetAvailabilityParam
                                }
                                filterParams={filterParams}
                                capacityParams={capacityParams}
                                floorParam={floorParam}
                                availabilityParam={availabilityParam}
                                onSetTimeFilterParams={
                                  this.onSetTimeFilterParams
                                }
                                date={calendarDate}
                              />
                            </div>
                            <div className="sidebar__box">
                              <Key />
                            </div>
                          </div>
                          <div className="content">
                            <RoomsList
                              rooms={filteredData}
                              onRoomSelect={this.onRoomSelect}
                              onShowBooking={this.onShowBooking}
                              date={calendarDate}
                              onSetRoom={this.setRoom}
                              
                            />
                          </div>
                        </div>
                        <BookingModal
                          selectedBooking={selectedBooking}
                          onCloseBooking={this.onCloseBooking}
                          onDeleteBooking={onDeleteBooking}
                          roomData={roomData}
                          user={decodedToken.email}
                        />
                      </div>
                    )}
                  </Fragment>
                ))}
              />

              <Route
                path="/createbooking"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {!!decodedToken && !!roomData && !!currentRoom && (
                      <div className="wrapper">
                        <header className="header header__nav header--flex">
                          <h1 className="header__heading header__heading--main">
                            Company Name Here
                          </h1>
                          <NavBar
                            signOut={signOut}
                            loadMyBookings={loadMyBookings}
                            user={signedIn ? decodedToken.sub : null}
                          />
                        </header>
                        <div className="wrapper__content">
                          <BookingForm
                            user={decodedToken.email}
                            roomData={currentRoom}
                            onMakeBooking={this.onMakeBooking}
                            date={calendarDate}
                            disableRecurring={disableRecurring}
                            updateCalendar={setCalendarDate}
                            onShowBooking={this.onShowBooking}
                            onToggleRecurring={this.onToggleRecurring}
                          />
                        </div>
                        <BookingModal
                          selectedBooking={selectedBooking}
                          onCloseBooking={this.onCloseBooking}
                          onDeleteBooking={onDeleteBooking}
                          roomData={roomData}
                          user={decodedToken.email}
                        />
                      </div>
                    )}
                  </Fragment>
                ))}
              />

              <Route
                path="/mybookings"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {!!decodedToken && !!roomData && (
                      <div className="wrapper">
                        <div className="header header__nav header--flex">
                          <h1 className="header__heading header__heading--main">
                            Company Name Here
                          </h1>
                          <NavBar
                            signOut={signOut}
                            loadMyBookings={loadMyBookings}
                            user={signedIn ? decodedToken.sub : null}
                          />
                        </div>
                        <div className="wrapper__content--bookings">
                          <div className="header__page">
                            <h2 className="header__heading header__heading--sub">
                              My Bookings
                            </h2>
                          </div>
                          <MyBookings
                            roomData={roomData}
                            user={decodedToken.email}
                            userBookings={userBookings}
                            onDeleteBooking={onDeleteBooking}
                          />
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              />

              <Route
                render={({ location }) => (
                  <h2> Page Not Found: {location.pathname} </h2>
                )}
              />
            </Switch>
          </Fragment>
        </div>
      </Router>
    );
  }

  load() {
    const { decodedToken } = this.state;
    const signedIn = !!decodedToken;

    if (signedIn) {
      // display loading page اظهار التحميل 
      this.setState({ loading: true });
      // load all of the rooms from the database  هيحمل كل الغرف من الداتا بيز
      
      listRooms()
        .then((rooms) => {
          // رجعت داتا وبعدها حطيت كل الداتا فى ال
          //الفانكيشن Rooms state
          this.setState({ roomData: rooms });

          // load the current user's bookings 
          // حمل كل الحجوزات الخاصه باليوزر اللى فاتح الصفحه  
          this.loadMyBookings();


          // the state's current room defaults to first room
          //  اول غرفه فى الاراى وهنروح نجيب بيانتها الديفولت لاول فيرست روم مش فاهم يعنى ايه بس اشطا
          const room = this.state.roomData[0];
          this.setRoom(room._id);

          // اقفل اللودينح 
          // toggle loading page off
          this.setState({ loading: false });
        })
        .catch((error) => {
          // هنحط الايرور اللى وصلنا فى الاخر خالص 
          console.error("Error loading room data", error);
          this.setState({ error });
        });
    }
  }

  // When the App first renders
  // هنعمل رن للفانكيشن دى لم الابليكيشن يشتغل لاول مره 
  componentDidMount() {
    this.load();
  }

  // When state changes 
  // لم الستات تتغير بنغير التوكين هبقى اشوف الحوار ده انا
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load();
    }
  }
}

export default App;
