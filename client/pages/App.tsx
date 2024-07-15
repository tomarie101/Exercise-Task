import "../src/components/user/UserModal";
import "../src/components/user/EditForm";
import Users from "../src/components/user/Users";
// import Articles from "../src/components/article/Articles";
import Navbar from "../src/components/layouts/Navbar";
import Home from "../src/components/layouts/Home";
import Articles from "../src/components/article/Articles";
// import Create from "../src/components/article/Create";
// import { BrowserRouter as Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Articles />
      <Users />
    </div>
  );
}

export default App;
