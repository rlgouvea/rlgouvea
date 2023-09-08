import "./styleHeader.scss";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { FaWarehouse } from "react-icons/fa";
import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Context } from "../../../Private";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {userData} = useContext(Context)
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    // <div className="header">
    //     <h3 onClick={() => navigate('/')}>R.L.Gouvea</h3>
    //     <FaWarehouse
    //     style={{
    //         cursor: 'pointer'
    //     }}
    //     size='2rem'
    //     onClick={()=>setOpen(!open)}
    //     />
    //     {
    //         open &&
    //         <Menu open={open} setOpen={setOpen} />
    //     }
    // </div>
    <AppBar position="static" >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <FaWarehouse
            style={{
              cursor: "pointer",
            }}
            size="2rem"
            onClick={() => setOpen(!open)}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          R.L.Gouvea
        </Typography>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign:'end' }}
        >
          {userData.name}
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={open} onClose={()=>handleClose()}>
        <Menu open={open} setOpen={setOpen} />
      </Drawer>
    </AppBar>
  );
};

export default Header;
