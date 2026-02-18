import React from "react";
import "./firebase/firebase";
import {
  Box,
  Checkbox,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";

const style = {
  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    height: "100vh",
  },
  colorPanel: {
    my: 4,
    px: 2,
    py: 2,
    width: "715px",
    background: "white",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
  },
  previewPanel: {
    my: 4,
    width: "300px",
    height: "680px",
    background: "white",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    color: "gray",
  },
  highlight: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  bgTypeOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "20px",
    mt: 1,
    width: "100%",
  },
  colorPalette: {
    mt: 2,
    display: "flex",
    gap: 2,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  colorInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
};

function ColorPicker({
  label,
  color,
  onChange,
}: {
  label: string;
  color: string;
  onChange: (color: string) => void;
}) {
  return (
    <Box sx={style.colorPalette}>
      <Box sx={style.colorInput}>
        <TextField
          label={label}
          value={color}
          onChange={(e) => onChange(e.target.value)}
          size="small"
        />
      </Box>
      <HexColorPicker color={color} onChange={onChange} />
    </Box>
  );
}

function App() {
  const [bgType, setBgType] = React.useState<string | null>("color");
  const [checked, setChecked] = React.useState(false);
  const [color, setColor] = React.useState<string>("#ff0000");
  const [midTierColor, setMidTierColor] = React.useState<string>("#00ff00");
  const [endTierColor, setEndTierColor] = React.useState<string>("#0000ff");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleBgTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBgType: string | null,
  ) => {
    setBgType(newBgType);
  };

  return (
    <Box sx={style.layout}>
      <Box sx={style.colorPanel}>
        <Typography sx={style.header}>Color Palette</Typography>
        <Typography sx={style.description}>
          Use this panel to control view’s application background in
          synchronously
        </Typography>

        <Typography sx={{ ...style.highlight, mt: 2 }}>
          Background Types{" "}
        </Typography>
        <Box sx={style.bgTypeOptions}>
          <ToggleButtonGroup
            color="primary"
            size="small"
            value={bgType}
            exclusive
            onChange={handleBgTypeChange}
          >
            <ToggleButton value="color">Color</ToggleButton>
            <ToggleButton value="gradient">Gradient</ToggleButton>
            <ToggleButton value="image">Image</ToggleButton>
          </ToggleButtonGroup>

          {bgType === "gradient" && (
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="Animation Effect"
              sx={{ ml: "auto" }}
            />
          )}
        </Box>

        {bgType === "color" && (
          <Box>
            <Typography sx={{ ...style.highlight, mt: 2 }}>
              Background Color
            </Typography>
            <ColorPicker label="Hex" color={color} onChange={setColor} />
          </Box>
        )}

        {bgType === "gradient" && (
          <Box>
            <Typography sx={{ ...style.highlight, mt: 2 }}>
              Background Color
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
              <ColorPicker label="Hex" color={color} onChange={setColor} />
              <ColorPicker
                label="Hex"
                color={midTierColor}
                onChange={setMidTierColor}
              />
              <ColorPicker
                label="Hex"
                color={endTierColor}
                onChange={setEndTierColor}
              />
            </Box>
          </Box>
        )}

        {bgType === "image" && (
          <Box>
            <Typography sx={{ ...style.highlight, mt: 2 }}>
              Image options will be here
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          ...style.previewPanel,
          background:
            bgType === "color"
              ? color
              : `linear-gradient(135deg, ${color} 0%, ${midTierColor} 50%, ${endTierColor} 100%)`,
          ...(bgType === "gradient" && checked && {
            backgroundSize: "400% 400%",
            animation: "gradientWave 8s ease infinite",
            "@keyframes gradientWave": {
              "0%": { backgroundPosition: "0% 50%" },
              "25%": { backgroundPosition: "100% 50%" },
              "50%": { backgroundPosition: "100% 100%" },
              "75%": { backgroundPosition: "0% 100%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }),
        }}
      ></Box>
    </Box>
  );
}

export default App;
