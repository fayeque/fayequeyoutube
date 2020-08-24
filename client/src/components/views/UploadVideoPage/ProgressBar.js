import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress}) => {


  return (
    <div style={{"width":`${progress}%`,"backgroundColor":"blue","height":"5px","marginTop":"10px","transition":"width 0.2s ease"}} className="progress__bar">

    </div>
  );
} 

export default ProgressBar;
