import { AccountCircle as AccountCircleIcon } from "@mui/icons-material"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { useGetIdentity, useUserMenu } from "react-admin"
import { useNavigate } from "react-router-dom"

const ProfileMenuItem = () => {
    const { onClose } = useUserMenu()
  
    const { identity } = useGetIdentity()
  
    const navigate = useNavigate()
    const handleProfile = async () => {
  
      if (identity?.id) {
        onClose()
        navigate(`/user/${identity.id}/show`)
      }
    }
  
    return (
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
    )
  }

  export default ProfileMenuItem