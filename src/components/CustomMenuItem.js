import {
  ExpandLess as ExpandLessIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
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
import "./CustomMenuItem.css";

const CustomMenuItem = ({ item, onSelect, selected, children }) => {
  const navigate = useNavigate();
  const collapsed = item?.route === selected

  const hasChildren = useMemo(() => {
    return Boolean(children);
  }, [children]);

  const handleCollapse = (route)=>{
    onSelect && onSelect(!collapsed ? route : null)
  }

  const handleRedirect = (route) =>{
    navigate(route)
  }

  return (
    <>
      <ListItem key={item.route} disablePadding disableGutters>
        <ListItemButton
          onClick={() => hasChildren ? handleCollapse(item.route): handleRedirect(item.route)}
        >
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.label}></ListItemText>
          {hasChildren && (
            <KeyboardArrowRightIcon
              className={`expand-icon ${collapsed ? "rotated" : ""}`}
            />
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={collapsed} timeout="auto" unmountOnExit>
          {children.map((c) => (
            <ListItem key={c.route} disablePadding disableGutters>
              <ListItemButton onClick={() => handleRedirect(c.route)}>
                <ListItemIcon>
                  <c.icon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{noWrap:true}} primary={c.label}></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default CustomMenuItem;
