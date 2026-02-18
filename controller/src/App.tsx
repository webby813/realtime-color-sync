import React from "react";
import "./firebase/firebase";
import { readBgConfig, updateBgConfig, BgConfig, BgType } from "./functions/realtime_db";
import PaletteIcon from '@mui/icons-material/Palette';
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
    flexDirection: "column",
    gap: 0,
    overflow: "hidden",
    position: "relative",
  },
  previewCard: {
    mx: 2,
    px: 3,
    py: 4,
    borderRadius: "20px",
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.5,
  },
  previewIcon: {
    fontSize: "48px",
    lineHeight: 1,
  },
  previewTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: "22px",
    textAlign: "center",
  },
  previewSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
  },
  previewHexPill: {
    mt: 1,
    px: 3,
    py: 1.2,
    borderRadius: "12px",
    background: "rgba(0,0,0,0.25)",
  },
  previewHexText: {
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    letterSpacing: 1,
  },
  previewBottomLabel: {
    pt: 4,
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    fontStyle: "italic",
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
  const [bgType, setBgType] = React.useState<BgType>("color");
  const [checked, setChecked] = React.useState(false);
  const [color, setColor] = React.useState<string>("#ff0000");
  const [midTierColor, setMidTierColor] = React.useState<string>("#00ff00");
  const [endTierColor, setEndTierColor] = React.useState<string>("#0000ff");
  const [image, setImage] = React.useState<string | null>(null);

  const isLoaded = React.useRef(false);

  const applyConfig = (config: BgConfig) => {
    setBgType(config.bgType);
    setChecked(config.animationEffect);
    setColor(config.colors.color);
    setMidTierColor(config.colors.midTier);
    setEndTierColor(config.colors.endTier);
    setImage(config.colors.image ?? null);
  };

  const buildConfig = (): BgConfig => ({
    bgType,
    colors: { color, midTier: midTierColor, endTier: endTierColor, image },
    animationEffect: checked,
  });

  React.useEffect(() => {
    readBgConfig().then((config) => {
      if (config) applyConfig(config);
      isLoaded.current = true;
    });
  }, []);

  React.useEffect(() => {
    if (!isLoaded.current) return;
    updateBgConfig(buildConfig());
  }, [bgType, checked, color, midTierColor, endTierColor, image]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleBgTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBgType: BgType | null,
  ) => {
    if (newBgType) setBgType(newBgType);
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
            {/* <ToggleButton value="image">Image</ToggleButton> */}
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

        {/* {bgType === "image" && (
          <Box>
            <Typography sx={{ ...style.highlight, mt: 2 }}>
              Image options will be here
            </Typography>
          </Box>
        )} */}
      </Box>

      <Box
        sx={{
          ...style.previewPanel,
          background:
            bgType === "color"
              ? `linear-gradient(135deg, ${color}, ${color}B3)`
              : `linear-gradient(135deg, ${color} 0%, ${midTierColor} 50%, ${endTierColor} 100%)`,
          ...(bgType === "gradient" && {
            backgroundSize: "400% 400%",
            backgroundPosition: "0% 50%",
          }),
          ...(bgType === "gradient" && checked && {
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
      >
        {/* Glassmorphism card */}
        <Box sx={style.previewCard}>
          {/* Palette icon */}
          <Box sx={style.previewIcon}>
            <PaletteIcon sx={{ fontSize: 48 , color: "white"}} />
          </Box>

          <Typography sx={style.previewTitle}>
            Realtime Color Sync
          </Typography>

          <Typography sx={style.previewSubtitle}>
            View
          </Typography>

          {/* Hex color pill */}
          <Box sx={style.previewHexPill}>
            <Typography sx={style.previewHexText}>
              {color.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        {/* Bottom label */}
        <Typography sx={style.previewBottomLabel}>
          {bgType === "color" ? "Solid Color" : "Gradient"}
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
