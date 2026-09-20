import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../config';
import AOS from 'aos';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaIdCard,
} from 'react-icons/fa';
import 'aos/dist/aos.css';
import logo from '../assets/bookhero.jpg';
import user1 from '../assets/testimonial/user1.jpg';
import user2 from '../assets/testimonial/user2.jpg';
import user3 from '../assets/testimonial/user3.jpg';
import user4 from '../assets/testimonial/user4.jpg';


const serviceBudgetMap = {
  Biography: ['3-5 lakh', '5-7 lakh', '7-10 lakh', '10-15 lakh', '15 lakh plus'],
  Biopic: ['3-5 lakh', '5-7 lakh', '7-10 lakh', '10-15 lakh', '15 lakh plus'],
  'Book Editing': ['50k-1 lakh', '1-2 lakh', '2-3 lakh', '3-5 lakh', '5 lakh plus'],
  Translation: ['10-25k', '25-50k', '50k-1 lakh', '1-2 lakh', '2-3 lakh', '3-5 lakh', '5 lakh plus'],
  'Documentary Making': ['3-5 lakh', '5-10 lakh', '10-15 lakh', '15-20 lakh', '20-25 lakh', '25 lakh plus'],
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    about: '',
    when: '',
    service: '',
    budget: '',
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'service' ? { budget: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await res.json();
      if (res.ok) {
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          about: '',
          when: '',
          service: '',
          budget: '',
        });
        setStatus('');
        navigate('/thankyou');
      } else setStatus('Failed to send email.');
    } catch (err) {
      setStatus('Error sending email.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-10 py-10 bg-white/80">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8" data-aos="fade-up">
          {/* Register Now */}
          <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-8" data-aos="fade-right">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="logo" className="h-12 w-12 rounded-full" />
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Register Now</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name"
                    className="w-full px-4 py-2 border border-blue-200 rounded-md" />
                </div>
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Your Email"
                    className="w-full px-4 py-2 border border-blue-200 rounded-md" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} required placeholder="Your Address"
                    className="w-full px-4 py-2 border border-blue-200 rounded-md" />
                </div>
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your Phone"
                    className="w-full px-4 py-2 border border-blue-200 rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-blue-900 font-medium mb-1">About</label>
                <textarea name="about" value={formData.about} onChange={handleChange} required rows={3} placeholder="Tell us about yourself"
                  className="w-full px-4 py-2 border border-blue-200 rounded-md resize-none" />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">When will you start?</label>
                  <select name="when" value={formData.when} onChange={handleChange} required
                    className="w-full px-4 py-2 border border-blue-200 rounded-md">
                    <option value="">Select</option>
                    <option value="Recently">Recently</option>
                    <option value="Within a week">Within a week</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="After one month">After one month</option>
                    <option value="After six month">After six month</option>
                    <option value="After one year">After one year</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Service</label>
                  <select name="service" value={formData.service} onChange={handleChange} required
                    className="w-full px-4 py-2 border border-blue-200 rounded-md">
                    <option value="">Select Service</option>
                    {Object.keys(serviceBudgetMap).map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-blue-900 font-medium mb-1">Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange} required
                  disabled={!formData.service}
                  className="w-full px-4 py-2 border border-blue-200 rounded-md disabled:opacity-50">
                  <option value="">Select Budget</option>
                  {formData.service &&
                    serviceBudgetMap[formData.service].map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                </select>
              </div>

              <button type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-md font-semibold hover:from-blue-700 hover:to-green-700">
                {status === 'Sending...' ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>

          {/* Right section with Reviews and Contact Info */}
          <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-6 flex flex-col justify-between" data-aos="fade-left">
            
            {/* Client Reviews */}
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Testimonial</h2>
              <div className="grid gap-4">
                {[
  {
    name: 'Deepak Prakash Banskota',
    review: 'The team at Book Writing Nepal transformed my ideas into a beautiful biography. The process was smooth and professional.',
    stars: 5,
    photo: user1, // example photo URL
  },
  {
    name: 'Lakpa Dendi Sherpa',
    review: 'Excellent editing and timely delivery. I highly recommend their services to aspiring authors.',
    stars: 5,
    photo: user2, // example photo URL
  },
  {
    name: 'Dambar Rai',
    review: 'Their translation work helped me publish my book internationally. Very accurate and culturally sensitive.',
    stars: 5,
    photo: user3, // example photo URL
  },
  {
    name: 'Saudamini Chalise',
    review: 'Professional, creative, and responsive. The documentary team went above and beyond.',
    stars: 5,
    photo: user4, // example photo URL
  },
].map(({ name, review, stars, photo }, idx) => (
  <div
    key={idx}
    className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-xl hover:scale-105 transition-transform duration-300 flex gap-4 items-start"
  >
    {/* Avatar */}
    <img
      src={photo}
      alt={name}
      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
    />

    {/* Text and stars */}
    <div className="flex flex-col flex-grow">
      <p className="text-blue-900 text-sm italic mb-2">"{review}"</p>
      <div className="flex items-center text-yellow-500 mb-1">
        {[...Array(Math.floor(stars))].map((_, i) => (
          <FaStar key={i} />
        ))}
        {stars % 1 >= 0.5 && <FaStarHalfAlt />}
        {[...Array(5 - Math.ceil(stars))].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
      <div className="text-right text-sm font-medium text-blue-700">– {name}</div>
    </div>
  </div>
))}

              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">Get in Touch</h3>
              <div className="text-blue-900 space-y-2 text-sm">
                <div className="flex items-center"><FaMapMarkerAlt className="mr-2 text-blue-600" />Suryabinayak-4, Bhaktapur, Nepal</div>
                <div className="flex items-center"><FaEnvelope className="mr-2 text-blue-600" />bookswritingnepal@gmail.com</div>
                <div className="flex items-center"><FaPhoneAlt className="mr-2 text-blue-600" />+977 9851230593</div>
                <div className="flex items-center"><FaIdCard className="mr-2 text-blue-600" />Company Registration No.: 219660/076/077</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Full Width */}
        {/* Text and stars (replaced with map) */}
<div className="flex flex-col flex-grow">
  <p className="text-blue-900 text-sm italic mb-2">Our Location</p>

  {/* Google Maps Embed */}
  <div className="w-full h-64 mb-2">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7062.842409090598!2d85.3603665!3d27.7351516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x65d6ac71f5a73bbd%3A0x7cb6fa6e024105a7!2sBooks%20Writing%20Nepal!5e0!3m2!1sen!2snp!4v1755536525998!5m2!1sen!2snp"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <div className="text-right text-sm font-medium text-blue-700">
    – Books Writing Nepal
  </div>
</div>

      </div>
      <Footer />
    </div>
  );
}
