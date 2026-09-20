import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const [showImage, setShowImage] = useState(null);
  const visible = Math.min(3, projects.length); // Show up to 3 books at a time

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`)
      .then((res) => res.json())
      .then((data) =>
        setProjects(
          data.map((item) => ({
            title: item.title,
            image: item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`,
          }))
        )
      )
      .catch(() => setError('Could not load our books right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % projects.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [projects.length]);

  const handlePrev = () => {
    if (projects.length <= 1) return;
    setStart((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    if (projects.length <= 1) return;
    setStart((prev) => (prev + 1) % projects.length);
  };

  const visibleProjects = [];
  for (let i = 0; i < visible; i++) {
    visibleProjects.push(projects[(start + i) % projects.length]);
  }

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-16">
          Our Books
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-gray-500">No books to show yet.</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="relative">
            {projects.length > 3 && (
              <div className="absolute -top-16 right-0 flex items-center space-x-4 z-10">
                <button
                  onClick={handlePrev}
                  className="bg-white shadow-xl rounded-full w-12 h-12 flex items-center justify-center text-2xl text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
                  aria-label="Previous"
                >
                  &#8592;
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white shadow-xl rounded-full w-12 h-12 flex items-center justify-center text-2xl text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
                  aria-label="Next"
                >
                  &#8594;
                </button>
              </div>
            )}

            {/* Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 justify-center">
              {visibleProjects.map((project, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 150} // stagger animation by index
                  data-aos-once="false" // allow animation every time on scroll
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 group transition-all hover:shadow-xl hover:border-indigo-400 cursor-pointer max-w-[300px] mx-auto"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title || `Book ${idx + 1}`}
                      className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        className="bg-white rounded-full p-3 shadow text-xl hover:bg-indigo-100 transition"
                        onClick={() => setShowImage(project.image)}
                        aria-label="View Image"
                      >
                        <svg
                          className="w-7 h-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M2.05 12C3.81 7.61 7.92 4.5 12 4.5s8.19 3.11 9.95 7.5c-1.76 4.39-5.87 7.5-9.95 7.5s-8.19-3.11-9.95-7.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowImage(null)}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-3xl text-gray-700 hover:text-red-500"
              onClick={() => setShowImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={showImage}
              alt="Project"
              className="max-w-[80vw] max-h-[70vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
