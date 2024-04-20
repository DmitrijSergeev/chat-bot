import React from "react";
import { LinearProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../app/store";

type LinearLoadingType = {
  className?: string;
};

export const LinearLoading: React.FC<LinearLoadingType> = ({ className }) => {
  const loading = useSelector<AppRootStateType, boolean>((state) => state.app.isLocalLoading);

  const stylesLinear = `linearDefault ${className}`;

  return (
    <div>
      {loading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress className={stylesLinear} color="inherit" />
        </Stack>
      )}
    </div>
  );
};
