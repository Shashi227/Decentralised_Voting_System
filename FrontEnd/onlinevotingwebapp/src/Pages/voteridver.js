import React, { useRef, useEffect, useState } from 'react';
//import axios from 'axios';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import '../Containers/index.css';
import { drawMesh } from "./utilities";

function VoterverifyPage() {
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  //setup reference
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);



  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 100);
  };

  

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces({ input: video });
      console.log(face);


      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      ctx.save();
      requestAnimationFrame(() => { drawMesh(face, ctx) });


    }
  };


  useEffect(() => { runFacemesh() }, []);

  const [image, setImage] = useState('');


  const showImage = () => {
    let img = webcamRef.current.getScreenshot();
    setImage(img);
    console.log(img);

  };




  return (
    <div className="VoterverifyPage">
      <header className="VoterverifyPage-header">
        {image === '' ? <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} screenshotFormat="image/jpeg"
          style={
            {
              position: "absolute",
              marginleft: "auto",
              display: "flex",
              marginright: "auto",
              left: 0,
              right: 0,
              textAlign: "centr",
              zIndex: 9,
              width: 640,
              height: 480,
            }
          }
        /> : <img src={image} alt="user" />}
        <canvas ref={canvasRef}
          style={
            {
              position: "absolute",
              display: "flex",
              marginleft: "auto",
              marginright: "auto",
              left: 0,
              right: 0,
              textAlign: "centr",
              zIndex: 9,
              width: 640,
              height: 480,
            }}
        />
      </header>
      <div>
        {image !== '' ?
          <button onClick={(e) => {
            e.preventDefault();
            setImage('')
          }}
            className="webcam-btn">
            Retake Image</button> :
          <button onClick={(e) => {
            e.preventDefault();
            showImage();
          }}
            className="webcam-btn1">Capture</button>
        }
      </div>
    </div>
  );
}


export default VoterverifyPage

