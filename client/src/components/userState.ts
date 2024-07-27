import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: null,
    userName: "",
    email: "",
  },
});
export default userState;
