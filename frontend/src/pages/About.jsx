import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bookLogo from '../assets/bookhero.jpg';
import {
  PenTool,
  CheckCircle2,
  Languages,
  BookOpen,
  Share2,
  Video,
  ShieldCheck,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: 'Custom Book Writing',
    nepaliTitle: 'पुस्तक लेखन',
    desc: 'Write book in your style and voice via regular dialogue, existing documents, and in-depth interviews.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100 hover:border-blue-300',
  },
  {
    icon: CheckCircle2,
    title: 'Manuscript Editing & Polishing',
    nepaliTitle: 'सम्पादन तथा परिमार्जन',
    desc: 'Refine, mature, and standardise self-written manuscripts—enhancing language, grammar, flow, and narrative structure.',
    color: 'from-purple-500/10 to-pink-500/10',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-100 hover:border-purple-300',
  },
  {
    icon: Languages,
    title: 'Professional Translation',
    nepaliTitle: 'स्तरीय अनुवाद',
    desc: 'High-standard translation in Nepali, English, and other tongues without losing original soul and emotion.',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-100 hover:border-emerald-300',
  },
  {
    icon: BookOpen,
    title: 'Publishing, Layout & Design',
    nepaliTitle: 'प्रकाशन तथा डिजाइन',
    desc: 'End-to-end technical support: bespoke cover design, interior page layout, typesetting, printing, and publication.',
    color: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100 hover:border-amber-300',
  },
  {
    icon: Share2,
    title: 'Marketing & Distribution',
    nepaliTitle: 'बजार व्यवस्थापन तथा वितरण',
    desc: 'Facilitate marketing, book launches, media promotion, and distribution through traditional bookstores and modern digital channels.',
    color: 'from-cyan-500/10 to-blue-500/10',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-100 hover:border-cyan-300',
  },
  {
    icon: Video,
    title: 'Multimedia & Adaptations',
    nepaliTitle: 'अडियो तथा भिडियो रूपान्तरण',
    desc: 'Create audiobooks, commemorative photo books, and documentary or biopic adaptations crafted directly from your life story.',
    color: 'from-rose-500/10 to-pink-500/10',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-100 hover:border-rose-300',
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: '100% Privacy & Full Copyright',
    desc: 'Full privacy for your story and personal details. You own complete copyright. Your book is never posted to websites or social media without consent, with full option to publish under your own firm or name.',
    badge: 'Confidentiality Guaranteed',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    icon: Award,
    title: 'Skilled Literary Masters',
    desc: 'Our writers and editors hold deep backgrounds in Nepali literature, journalism, creative writing, and the professional editorial field.',
    badge: 'Seasoned Writers',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    icon: Heart,
    title: 'Authentic Voice & Emotion',
    desc: 'We are dedicated to keeping your original thoughts, lived experiences, cultural context, and raw human emotions genuinely intact.',
    badge: 'Your True Voice',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    icon: Sparkles,
    title: 'Frictionless End-to-End Service',
    desc: 'From a completely blank page until the printed book is resting in your hands. Complete post-publication promotion and nationwide distribution support included.',
    badge: 'Turnkey Solution',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-slate-50 pt-16 pb-20 px-4">
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Logo & Header Badge */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white rounded-2xl shadow-md border border-purple-100">
              <img
                src={bookLogo}
                alt="Books Writing Nepal Logo"
                className="w-32 md:w-36 h-auto object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Nepal's Premier Book Writing &amp; Publishing House</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight leading-tight mb-4">
            About <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Books Writing Nepal</span>
          </h1>

          {/* Bilingual Slogan */}
          <div className="mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-[#0071BC]">तपाईंको कथा,</span>{' '}
              <span className="text-[#008000]">हामी लेखिदिन्छाैं</span>
            </p>
            <p className="text-lg sm:text-xl font-medium text-gray-500 italic">
              "Your story, we write."
            </p>
          </div>

          {/* Intro Story / Narrative */}
          <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-2xl p-6 sm:p-10 shadow-lg text-left max-w-4xl mx-auto space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
            <p>
              Every person's life is rich with experiences, struggles, hard-won victories, and unique thoughts that have the power to educate and inspire others. But lack of time, language hesitation, and missing technical know-how often keep these priceless tales trapped inside one's head.
            </p>
            <p>
              <strong className="text-blue-900 font-semibold">Books Writing Nepal</strong> is the leading professional book-writing and publishing partner in Nepal, committed to turning untold personal stories and expertise into beautiful, readable, and enduring books.
            </p>
            <p>
              Whether it is an <em>Autobiography, Business Memoir, academic research work, or a creative novel</em>—our team of seasoned writers and editors is ready to shape your thoughts with the right words and structure into an outstanding book. We also provide complete promotion and distribution support across traditional bookstores and modern digital channels.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Banner */}
      <section className="max-w-5xl mx-auto px-4 -mt-6 mb-20 w-full">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur shrink-0 border border-white/20">
              <Compass className="w-10 h-10 text-pink-300" />
            </div>
            <div>
              <span className="uppercase tracking-widest text-xs font-bold text-pink-300">
                Our Core Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 mb-3">Our Mission</h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                "To document the invaluable experiences, insights, and wisdom of inspiring figures, entrepreneurs, social workers, scholars, and ordinary folk into enduring books; passing them down with honor to future generations."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">
            End-to-End Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mt-2 mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            From your very first idea to a published masterpiece on bookshelves, we handle every stage of the book creation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border ${item.borderColor} flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} ${item.iconColor} mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-semibold text-gray-400 mb-1">
                    {item.nepaliTitle}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white mt-16 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">
              Our Commitments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mt-2 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              We uphold the highest standards of discretion, literary excellence, and authorship protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex gap-5 items-start"
                >
                  <div className="p-3.5 bg-white rounded-xl shadow-sm text-purple-700 border border-purple-100 shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Bring Your Story to Life?
          </h2>
          <p className="text-purple-100 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Don't let your memories, wisdom, and life experiences fade away. Speak with our editorial team today and begin your author journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <HashLink
              smooth
              to="/contact#top"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-purple-900 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all text-base"
            >
              Start Free Consultation
              <ArrowRight className="w-5 h-5" />
            </HashLink>

            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-900/40 border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-purple-900/60 transition-all text-base"
            >
              Explore Published Books
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

