import "../src/components/user/UserModal";
import "../src/components/user/EditForm";
import Users from "../src/components/user/Users";
// import Articles from "../src/components/article/Articles";
import Navbar from "../src/components/layouts/Navbar";
import Home from "../src/components/layouts/Home";
import ReadArticles from "../src/components/article/ReadArticles";
// import Create from "../src/components/article/Create";
// import { BrowserRouter as Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      {/* <Route path="/" element={<ReadArticles />} /> */}
      {/* <Create /> */}
      <ReadArticles />
      <Users />
      {/* <Articles /> */}
    </div>
  );
}

export default App;
