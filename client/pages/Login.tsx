import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../src/components/userState";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Label } from "../src/components/ui/label";
import { Input } from "../src/components/ui/input";
import { Button } from "../src/components/ui/button";
import { ThemeProvider } from "../src/components/theme-provider";
import { ModeToggle } from "../src/components/mode-toggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      if (res.data.status === 200) {
        console.log(res.data.user);

        setUser({
          userName: res.data.user.userName,
          email: res.data.user.email,
          id: res.data.user.id,
        });
        console.log("Login");
        setEmail("");
        setPassword("");
        navigate("/articles");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Failed to submit: ", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
        <div className="absolute top-2 right-2">
          <ModeToggle />
        </div>
        <div className="flex items-center space-x-4 absolute">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <img src="/menu-icon1.png" alt="Menu" className="h-6 w-6" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col bg-gray-200 text-black">
                  <NavigationMenuLink asChild>
                    <Link to="/users">
                      <span>Users</span>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/Login">
                      <span>Logout</span>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="grid grid-cols-1 justify-content-center">
          <div className="flex items-center h-screen justify-center">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <div className="grid w-ful gap-4 ">
                    <div className=" flex flex-col items-start space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                      />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit">
                    Login Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
