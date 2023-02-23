import { Icon } from '@iconify/react';

export default function MapZoomButtons({
  handleZoomIn,
  handleZoomOut,
}: {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}) {
  const buttonStyle = {
    height: "48px",
    width: "48px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
  };

  return (
    <div
      className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col w-12 rounded-md"
      style={{
        backgroundColor: "black",
      }}
    >
      <button
        aria-label="Zoom in button for the map"
        onClick={handleZoomIn}
        style={buttonStyle}
      >
        <Icon icon="ic:round-plus" />
      </button>
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "4px auto",
          height: "1px",
        }}
      ></div>
      <button
        aria-label="Zoom out button for the map"
        onClick={handleZoomOut}
        style={buttonStyle}
      >
        <Icon icon="ic:round-minus" />
      </button>
    </div>
  );
}
