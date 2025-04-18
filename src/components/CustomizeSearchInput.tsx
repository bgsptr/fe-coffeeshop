import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const CustomizeSearchInput = () => {
  return (
    <Paper
      elevation={1}
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #ccc",
      }}
    >
      {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1, boxShadow: "none" }}
        placeholder="Cari ID Transaksi"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {/* <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
};
