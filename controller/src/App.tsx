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
    height: "100vh",
    background: "black",
  },
  colorPanel: {
    px: 2,
    py: 2,
    width: "715px",
    background: "white",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
  },
  previewPanel: {
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
};

function App() {
  const [bgType, setBgType] = React.useState<string | null>("color");

  const [checked, setChecked] = React.useState(false);

  const [color, setColor] = React.useState<string>("#ff0000");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleBgTypeChange = (
    event: React.MouseEvent<HTMLElement>,
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

          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Enable feature"
            sx={{ ml: "auto" }}
          />
        </Box>

        {bgType === "color" && (
          <Box>
            <Typography sx={{ ...style.highlight, mt: 2 }}>
              Background Color
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <HexColorPicker color={color} onChange={setColor} />
              <Box>
                <TextField
                  label="Hex"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  size="small"
                />
                <Box
                  sx={{
                    mt: 1,
                    width: 48,
                    height: 48,
                    bgcolor: color,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {bgType === "gradient" && (
          <Box>
            <Typography sx={{ ...style.highlight, mt: 2 }}>
              Background Color
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <HexColorPicker color={color} onChange={setColor} />
              <Box>
                <TextField
                  label="Hex"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  size="small"
                />
                <Box
                  sx={{
                    mt: 1,
                    width: 48,
                    height: 48,
                    bgcolor: color,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{ mt: 2, display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <HexColorPicker color={color} onChange={setColor} />
              <Box>
                <TextField
                  label="Hex"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  size="small"
                />
                <Box
                  sx={{
                    mt: 1,
                    width: 48,
                    height: 48,
                    bgcolor: color,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{ mt: 2, display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <HexColorPicker color={color} onChange={setColor} />
              <Box>
                <TextField
                  label="Hex"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  size="small"
                />
                <Box
                  sx={{
                    mt: 1,
                    width: 48,
                    height: 48,
                    bgcolor: color,
                    borderRadius: 1,
                  }}
                />
              </Box>
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

      <Box sx={style.previewPanel}></Box>
    </Box>
  );
}

export default App;
