"use client";
import { useState } from "react";
import axios from "axios";
// import { toast } from 'react-toastify'; // Optional for notifications

function ContactForm() {
  // const [userInput, setUserInput] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setUserInput({ ...userInput, [name]: value });
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("/api/contact", userInput);

  //     if (response.status === 200) {
  //       // toast.success('Message sent successfully!');
  //       // setUserInput({ name: '', email: '', message: '' });
  //       console.log("Success");
  //     } else {
  //       // toast.error('Failed to send message.');
  //       console.log("Failed to send message.");
  //     }
  //   } catch (error) {
  //     // toast.error('Error sending message.');
  //     console.log("Failed to send message.");
  //   }
  // };

  const sendBotHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("first");
    const dataReq = await fetch(
      "https://api.telegram.org/bot7577331969:AAGYO1E1Kz_hDPu8DPhXRMUv1Gx_HdTn7Iw/getMe"
    );
    const data = await dataReq.json();
    console.log(data);
  };

  return (
    <button onClick={sendBotHandler}>Send To Bot</button>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Your Name:</label>
    //     <input type="text" name="name" value={userInput.name} onChange={handleChange} required />
    //   </div>
    //   <div>
    //     <label>Your Email:</label>
    //     <input type="email" name="email" value={userInput.email} onChange={handleChange} required />
    //   </div>
    //   <div>
    //     <label>Your Message:</label>
    //     <textarea name="message" value={userInput.message} onChange={handleChange} required />
    //   </div>
    //   <button type="submit">Send Message</button>
    // </form>
  );
}

export default ContactForm;
