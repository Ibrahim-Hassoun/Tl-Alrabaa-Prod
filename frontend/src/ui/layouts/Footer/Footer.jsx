import React, { useState } from 'react'
React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; // Import the Facebook icon
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import the Facebook icon
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; 
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; 
const Footer = () => {
  const [dropDownLocation,setDropDownLocation]=useState(false)
  
  return (
    <div className='footer mt-3 pb-3 bg-primary min-h-52'>
        <div className='containers pt-5 m-auto w-full flex flex-wrap justify-between text-start text-tertiary'>
            <div className="left w-full text-center md:w-3/5 md:text-start">
                <h1 className='font-extrabold text-4xl text-secondary'>Tl-Alrabaa</h1>
                <p className='pt-5 font-extralight '>Tl-Alrabaa, based in Erbil, Iraq, is a vibrant tobacco company that marries tradition with innovation to craft exceptional tobacco products. Renowned for its rich flavors and meticulous craftsmanship, Tl-Alrabaa appeals to shisha enthusiasts and tobacco lovers alike, offering a unique cultural experience in every puff.


</p>
            </div>
            <div className="center w-full md:w-1/5 ">
                <h1 className='font-extrabold text-3xl text-center'>Company</h1>
                <ul className='pt-5 text-center font-extralight'>
                  <li className='cursor-pointer'>About Us</li>
                  <li className='cursor-pointer'>Terms&Conditions</li>
                  <li className='cursor-pointer'>
                    
                  <span className='cursor-pointer' onClick={() => setDropDownLocation(!dropDownLocation)}>
                Locations 
                <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownLocation ? 'rotate-180' : ''}`}>&#9660;</span>
              </span> <br />
              <ul
                className={`ml-auto mr-8 w-2/5  border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownLocation ? 'max-h-40' : 'max-h-0'}`}
              >
               
                <li className={`pl-2 cursor-pointer `} ><a href="https://maps.app.goo.gl/VCXNQvV7oeZeJc1p6">Location 1</a></li>
                <li className={`pl-2 cursor-pointer`} ><a href="">Location 2</a></li>
              </ul>
                  </li>
                </ul>
            </div>
            <div className="right w-full md:w-1/5 text-center">
                <h1 className='font-extrabold text-3xl' id='contact'>Contact Us</h1>
                <ul className='pt-5 font-extralight'>
                  <li className='cursor-pointer'><a href="mailto:Tlalrabaa2021@gmail.com">Email</a></li>
                  <li className='cursor-pointer'><a href="tel:+964-0750-546-2539">Phone Number</a></li>
                  <li className='flex containers justify-around text-2xl w-full'>
                    <a href='https://www.facebook.com/p/Tl-Alrabaa-100077383218803/' target='_blank'><FontAwesomeIcon icon={faFacebook} /></a>
                    <a target='_blank' href='https://www.instagram.com/tl_alrabaa/'><FontAwesomeIcon icon={faInstagram} /></a>
                    <a target='_blank' href="tel:+964-0750-546-2539"><FontAwesomeIcon icon={faWhatsapp} /></a>
                    <a target='_blank' ><FontAwesomeIcon icon={faLinkedin} /></a>
                  </li>

                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer