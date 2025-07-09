import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    function onScroll() {
      const sections = ['about', 'projects', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const sec of sections) {
        const element = document.getElementById(sec);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <h1>Vladislav Varbanov</h1>
          <p>C# Developer | HTML & CSS</p>
          <nav>
            <a href="#about" className>About</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </nav>
        </div>
      </header>

      <section id="about" className="section fade-in">
        <div className="container about-container">
          <img
            src="/my_photo.jpg"
            alt="My Photo"
            className="profile-pic"
          />
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hello! My name is Vladislav Varbanov. I'm from Sofia, Bulgaria.
              I'm skilled in C# programming and understand the basics of Object-Oriented Programming.
              I like writing clean and efficient code.
              I also know HTML and CSS, which helps me build good-looking and well-organized web pages.
              I enjoy using both my backend and frontend skills to create complete and polished software projects.
            </p>
            <p>If you have any questions, write me a message.</p>
          </div>
        </div>
      </section>

      <section id="projects" className="section alt-bg fade-in">
        <div className="container">
          <h2>Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ToDo App
                </a>
              </h3>
              <p>A simple to-do list app that helps manage daily tasks.</p>
              <a href="">Preview</a>
            </div>

            <div className="project-car d">
              <h3>PGTKSpace</h3>
              <p>Social media about our school.</p>
              <a href="pgtkspace.com">Preview</a> 
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section fade-in">
        <div className="container">
          <h2>Contact Me</h2>

          <p>
            GitHub:{' '}
            <a href="https://github.com/vladislavvarbanov" target="_blank" rel="noopener noreferrer">
              github.com/vladislavvarbanov
            </a>
          </p>

          <form
            action="https://formspree.io/f/mwpbdbkd"
            method="POST"
            className="contact-form"
            noValidate
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
              
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
              
            </div>

            <button type="submit" className="send-button">Send Message</button>
          </form>
        </div>
      </section>

      <footer>
          
      </footer>
    </>
  );
}

export default App;
