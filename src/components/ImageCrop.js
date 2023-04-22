import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import UIDialog from "./UIDialog";
import getCroppedImg from "../utils/images";

const ImageCrop = ({ image, onClose, onCrop, area=null }) => {
  const [crop, setCrop] = useState( area ? area : { x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea,setCroppedArea] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels)
  }, [setCroppedArea])

  const handleCropComplete =async ()=>{
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedArea,
        1
      )
      onCrop && onCrop(croppedImage, croppedArea)
    } catch (e) {
      console.error(e)
    }
  }

  // useEffect(()=>{
  //   if (Boolean(image) && Boolean(area)){
  //     setCrop(area)
  //   }
  // },[image,area])

  return (
    <UIDialog open={Boolean(image)} onClose={() => onClose()} title="Crop" primaryButton={'Crop'} onPrimaryClick={handleCropComplete}>
      <div
        style={{
          position: "relative",
          width: "30em",
          height: "30em",
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomSpeed={0.2}
        />
      </div>
    </UIDialog>
  );
};

export default ImageCrop;
