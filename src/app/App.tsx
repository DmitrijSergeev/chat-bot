import { ThemeProvider } from '@/common/hoc/ThemeProvider/ThemeProvider'
import {useEffect} from "react";
import {appThunks} from "@/app/appSlice";
import {useAppDispatch, useAppSelector} from "@/common/hooks/hooks";
import {Loading} from "@/components/Loadings/Loading";

export function App() {
  const dispatch = useAppDispatch();
  const isAppInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(appThunks.initializeApp());
  }, [dispatch]);

  if (!isAppInitialized) {
    return (
        <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
          <Loading size={50} sx={{ color: "gray" }} />
        </div>
    );
  }

  return <ThemeProvider>Hello</ThemeProvider>
}
