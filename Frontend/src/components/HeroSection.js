import React, { useEffect, useRef } from 'react';
import './HeroSection.css'; 
import Typed from 'typed.js';
import Card from "./Cards"
import Testimonial from './Testimonials';
import TestimonialImage  from "../Assets/Testimonial1.jpg";
import TestimonialImage2  from "../Assets/Testimonial2.jpg";
import TestimonialImage3  from "../Assets/man.jpg";
import Footer from './Footer';
const HeroSection = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    // Initialize Typed.js on the ref element
    const typed = new Typed(typedElement.current, {
      strings: ["Welcome to Notevault"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true, 
    });

    // Destroy Typed.js instance on unmounting to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
    <div className="hero-container">
       <h1 style={{color:"rgba(104, 0, 90, 0.75)",fontSize:"50px"}}className="auto-input" ref={typedElement}></h1>
      <h3 style={{color:"rgba(104, 0, 90, 0.75)"}}>Your ultimate note-taking solution.</h3>
    </div>
 <div className="container mt-4">
      <h2 style={{marginTop:"100px", marginBottom:"20px",fontFamily:"Poppins, Open sans, Arial, sans-serif",fontSize:"35px",marginBottom:"80px"}} className='text-center text-dark fw-bold '>Why Notevault</h2> 
 </div>
   <div className="container my-4">
      <div className="row">
        <div style={{marginBottom:"100px"}}className="col-md-4">
          <Card
            title="Easy to Use"
            description="Notevault offers a user-friendly interface that makes it simple and intuitive to take notes, organize your thoughts, and stay productive."
          />
        </div>
        <div className="col-md-4">
          <Card
            title="Feature-Rich"
            description="Packed with a variety of features, Notevault allows you to customize your notes with rich text formatting, and more."
            />
        </div>
        <div className="col-md-4">
          <Card
            title="Secure"
            description="Your notes are safe with us. Notevault uses advanced security measures to ensure your data is protected at all times."
          />
        </div>
      </div>
    </div>
    <div className="container mt-4">
      <h2 style={{marginTop:"100px", marginBottom:"20px",fontFamily:"Poppins, Open sans, Arial, sans-serif",fontSize:"35px",marginBottom:"80px"}} className='text-center text-dark fw-bold '>Testimonials</h2> 
    </div>
    <div className='row ms-4 '>
    <div className="col-md-4 ">
    <Testimonial 
          title="— Sarah L., Freelance Writer"
          description="Notevault has completely transformed the way I take and manage notes. The user-friendly interface makes it incredibly easy to jot down ideas quickly, and the rich text formatting options allow me to organize my thoughts just the way I like. I love that my notes are secure and accessible from anywhere. This app is a game-changer for productivity!"
          rating={4}
          image={TestimonialImage}/>
          </div>
          <div className="col-md-4">
          <Testimonial 
          title="— Alex P., University Student"
          description="As a college student, I need a reliable and efficient note-taking app, and Notevault has been the perfect solution. The ability to categorize and search my notes has made studying so much easier. Plus, the security features give me peace of mind knowing my notes are always safe. Highly recommend it to anyone looking for a top-notch note-taking app!"
          rating={4}
          image={TestimonialImage2}/>
          </div>
          <div className="col-md-4">
          <Testimonial 
          title="— Emily K., Entrepreneur"
          description="Since I started using Notevault, my productivity has skyrocketed. The app's sleek design and straightforward functionality make it a pleasure to use. I can quickly capture ideas and tasks, and the secure storage ensures that my information is always protected. Highly recommend it to anyone looking for a top-notch note-taking app. Notevault is the best note-taking app!"
          rating={4}
          image={TestimonialImage3}/>
          </div>
      </div>
      <Footer/>
      </>
  );
};

export default HeroSection;
