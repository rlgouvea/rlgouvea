import "./stylesMenu.scss";
import { useNavigate } from "react-router-dom";

// importei react, firebase/auth e FirebaseConfig
import { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../Configs/FirebaseConfig";
import { Context } from "../../../Private";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Menu = ({ open, setOpen }) => {
  const { userRole } = useContext(Context);
  // adicionei user e userDetail
  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const navigate = useNavigate();

  // adicionei função fazerLogout
  async function fazerLogout() {
    await signOut(auth);
    setUser(false);
    setUserDetail({});
  }

  return (
    // <div onClick={()=>setOpen(false)} className="containerMenu">
    //     <div className="wrapperMenu">
    //         <ul>
    //             <li onClick={() => navigate('/')}>
    //                 Início
    //             </li>
    //             <li onClick={() => navigate('/renters')}>
    //                 Inquilinos
    //             </li>
    //             <li onClick={() => navigate('/owners')}>
    //                 Proprietários
    //             </li>
    //             <li onClick={() => navigate('/properties')}>
    //                 Imóveis
    //             </li>
    //             <li onClick={() => navigate('/reports')}>
    //                 Relatórios
    //             </li>
    //             <li onClick={() => navigate('/survey')}>
    //                 Vistorias
    //             </li>
    //             <li onClick={() => navigate('/teste')}>
    //                 Teste
    //             </li>
    //             {userRole === 'admin' &&
    //                 <li onClick={() => navigate('/admin')}>
    //                     Gerenciar Usuários
    //                 </li>
    //             }
    //             <li onClick={() => fazerLogout()}>
    //                 Sair
    //             </li>
    //             {/* <li onClick={() => navigate('/newContract')}>
    //                 Gerar Contrato
    //             </li> */}
    //         </ul>
    //     </div>
    // </div>
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        <ListItem onClick={() => navigate("/")}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Início"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate("/renters")}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Inquilinos"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate("/owners")}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Proprietários"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate("/properties")}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Imóveis"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate("/reports")}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Relatórios"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate("/survey")}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Vistorias"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {userRole === "admin" && (
          <ListItem onClick={() => navigate("/admin")}>
            <ListItemButton>
              {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
              <ListItemText primary={"Gerenciar Usuários"} />
            </ListItemButton>
          </ListItem>
        )}
        <Divider />
        <ListItem onClick={() => fazerLogout()}>
          <ListItemButton>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={"Sair"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Menu;
