import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import axios from "axios";

const Register: React.FC = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage("");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        email,
        userName,
        password,
        confirmPassword,
      });
      console.log(res.data);
      setSuccessMessage("User registered successfully");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to submit :", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 justify-content-center">
        <div className="flex items-center h-screen justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Register</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-ful gap-4 ">
                  <div className=" flex flex-col items-start space-y-2">
                    <Label htmlFor="email">UserName</Label>
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      id="userName"
                      type="text"
                      placeholder="UserName"
                    />
                  </div>
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
                  <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="password">Confirm Password</Label>
                    <Input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="confirmPassword"
                      type="password"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Create account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Register;
