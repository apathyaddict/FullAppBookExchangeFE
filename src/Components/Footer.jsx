import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
   <>
  
    <div className="d-flex justify-content-center align-items-center mx-auto my-2 text-white footer-div">
      <a href="https://github.com/apathyaddict/" className="footer-link" target="_blank" rel="noopener noreferrer">
        <FaGithub className="mx-2 footer-icon" size={25} />
      </a>
      <a href="https://www.linkedin.com/in/eveseni/" className="footer-link" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="mx-2 footer-icon" size={25} />
      </a>
      <a href="mailto:senieve@gmail.com" className="footer-link">
        <FaEnvelope className="mx-2 footer-icon" size={25} />
      </a>
    </div>
    <div className="text-center text-black mb-3 " >
    <p className='footer-text'> Coded with MERN | <em>Eve Aimée Seni</em> | Designed in Illustrator </p>
    </div>
  
    </>
  
  )
}

export default Footer