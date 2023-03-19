import { Star } from "@mui/icons-material";

import * as Icons from "@mui/icons-material";

function renderIconFromString(iconString) {
  const IconComponent = Icons[iconString];
  if (IconComponent == null) {
    return <Star />;
  } else {
    return <IconComponent />;
  }
}

export default renderIconFromString;
