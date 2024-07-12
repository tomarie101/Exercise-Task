import "../src/components/user/UserModal";
import "../src/components/user/EditForm";
import Users from "../src/components/user/Users";
// import Articles from "../src/components/article/Articles";
import Navbar from "../src/components/layouts/Navbar";
import Home from "../src/components/layouts/Home";
import ReadArticles from "../src/components/article/ReadArticles";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <ReadArticles />
      <Users />
      {/* <Articles /> */}
    </div>
  );
}

export default App;
