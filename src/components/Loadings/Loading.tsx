import React from "react";
import { CircularProgress } from "@mui/material";

type LoadingPropsType = {
  size?: number;
  sx?: {};
  customStyles?: {};
};

export const Loading: React.FC<LoadingPropsType> = (props) => {
  const { size = 24, sx, customStyles = {} } = props;

  const styleCircular = {
    ...customStyles,
  };

  return <CircularProgress size={size} sx={{ ...sx, ...styleCircular }} />;
};
