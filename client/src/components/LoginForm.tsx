// import { useForm, SubmitHandler } from "react-hook-form";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// type FormValues = {
//   email: string;
//   password: string;
// };

// export function LoginForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     try {
//       const response = await axios.post("/api/login", data);
//       console.log("Login successful", response.data);
//       // Handle successful login (e.g., redirect, store token, etc.)
//     } catch (error) {
//       console.error("Login failed", error);
//       // Handle login error
//     }
//   };

//   return (
//     <Card className="w-full max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//         <CardDescription>
//           Enter your email below to login to your account.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               {...register("email", { required: "Email is required" })}
//             />
//             {errors.email && (
//               <span className="text-red-600">{errors.email.message}</span>
//             )}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               {...register("password", { required: "Password is required" })}
//             />
//             {errors.password && (
//               <span className="text-red-600">{errors.password.message}</span>
//             )}
//           </div>
//           <Button type="submit" className="w-full">
//             Sign in
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
