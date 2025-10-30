import { Box, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from '@mui/material/Rating';

export default function ProductReview({ name, text, date, verified }) {
  return (
    <Box
      sx={{
        width: "470px",
        padding: "28px 32px",
        borderRadius: 2.5,
        border: "1px solid rgba(0, 0, 0, 0.10)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 4,
      }}
    >
      {/* Header Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
        {/* Reviewer Info */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 1 }}>
            <Rating name="read-only" value={4.5} precision={0.5} readOnly />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 20, fontWeight: 700, fontFamily: "sans-serif" }}>{name}</Typography>
            </Box>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.60)", fontSize: 16, lineHeight: "22px", fontFamily: "Satoshi, sans-serif", wordBreak: "break-word" }}>
                “{text}”
            </Typography>
        </Box>

        {/* Ellipsis / Menu Icon (right side) */}
        <RemoveIcon sx={{ color: "rgba(0, 0, 0, 0.4)" }} />
      </Box>

      {/* Date */}
      <Typography sx={{ color: "rgba(0, 0, 0, 0.60)", fontSize: 16, fontWeight: 500, fontFamily: "Satoshi, sans-serif" }}>
        Posted on {date}
      </Typography>
    </Box>
  );
}
