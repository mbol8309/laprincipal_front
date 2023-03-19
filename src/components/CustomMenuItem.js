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
import { useGetOne } from "react-admin";
import { useNavigate } from "react-router";
import renderIconFromString from "../utils/renderIconFromString";
import "./CustomMenuItem.css";

const CustomMenuItem = ({ item, onSelect, selected }) => {
  const navigate = useNavigate();
  const collapsed = item?.id === selected

  const hasChildren = useMemo(() => {
    return Boolean(item?.children);
  }, [item]);

  const handleCollapse = (route)=>{
    onSelect && onSelect(!collapsed ? route : null)
  }

  const handleRedirect = (route) =>{
    navigate(route)
  }



  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          onClick={() => hasChildren ? handleCollapse(item.id): handleRedirect(item.route)}
        >
          <ListItemIcon>
            {renderIconFromString(item.icon)}
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
          {item.children.map((c) => (
            <ListItem key={c.route} disablePadding disableGutters {...c.props}>
              <ListItemButton onClick={() => handleRedirect(c.route)}>
                <ListItemIcon>
                  {renderIconFromString(c.icon)}
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
