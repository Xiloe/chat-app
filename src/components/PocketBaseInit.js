import PocketBase from "pocketbase";
import { useDispatch } from "react-redux";
import { setToken, setUserModel } from "@/redux/userSlice";

export const pb = new PocketBase(import.meta.env.VITE_PB_HTTP_URL);

export const PocketBaseInit = () => {
  const dispatch = useDispatch();

  pb.authStore.onChange((auth) => {
    dispatch(setToken(auth));
    dispatch(setUserModel(pb.authStore.model));
    console.log(`Token changed: ${auth}`);
    console.log(`Model changed: ${pb.authStore.model}`);
  });

  return null;
};
