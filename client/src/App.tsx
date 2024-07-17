import Login from "../pages/Login";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 justify-content-center">
        <div className="flex items-center h-screen justify-center">
          <Login />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
