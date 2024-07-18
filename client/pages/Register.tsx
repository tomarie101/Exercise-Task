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

const Login: React.FC = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Register</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-ful gap-4 ">
          <div className=" flex flex-col items-start space-y-2">
            <Label htmlFor="email">UserName</Label>
            <Input id="userName" type="text" placeholder="UserName" />
          </div>
          <div className=" flex flex-col items-start space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
