import React, { useEffect, useState } from 'react';
import Header from './Header';

const skills = [
  { name: 'React', percent: 95 },
  { name: 'JavaScript', percent: 92 },
  { name: 'Node.js', percent: 84 },
  { name: 'UI/UX Design', percent: 88 },
  { name: 'REST APIs', percent: 80 },
  { name: 'Problem Solving', percent: 90 },
];

const education = [
  {
    title: 'BCA',
    school: 'RV University',
    period: '2023 - Present',
    description: 'Studying computer applications with a focus on software development, web technologies, and problem solving.',
  },
  {
    title: 'Web Development Foundations',
    school: 'Self-Learned / Practical Projects',
    period: '2024',
    description: 'Built responsive web experiences and small React-based portfolio projects.',
  },
];

const experience = [
  {
    title: 'Frontend Developer Intern',
    company: 'PixelForge Studio',
    period: '2023',
    description: 'Built responsive landing pages and improved dashboard usability with React components.',
  },
  {
    title: 'Junior Software Engineer',
    company: 'CloudNest Solutions',
    period: '2024 - Present',
    description: 'Developed scalable applications, integrated APIs, and collaborated on product design initiatives.',
  },
];

const projects = [
  {
    title: 'E-Commerce Admin Dashboard',
    description: 'A data-rich dashboard for managing inventory, orders, and sales insights using React and API-driven widgets.',
    tech: ['React', 'Charting', 'REST API'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    link: 'https://github.com/',
  },
  {
    title: 'Portfolio Builder',
    description: 'An interactive portfolio creator that lets users structure profiles, projects, and contact details quickly.',
    tech: ['React', 'Hooks', 'Responsive UI'],
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    link: 'https://github.com/',
  },
];

const initialGallery = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    name: 'Desk Setup',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    name: 'Team Collaboration',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    name: 'Creative Workflow',
  },
];

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function App() {
  const [isDark, setIsDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-gallery');
      return saved ? JSON.parse(saved) : initialGallery;
    } catch {
      return initialGallery;
    }
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('portfolio-gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = isDark
    ? {
        bg: '#0b1020',
        panel: '#121a33',
        panelAlt: '#1a2447',
        text: '#f5f7ff',
        muted: '#aeb8db',
        accent: '#7c9cff',
        accentSoft: 'rgba(124, 156, 255, 0.15)',
        border: 'rgba(255,255,255,0.12)',
      }
    : {
        bg: '#f5f7fb',
        panel: '#ffffff',
        panelAlt: '#eef2ff',
        text: '#172033',
        muted: '#5c6785',
        accent: '#4b6bff',
        accentSoft: 'rgba(75,107,255,0.12)',
        border: 'rgba(23,32,51,0.08)',
      };

  const handleGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const uploadedImages = await Promise.all(
      files.map(async (file, index) => ({
        id: Date.now() + index + Math.random(),
        src: await readFileAsDataURL(file),
        name: file.name,
      }))
    );

    setGallery((prev) => [...uploadedImages, ...prev]);
    event.target.value = '';
  };

  const handleReplaceImage = async (id, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const src = await readFileAsDataURL(file);
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, src, name: file.name } : item))
    );
    event.target.value = '';
  };

  const handleDeleteImage = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thanks for reaching out! Your message has been captured locally in this demo.');
    setFormData({ name: '', email: '', message: '' });
  };

  const resumeData = encodeURIComponent(
    'Prateeksha\nStudent\nEmail: prateekshas24bca@rvu.edu.in\nPhone: +91 1234567890 \nPortfolio: https://github.com/'
  );

  const sectionLinkStyle = {
    color: theme.text,
    textDecoration: 'none',
    fontWeight: 600,
    padding: '8px 12px',
    borderRadius: 999,
    transition: '0.25s ease',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        color: theme.text,
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        a { color: inherit; }
        .nav-link:hover,
        .project-card:hover,
        .skill-card:hover,
        .timeline-card:hover,
        .experience-card:hover,
        .gallery-item:hover,
        .contact-card:hover,
        .hero-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.14);
        }
        .project-card,
        .skill-card,
        .timeline-card,
        .experience-card,
        .gallery-item,
        .contact-card,
        .hero-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }
        .gallery-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 16px;
          display: block;
        }
        @media (max-width: 900px) {
          .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
        }
        @media (max-width: 680px) {
          .section { padding: 56px 18px !important; }
          .hero-title { font-size: 2.2rem !important; }
          .hero-sub { font-size: 1rem !important; }
          .topbar { padding: 0 14px !important; }
        }
      `}</style>

      <Header />

      <main style={{ paddingTop: 160 }}>
        <section id="home" className="section" style={{ padding: '82px 24px 64px' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: 28,
              alignItems: 'center',
            }}
          >
            <div className="hero-card" style={{ background: theme.panel, borderRadius: 28, padding: 28, border: `1px solid ${theme.border}` }}>
              <p style={{ color: theme.accent, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>Student</p>
              <h1 className="hero-title" style={{ fontSize: '3.25rem', margin: '8px 0 12px', lineHeight: 1.05 }}>
                Prateeksha
              </h1>
              <div className="hero-sub" style={{ fontSize: '1.1rem', color: theme.muted, marginBottom: 18 }}>
                I build intuitive, high-performing web experiences with a strong eye for design and user-first engineering.
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={`data:text/plain;charset=utf-8,${resumeData}`}
                  download="Alex-Carter-Resume.txt"
                  style={{
                    textDecoration: 'none',
                    background: theme.accent,
                    color: '#fff',
                    padding: '12px 18px',
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                >
                  Download Resume
                </a>
                <a href="#projects" style={{ ...sectionLinkStyle, background: theme.accentSoft }}>
                  View Projects
                </a>
              </div>
            </div>

            <div className="hero-card" style={{ background: theme.panel, borderRadius: 28, padding: 24, border: `1px solid ${theme.border}`, display: 'grid', placeItems: 'center' }}>
              <img
                src="https://i.pinimg.com/1200x/83/7a/0c/837a0cd6e7d7a09b1b15d996b1eec60c.jpg"
                alt="Profile"
                style={{ width: '100%', maxWidth: 380, height: 420, objectFit: 'cover', borderRadius: 24 }}
              />
            </div>
          </div>
        </section>

        <section id="about" className="section" style={{ padding: '32px 24px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="contact-card" style={{ background: theme.panel, padding: 24, borderRadius: 24, border: `1px solid ${theme.border}` }}>
                <h2 style={{ marginTop: 0 }}>About Me</h2>
                <p style={{ color: theme.muted, lineHeight: 1.8 }}>
                  I am a versatile frontend developer with a passion for translating complex ideas into elegant interfaces.
                  My work blends performance optimization, accessibility, responsive design, and polished user interaction.
                </p>
              </div>
              <div className="contact-card" style={{ background: theme.panelAlt, padding: 24, borderRadius: 24, border: `1px solid ${theme.border}` }}>
                <h2 style={{ marginTop: 0 }}>Personal Details</h2>
                <ul style={{ color: theme.muted, lineHeight: 2, paddingLeft: 20 }}>
                  <li><strong style={{ color: theme.text }}>Location:</strong> Karnataka, India</li>
                  <li><strong style={{ color: theme.text }}>Email:</strong> prateekshasbca24@rvu.edu.in</li>
                  <li><strong style={{ color: theme.text }}>Phone:</strong> +91 1234567890</li>
                  <li><strong style={{ color: theme.text }}>Availability:</strong> Open to exciting opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section" style={{ padding: '24px 24px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 20 }}>Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
              {skills.map((skill) => (
                <div key={skill.name} className="skill-card" style={{ background: theme.panel, padding: 20, borderRadius: 20, border: `1px solid ${theme.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <strong>{skill.name}</strong>
                    <span style={{ color: theme.accent }}>{skill.percent}%</span>
                  </div>
                  <div style={{ height: 10, background: theme.accentSoft, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${skill.percent}%`, height: '100%', background: theme.accent, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section" style={{ padding: '24px 24px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 20 }}>Education</h2>
            <div style={{ display: 'grid', gap: 18 }}>
              {education.map((item) => (
                <div key={item.title} className="timeline-card" style={{ background: theme.panel, padding: 20, borderRadius: 20, border: `1px solid ${theme.border}` }}>
                  <div style={{ color: theme.accent, fontWeight: 700, marginBottom: 6 }}>{item.period}</div>
                  <h3 style={{ margin: '0 0 6px' }}>{item.title}</h3>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{item.school}</div>
                  <p style={{ margin: 0, color: theme.muted }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section" style={{ padding: '24px 24px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 20 }}>Experience</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {experience.map((item) => (
                <div key={item.title} className="experience-card" style={{ background: theme.panel, padding: 20, borderRadius: 20, border: `1px solid ${theme.border}` }}>
                  <div style={{ color: theme.accent, fontWeight: 700, marginBottom: 6 }}>{item.period}</div>
                  <h3 style={{ margin: '0 0 6px' }}>{item.title}</h3>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{item.company}</div>
                  <p style={{ margin: 0, color: theme.muted }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section" style={{ padding: '24px 24px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 20 }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {projects.map((project) => (
                <div key={project.title} className="project-card" style={{ background: theme.panel, borderRadius: 24, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
                  <div style={{ padding: 20 }}>
                    <h3 style={{ marginTop: 0 }}>{project.title}</h3>
                    <p style={{ color: theme.muted, lineHeight: 1.7 }}>{project.description}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                      {project.tech.map((tag) => (
                        <span key={tag} style={{ background: theme.accentSoft, color: theme.accent, padding: '6px 10px', borderRadius: 999, fontSize: '0.88rem' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', textDecoration: 'none', background: theme.accent, color: '#fff', padding: '10px 14px', borderRadius: 999, fontWeight: 700 }}>
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section" style={{ padding: '24px 24px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <h2 style={{ margin: 0 }}>Editable Gallery</h2>
              <label style={{ cursor: 'pointer', background: theme.accent, color: '#fff', padding: '10px 14px', borderRadius: 999, fontWeight: 700 }}>
                Upload Images
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="gallery-grid">
              {gallery.map((item) => (
                <div key={item.id} className="gallery-item" style={{ background: theme.panel, padding: 12, borderRadius: 20, border: `1px solid ${theme.border}` }}>
                  <img className="gallery-img" src={item.src} alt={item.name} onClick={() => setSelectedImage(item)} style={{ cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 10 }}>
                    <span style={{ fontSize: '0.92rem', color: theme.muted }}>{item.name}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <label style={{ cursor: 'pointer', background: theme.accentSoft, color: theme.accent, padding: '6px 10px', borderRadius: 999, fontSize: '0.84rem', fontWeight: 700 }}>
                        Replace
                        <input type="file" accept="image/*" onChange={(event) => handleReplaceImage(item.id, event)} style={{ display: 'none' }} />
                      </label>
                      <button onClick={() => handleDeleteImage(item.id)} style={{ border: 'none', background: '#ff5b74', color: '#fff', padding: '6px 10px', borderRadius: 999, cursor: 'pointer', fontWeight: 700 }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section" style={{ padding: '24px 24px 82px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="contact-card" style={{ background: theme.panel, padding: 24, borderRadius: 24, border: `1px solid ${theme.border}` }}>
                <h2 style={{ marginTop: 0 }}>Contact Me</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text }}
                    required
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email address"
                    style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text }}
                    required
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message"
                    rows="5"
                    style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, resize: 'vertical' }}
                    required
                  />
                  <button type="submit" style={{ border: 'none', background: theme.accent, color: '#fff', padding: '12px 16px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                    Send Message
                  </button>
                </form>
              </div>

              <div className="contact-card" style={{ background: theme.panelAlt, padding: 24, borderRadius: 24, border: `1px solid ${theme.border}` }}>
                <h2 style={{ marginTop: 0 }}>Social Links</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ ...sectionLinkStyle, background: theme.panel, border: `1px solid ${theme.border}` }}>LinkedIn</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" style={{ ...sectionLinkStyle, background: theme.panel, border: `1px solid ${theme.border}` }}>GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            right: 18,
            bottom: 18,
            border: 'none',
            borderRadius: 999,
            width: 52,
            height: 52,
            cursor: 'pointer',
            background: theme.accent,
            color: '#fff',
            fontSize: '1.4rem',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
          }}
        >
          ↑
        </button>
      )}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.72)',
            display: 'grid',
            placeItems: 'center',
            padding: 16,
            zIndex: 1200,
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, maxWidth: 800, width: '100%', padding: 16 }}>
            <img src={selectedImage.src} alt={selectedImage.name} style={{ width: '100%', height: 'auto', maxHeight: 70 + 'vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
              <strong>{selectedImage.name}</strong>
              <button onClick={() => setSelectedImage(null)} style={{ border: 'none', background: '#111', color: '#fff', padding: '8px 12px', borderRadius: 999, cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
