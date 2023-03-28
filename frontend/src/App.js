import Users from "./componets/Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookings from "./componets/Bookings";
import BookingEdit from "./componets/BookingEdit";
import UserEdit from "./componets/UserEdit";
import { Container } from "react-bootstrap";
import CreateUser from "./componets/CreateUser";
import CreateBooking from "./componets/CreateBooking";
import Header from "./componets/Header";

function App() {
  return (
    <Router>
      <div
        style={{ backgroundColor: "#282c34", height: "100%", width: "100%" }}
      >
        <Header />
        <main className="py-3" style={{ backgroundColor: "#282c34" }}>
          <Container
            fluid
            style={{
              paddingRight: "5%",
              paddingLeft: "5%",
              backgroundColor: "#282c34",
            }}
          >
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/" exact element={<Bookings />} />
              <Route path="/booking/:id/edit" element={<BookingEdit />} />
              <Route path="/user/:id/edit" element={<UserEdit />} />
              <Route path="/user/create" element={<CreateUser />} />
              <Route path="/booking/create" element={<CreateBooking />} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;
