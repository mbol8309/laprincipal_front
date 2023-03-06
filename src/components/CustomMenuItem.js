import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import './CustomMenuItem.css'

const CustomMenuItem = ({ item, onSelect, selected }) => {
  const navigate = useNavigate();
  const collapsed = useMemo(()=>{
    return item?.route === selected
  },[selected, item])
  

  return (
    <>
      <ListItem key={item.route} disablePadding disableGutters>
        <ListItemButton onClick={() => onSelect && onSelect(!collapsed ? item.route : null)}>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.sidebar.label}></ListItemText>
          <ExpandLessIcon className={`expand-icon ${!collapsed ? "rotated" : ""}`}/>
        </ListItemButton>
      </ListItem>
      <Collapse in={collapsed} timeout="auto" unmountOnExit>
        <ListItem key={item.route} disablePadding disableGutters>
          <ListItemButton onClick={() => navigate(item.route)}>
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.sidebar.label}></ListItemText>
          </ListItemButton>
        </ListItem>
      </Collapse>
    </>
  );
};

export default CustomMenuItem;
