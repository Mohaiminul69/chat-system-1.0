/* eslint-disable @next/next/no-img-element */
import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <div>
          <img height={180} src="https://i.ibb.co/9VQr13M/pngegg.png" alt="" />
        </div>
        <Circle color="#8ecac1" size={60} />
      </div>
    </center>
  );
};

export default Loading;
