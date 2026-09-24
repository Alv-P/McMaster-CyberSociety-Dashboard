import type {NextPage} from 'next';
import Head from 'next/head';
import {FormEvent, useEffect, useState} from 'react';
import {ContentCarousel} from '../components/content-carousel';

const announcements = [
   {tag: 'Featured', title: 'Fall Kickoff Social', body: 'Meet the community, learn about our plans, and find your next CTF teammate.', date: 'Sep 30 · 6:30 PM'},
   {tag: 'Workshop', title: 'Intro to Web Security', body: 'A hands-on starter session. Bring a laptop and your curiosity.', date: 'Oct 8 · 5:30 PM'},
];
const projects = [
   {icon: '⌘', title: 'LLM Prompt Injection Firewall', body: 'A cybersecurity project concept for screening adversarial prompts before they reach an LLM.', featured: true},
   {icon: '◈', title: 'Project title', body: 'Add a screenshot, stack, team credits, and a link when ready.'},
   {icon: '⌁', title: 'Project title', body: 'A space to show work the community is proud of.'},
];
const resources = [
   {title: 'Web Security', text: 'A practical path through browser security, common flaws, and secure coding.', links: [{label: 'PortSwigger Web Security Academy', note: 'Free, hands-on labs covering nearly every web vulnerability class.', href: 'https://portswigger.net/web-security'}, {label: 'OWASP Top 10', note: 'The standard reference for critical web application risks.', href: 'https://owasp.org/www-project-top-ten/'}, {label: 'Google XSS Game', note: 'Short, fun challenges focused on cross-site scripting.', href: 'https://xss-game.appspot.com/'}, {label: 'HackTricks', note: 'A practical exploitation wiki for reference once you are past the basics.', href: 'https://book.hacktricks.xyz/'}]},
   {title: 'CTF Starter Kit', text: 'Recommended tools, beginner-friendly challenges, and learning paths.', links: [{label: 'CTFtime.org', note: 'The CTF calendar and global rankings.', href: 'https://ctftime.org/'}, {label: 'picoCTF', note: 'Free beginner-friendly challenges from Carnegie Mellon.', href: 'https://picoctf.org/'}, {label: 'OverTheWire Wargames', note: 'Linux and binary challenge ladders for building fundamentals.', href: 'https://overthewire.org/wargames/'}, {label: 'CTF Field Guide', note: 'Trail of Bits explains categories and how to approach them.', href: 'https://trailofbits.github.io/ctf/'}]},
   {title: 'Career Toolkit', text: 'Resources for building practical, job-relevant cybersecurity skills.', links: [{label: 'TryHackMe', note: 'Guided learning paths that bridge CTF skills into job-relevant knowledge.', href: 'https://tryhackme.com/'}, {label: 'LeetCode', note: 'For the software-engineering side of interviews, not just security.', href: 'https://leetcode.com/'}, {label: 'OSCP / Security Certification Roadmap', note: 'A useful reference for students considering pentesting careers.', href: 'https://www.offsec.com/courses/pen-200/'}], tip: 'Write up your CTF solves; even short ones. Recruiters and interviewers love seeing documented problem-solving.'},
];
const ctfEvents = [
   {title: 'MapleCTF 2026', date: 'Oct 18–20 · Online', detail: 'Tell us what you’re into and we’ll help you find one.'},
   {title: 'Hack the North CTF', date: 'Nov 8–10 · Waterloo, ON', detail: 'Looking for collaborators? We can help build your team.'},
];

const socialLinks = [
   {name: 'Discord', href: 'https://discord.com/invite/TCGaMGDVuA', symbol: 'D'},
   {name: 'Instagram', href: 'https://www.instagram.com/cybersociety.mcmaster/', symbol: '◎'},
   {name: 'LinkedIn', href: 'https://www.linkedin.com/company/mcmaster-cyber-society/', symbol: 'in'},
   {name: 'Linktree', href: 'https://linktr.ee/mcybersoc', symbol: '+'},
   {name: 'Email', href: 'mailto:cybersoc@mcmaster.ca', symbol: '✉'},
];
const teamMembers = [
   {name: 'Avery Chen', role: 'Co-President', group: 'Society lead', bio: 'Guiding the society’s direction, partnerships, and student community.'},
   {name: 'Maya Patel', role: 'Vice-President, Events', group: 'Executive team', bio: 'Designing workshops, socials, and hands-on opportunities to learn.'},
   {name: 'Noah Williams', role: 'Director of Cybersecurity', group: 'Executive team', bio: 'Leading CTF programming, technical sessions, and competition teams.'},
   {name: 'Sofia Martin', role: 'Director of Outreach', group: 'Executive team', bio: 'Connecting students with mentors, sponsors, and the wider community.'},
];

const Home: NextPage = () => {
   const [menuOpen, setMenuOpen] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [heroTitle, setHeroTitle] = useState('Learn, build,|and break things.');
   const [isTypingTitle, setIsTypingTitle] = useState(false);
   const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
   useEffect(() => {
      let titleTimer: number | undefined;
      let sequence = 0;
      const pendingTimeouts = new Set<number>();
      const clearSequence = () => {
         sequence += 1;
         if (titleTimer) window.clearInterval(titleTimer);
         pendingTimeouts.forEach((timeout) => window.clearTimeout(timeout));
         pendingTimeouts.clear();
         setIsTypingTitle(false);
      };
      const wait = (callback: () => void, delay: number, id: number) => {
         const timeout = window.setTimeout(() => { pendingTimeouts.delete(timeout); if (id === sequence) callback(); }, delay);
         pendingTimeouts.add(timeout);
      };
      const typeText = (text: string, id: number, done?: () => void) => {
         let character = 0;
         titleTimer = window.setInterval(() => {
            if (id !== sequence) return;
            const nextCharacter = text[character];
            if (nextCharacter === undefined) { window.clearInterval(titleTimer); done?.(); return; }
            setHeroTitle((title) => title + nextCharacter);
            character += 1;
            if (character === text.length) { window.clearInterval(titleTimer); done?.(); }
         }, 48);
      };
      const eraseCharacters = (count: number, id: number, done: () => void) => {
         let remaining = count;
         titleTimer = window.setInterval(() => {
            if (id !== sequence) return;
            setHeroTitle((title) => title.slice(0, -1));
            remaining -= 1;
            if (!remaining) { window.clearInterval(titleTimer); done(); }
         }, 42);
      };
      const beginTitleAnimation = () => {
         clearSequence();
         if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
         const id = sequence;
         setHeroTitle('');
         setIsTypingTitle(true);
         typeText('Learn, bulid,', id, () => wait(() => eraseCharacters(6, id, () => typeText('build,', id, () => {
            typeText('|and brake things.', id, () => wait(() => eraseCharacters(13, id, () => typeText('break things.', id, () => setIsTypingTitle(false))), 350, id));
         })), 350, id));
      };
      const hero = document.querySelector('.hero');
      const observer = new IntersectionObserver(([entry]) => {
         clearSequence();
         if (!entry.isIntersecting) { setHeroTitle('Learn, build,|and break things.'); return; }
         const id = sequence;
         wait(beginTitleAnimation, 1000, id);
      }, {threshold: .55});
      if (hero) observer.observe(hero);
      return () => { observer.disconnect(); clearSequence(); };
   }, []);
   useEffect(() => {
      let previousScroll = window.scrollY;
      const header = document.querySelector('.site-header');
      const contactIntro = document.querySelector('.contact-grid > div');
      const themeToggle = document.createElement('button');
      const savedTheme = window.localStorage.getItem('mcss-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const setTheme = (dark: boolean) => {
         document.body.classList.toggle('dark-mode', dark);
         themeToggle.setAttribute('aria-pressed', String(dark));
         themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
         themeToggle.innerHTML = dark ? '<span aria-hidden="true">☀</span><span>Light</span>' : '<span aria-hidden="true">◐</span><span>Dark</span>';
         window.localStorage.setItem('mcss-theme', dark ? 'dark' : 'light');
      };
      themeToggle.className = 'theme-toggle';
      themeToggle.type = 'button';
      setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
      themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-mode')));
      header?.appendChild(themeToggle);
      const teamCarousel = document.querySelector('.values-card');
      let activeTeamMember = 0;
      let teamTimer: number | undefined;
      const renderTeamMember = () => {
         if (!teamCarousel) return;
         const member = teamMembers[activeTeamMember];
         teamCarousel.innerHTML = `<p class="card-label">Meet the team</p><article class="team-slide"><p class="team-group">${member.group}</p><h3>${member.name}</h3><p class="team-role">${member.role}</p><p class="team-bio">${member.bio}</p></article><div class="team-dots" role="tablist" aria-label="Meet the team"><span class="team-count">${String(activeTeamMember + 1).padStart(2, '0')} / ${String(teamMembers.length).padStart(2, '0')}</span>${teamMembers.map((person, index) => `<button type="button" role="tab" aria-label="Show ${person.name}" aria-selected="${index === activeTeamMember}" class="${index === activeTeamMember ? 'active' : ''}" data-team-index="${index}"></button>`).join('')}</div>`;
         teamCarousel.querySelectorAll<HTMLButtonElement>('[data-team-index]').forEach((dot) => dot.addEventListener('click', () => {
            activeTeamMember = Number(dot.dataset.teamIndex);
            renderTeamMember();
            if (teamTimer) window.clearInterval(teamTimer);
            teamTimer = window.setInterval(() => { activeTeamMember = (activeTeamMember + 1) % teamMembers.length; renderTeamMember(); }, 6000);
         }));
      };
      renderTeamMember();
      teamTimer = window.setInterval(() => { activeTeamMember = (activeTeamMember + 1) % teamMembers.length; renderTeamMember(); }, 6000);
      const socialContainer = document.createElement('div');
      socialContainer.className = 'social-links';
      socialContainer.setAttribute('aria-label', 'Follow McMaster Computer Science Society');
      socialLinks.forEach((social) => {
         const link = document.createElement('a');
         link.href = social.href;
         link.setAttribute('aria-label', social.name);
         link.title = social.name;
         if (social.name !== 'Email') { link.target = '_blank'; link.rel = 'noreferrer'; }
         link.innerHTML = `<span aria-hidden="true">${social.symbol}</span><span>${social.name}</span>`;
         socialContainer.appendChild(link);
      });
      contactIntro?.appendChild(socialContainer);
      const handleScroll = () => {
         const currentScroll = window.scrollY;
         header?.classList.toggle('header-hidden', currentScroll > 88 && currentScroll > previousScroll);
         previousScroll = currentScroll;
      };
      window.addEventListener('scroll', handleScroll, {passive: true});
      return () => { window.removeEventListener('scroll', handleScroll); socialContainer.remove(); themeToggle.remove(); if (teamTimer) window.clearInterval(teamTimer); };
   }, [submitted]);
   return <><Head><title>McMaster Computer Science Society</title><meta name="description" content="A demo dashboard for the McMaster Computer Science Society." /><link rel="icon" href="/McMaster-Cybersociety-Logo.jpg" /></Head>
      <header className="site-header"><a className="brand" href="#home" aria-label="McMaster Computer Science Society home"><img src="/McMaster-Cybersociety-Logo.jpg" alt="McMaster Computer Science Society logo" /><span><strong>McMaster</strong><small>Computer Science Society</small></span></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">☰</button><nav className={menuOpen ? 'open' : ''} aria-label="Main navigation"><a href="#updates">Updates</a><a href="#projects">Projects</a><a href="#ctf">CTFs</a><a href="#resources">Resources</a><a href="#about">About</a><a className="nav-cta" href="#contact">Get involved <span>↗</span></a></nav></header>
      <main id="home"><section className="hero section-shell"><div className="hero-copy"><p className="eyebrow">McMaster University · Hamilton, ON</p><h1 className={isTypingTitle ? 'is-typing' : ''} aria-label="Learn, build, and break things.">{heroTitle.split('|').map((line, index) => index === 0 ? <span key={index}>{line}{heroTitle.includes('|') && <br />}</span> : <em key={index}>{line}</em>)}</h1><p className="hero-text">A home for curious McMaster students to explore computer science, cybersecurity, and the people behind both.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Join the community <span>→</span></a><a className="button button-plain" href="#updates">See what&apos;s on <span>↓</span></a></div></div><aside className="next-event"><p className="card-label"><span className="status-dot" /> Next up</p><div className="event-date"><b>30</b><span>SEP<br />TUE</span></div><h2>Fall Kickoff<br />Social</h2><p>6:30 PM · TBA</p><a href="#contact">Save your spot <span>→</span></a></aside></section>
      <section id="updates" className="section-shell content-section"><div className="section-heading"><p className="eyebrow">01 / Stay in the loop</p><h2>Announcements</h2><p>Swap these demo cards with your latest society news.</p></div><ContentCarousel items={announcements} pageSize={2} className="announcement-grid" label="announcements" renderItem={(item) => <article className="announcement-card" key={item.title}><div><span className="tag">{item.tag}</span><span className="date">{item.date}</span></div><h3>{item.title}</h3><p>{item.body}</p><a href="#contact">Read update <span>→</span></a></article>} /></section>
      <section id="projects" className="section-shell content-section projects-section"><div className="section-heading"><p className="eyebrow">02 / Made at Mac</p><h2>Project showcase</h2><p>A simple gallery template for student and club work.</p></div><ContentCarousel items={projects} pageSize={3} className="project-grid" label="projects" renderItem={(project, i) => <article className="project-card" key={project.icon}><div className={`project-art art-${i + 1} ${project.featured ? 'firewall-art' : ''}`}>{project.featured ? <div className="firewall-preview" aria-label="Prompt firewall preview"><p><span>INPUT</span> Ignore prior instructions</p><div><b>SCAN</b><i>Threat detected</i></div><p><span>VERDICT</span> <strong>BLOCKED</strong></p></div> : <><span>{project.icon}</span><small>YOUR PROJECT<br />IMAGE / PREVIEW</small></>}</div><div className="project-content"><p className="card-label">{project.featured ? 'Cybersecurity project' : 'Featured project'}</p><h3>{project.title}</h3><p>{project.body}</p><a href="#contact">{project.featured ? 'View case study' : 'View project'} <span>↗</span></a></div></article>} /></section>
      <section id="ctf" className="section-shell content-section ctf-section"><div className="section-heading"><p className="eyebrow">03 / Capture the flag</p><h2>CTF central</h2><p>Keep score, find your next competition, and build your team.</p></div><div className="ctf-grid"><article className="ranking-card"><p className="card-label">Recent rankings</p><ol><li><span>1</span><b>byte_bandits</b><em>4,920 pts</em></li><li><span>2</span><b>root_access</b><em>3,840 pts</em></li><li><span>3</span><b>mcmaster_cs</b><em>3,275 pts</em></li></ol><a href="#contact">See full rankings <span>→</span></a></article><article className="upcoming-card"><p className="card-label"><span className="status-dot" /> Coming up</p><ContentCarousel items={ctfEvents} pageSize={1} className="event-carousel" label="upcoming CTFs" renderItem={(event) => <div key={event.title}><h3>{event.title}</h3><p>{event.date}</p><div className="team-callout"><span>◎</span><div><b>Looking for a team?</b><p>{event.detail}</p></div></div><a className="button button-primary" href="#contact">Register interest <span>→</span></a></div>} /></article></div></section>
      <section id="resources" className="resource-band"><div className="section-shell"><div className="section-heading"><p className="eyebrow">04 / Keep learning</p><h2>Resources for the curious</h2></div><ContentCarousel items={resources} pageSize={3} className="resource-grid" label="resources" renderItem={(resource, i) => <article className="resource-card" key={resource.title}><span>0{i + 1}</span><h3>{resource.title}</h3><p>{resource.text}</p><ul>{resource.links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer"><strong>{link.label}</strong><small>{link.note}</small></a></li>)}</ul>{resource.tip && <aside className="portfolio-tip"><b>Portfolio tip</b><p>{resource.tip}</p></aside>}</article>} /></div></section>
      <section id="about" className="section-shell content-section about-section"><div className="about-copy"><p className="eyebrow">05 / About the society</p><h2>Built for the question-askers.</h2><p>We&apos;re a student-led community making room to explore technical ideas, share what we learn, and have a great time doing it.</p><a className="button button-dark" href="#contact">Meet the team <span>→</span></a></div><div className="values-card"><p className="card-label">What guides us</p><div><span>01</span><h3>Curiosity first</h3><p>There&apos;s no such thing as a silly question here.</p></div><div><span>02</span><h3>Learn together</h3><p>Knowledge grows when it&apos;s shared.</p></div><div><span>03</span><h3>Make it real</h3><p>Turn an idea into something you can show.</p></div></div></section>
      <section id="contact" className="contact-section"><div className="section-shell contact-grid"><div><p className="eyebrow">06 / Let&apos;s talk</p><h2>Bring us your<br /><em>bright idea.</em></h2><p>Use this form as a starter for project submissions, event questions, or a general hello.</p><a href="mailto:cybersoc@mcmaster.ca">cybersoc@mcmaster.ca <span>↗</span></a></div><form onSubmit={submit}><label>Your name<input required placeholder="Jane Doe" /></label><label>Email address<input required type="email" placeholder="you@mcmaster.ca" /></label><label>What can we help with?<select defaultValue=""><option value="" disabled>Choose a topic</option><option>Project submission</option><option>Joining the society</option><option>Event question</option><option>Something else</option></select></label><label>Message<textarea required placeholder="Tell us a little more..." rows={4} /></label><button className="button button-primary" type="submit">{submitted ? 'Message received!' : 'Send message'} <span>→</span></button></form></div></section></main>
      <footer><div className="section-shell footer-inner"><a className="brand" href="#home"><img src="/McMaster-Cybersociety-Logo.jpg" alt="" /><span><strong>McMaster</strong><small>Computer Science Society</small></span></a><p>Demo dashboard template · Replace this content with your own.</p><a href="#home">Back to top ↑</a></div></footer></>;
};
export default Home;
