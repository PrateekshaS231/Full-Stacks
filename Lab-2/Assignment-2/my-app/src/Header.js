import React, { useState } from 'react';
import './Header.css';

const navItems = [
  { label: 'Campus', hasDropdown: true },
  { label: 'About RVU', hasDropdown: true },
  { label: 'Academics', hasDropdown: true },
  { label: 'Admissions', hasDropdown: true },
  { label: 'Faculty', hasDropdown: true },
  { label: 'Research', hasDropdown: true },
  { label: 'Events', hasDropdown: false },
  { label: 'Placements', hasDropdown: false },
  { label: 'Life at RVU', hasDropdown: false },
];

const announcementText =
  'To know the details for B.Tech. (Hons.) seat allotment schedule under JEE Main Quota, please click here | Ph.D. Admissions...';

function AnnouncementBar() {
  return (
    <div className="announcementBar">
      <div className="announcementBar__badge">LATEST UPDATES</div>
      <div className="marqueeWrapper" aria-label="University announcement">
        <div className="marqueeContent">
          <span>{announcementText}</span>
          <span>{announcementText}</span>
        </div>
      </div>
    </div>
  );
}

function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mainNav">
      <div className="logoBlock">
        <img
          className="logoIcon"
          src="https://rvu.edu.in/wp-content/uploads/2026/04/Rv_logo_1200X728.png"
          alt="RV University"
          style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }}
        />
        <div className="logoText">
          <span className="logoTitle">RV UNIVERSITY</span>
          <span className="logoTagline">Go, change the world</span>
          <span className="logoCaption">AN INITIATIVE OF RV EDUCATIONAL INSTITUTIONS</span>
        </div>
      </div>

      <nav className={`navMenu ${menuOpen ? 'navMenu--open' : ''}`}>
        <ul className="navList">
          {navItems.map((item) => (
            <li key={item.label} className="navItem">
              <a href="#" className="navLink">
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <svg viewBox="0 0 10 6" className="chevronIcon" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navActions">
        <button type="button" className="applyButton">
          Apply Now
        </button>
        <button type="button" className="searchButton" aria-label="Search site">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <AnnouncementBar />
      <MainNav />
    </header>
  );
}
