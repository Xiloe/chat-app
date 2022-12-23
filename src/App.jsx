import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserModel } from "@/redux/userSlice";
import { PocketBaseInit, pb } from "./components/PocketBaseInit";

import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

let ranOnce = false;

function App() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Check if we have a token in localStorage
  // If we do, then we can try to refresh it
  useEffect(() => {
    const init = async () => {
      const data = JSON.parse(localStorage.getItem("pocketbase_auth"));
      if (data) {
        // Ensure that our data is valid and up to date
        await pb.collection("users").authRefresh();
        dispatch(setToken(pb.authStore.token));
        dispatch(setUserModel(pb.authStore.model));
      }
    };

    if (!ranOnce) {
      init();
      ranOnce = true;
    }
  }, []);

  return (
    <>
      <PocketBaseInit />
      <div className="flex flex-col justify-center items-center h-screen">
        {token ? <Dashboard /> : <Login />}
      </div>
    </>
  );
}

export default App;
