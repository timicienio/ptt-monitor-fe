import { Slider, styled } from "@mui/material";

const StanceIndicator = styled(Slider)(({ theme, value = 50 }) => ({
  height: 4,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor:
      (Array.isArray(value) ? value[0] : value) == 50
        ? "#FFFFFF"
        : (Array.isArray(value) ? value[0] : value) > 50
        ? "#F49E4C"
        : "#3B8EA5",
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: 26,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: "#bfbfbf",
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    borderRadius: 5,
    height: 10,
    width: 10,
    transform: "translate(-5px, -50%)",
    "&.MuiSlider-markActive": {
      opacity: 1,
    },
  },
}));

export default StanceIndicator;
