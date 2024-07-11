import "../src/components/user/UserModal";
import "../src/components/user/EditForm";
import Users from "../src/components/user/Users";
import Articles from "../src/components/article/Articles";
// import Navbar from "../src/components/layouts/Navbar";

function App() {
  return (
    <div>
      <Users />
      {/* <Navbar /> */}
      <Articles />
    </div>
  );
}

export default App;
