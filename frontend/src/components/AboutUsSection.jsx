import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import aboutVideo from '../assets/Video 2.mp4';

const AboutUsSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && showVideo) {
        setShowVideo(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showVideo]);

  // Prevent body scroll when modal is open
  // useEffect(() => {
  //   if (showVideo) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  // }, [showVideo]);

  // Handle keyboard to open video modal (Enter or Space)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowVideo(true);
    }
  };

  return (
    <section id="about" className="bg-gray-50 py-24 min-h-[500px]">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        {/* Video Section */}
        <div
          className="relative w-full flex justify-center items-center group cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 rounded-2xl"
          onClick={() => setShowVideo(true)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Play about video"
          role="button"
        >
          <video
            src={aboutVideo}
            className="rounded-2xl shadow-2xl object-cover w-full h-[380px] border-4 border-gray-200 pointer-events-none"
            muted
            loop
            playsInline
          >
            Sorry, your browser does not support the video tag.
          </video>
          <button
            className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform"
            aria-hidden="true"
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          >
            <span className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-7 shadow-xl text-5xl flex items-center justify-center ring-4 ring-white/60 transition-colors">
              ▶
            </span>
          </button>
        </div>

        {/* Register Now Button */}
        <HashLink
          smooth
          to="/contact#top"
          className="mt-12 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-md transition hover:scale-105"
        >
          Register Now
        </HashLink>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="About video player"
          tabIndex={-1}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 right-2 text-3xl text-gray-700 hover:text-red-500"
              onClick={() => setShowVideo(false)}
              aria-label="Close Video"
              type="button"
              style={{ pointerEvents: 'auto' }}
            >
              ×
            </button>
            <video
              src={aboutVideo}
              controls
              autoPlay
              className="rounded-xl w-full h-[420px] object-cover"
              onClick={(e) => e.stopPropagation()}
            >
              Sorry, your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUsSection;
