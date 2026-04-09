import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Projects.module.css'

const projects = [
  {
    id: "01",
    title: "AR Hand Canvas (MediaPipe)",
    desc: "A real-time AR hand-tracking canvas for gesture-based drawing and interaction. Built with MediaPipe Tasks Vision (HandLandmarker) and a Vite-powered web app, featuring pinch-to-draw, palm-erase, move mode, hand-style effects, and a physics-based fingertip wire/connection mode.",
    tags: ["JavaScript", "Vite", "MediaPipe", "Hand Tracking", "Canvas", "AR"],
    color: "purple",
    award: "⭐ Featured",
    year: "2026",
    link: "https://arhandgesture.vercel.app/"
  },
  {
    id: '02',
    title: 'Movie Recommender System',
    desc: "A Machine Learning-Based Movie Recommender System That Provides Personalized Movie Suggestions Based one movie's Plot, Genre, Cast, and User Reviews. Built with Python, Pandas, and Streamlit.",
    tags: ['PANDAS', 'ML', 'AI', 'Python', 'Streamlit'],
    color: 'blue',
    award: '⭐ Featured',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/Movie-Recommender-System',
  },
  {
    id: '03',
    title: 'Medicine Recommender System',
    desc: "An AI Model That's Predictive and Accurate in Recommending Medicines Based on Symptoms. And Provide them the diets, exercise, precautions and more.",
    tags: ['PYTHON', 'FLASK', 'ML'],
    color: 'yellow',
    award: '🏆 Awwwards',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/MRS-AI',
  },
  {
    id: '04',
    title: 'Privacy Dashboard',
    desc: "Keeps Track The Students Or User's Data and web activity, prevent them from hackers, phishers, and other online threats.",
    tags: ['React.js', 'TypeScript', 'mySQL'],
    color: 'red',
    award: '✦ Selected',
    year: '2026',
    link: 'https://github.com/CodeByPrakash/privacy_dashboard',
  },
  {
    id: '05',
    title: 'Ecommerce Website',
    desc: 'An open ecommerce website built with React and Framer Motion, featuring a sleek design, smooth animations, and a user-friendly interface for seamless shopping experience.',
    tags: ['React', 'Framer Motion', 'CSS'],
    color: 'green',
    award: '🔥 Top Project',
    year: '2026',
    link: 'https://open-ecommerce.vercel.app',
  },
  {
    id: '06',
    title: 'GCEK VENDOR',
    desc: 'A website where we can rent the items for our collge or hostel work from the random student or person. It is built with React and Firebase, providing a seamless platform for users to list and rent items within their community.',
    tags: ['Next.js', 'React.js', 'mongoDB'],
    color: 'purple',
    award: '★ Case Study',
    year: '2023',
    link: 'https://gcekvendor.vercel.app',
  },
  {
    id: '07',
    title: 'Resume Builder',
    desc: 'A easy platform where the beginner can create their resume with using the stylish template and field of entering the contents. It is built with React and Tailwind CSS, providing a user-friendly interface for creating professional resumes quickly and easily.',
    tags: ['React.js', 'Tailwind CSS', 'mongoDB'],
    color: 'ink',
    award: '🎮 Resume For Future',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/ResumeBuilder-React',
  },
  {
    id: '08',
    title: 'Attend True',
    desc: 'A platform for tracking attendance and managing student records in educational institutions.and advance authentication system to ensure secure access. It is built with React and Firebase, providing a user-friendly interface for managing attendance and student records efficiently.',
    tags: ['React.js', 'NEXT.js', 'Tailwind CSS'],
    color: 'blue',
    award: '😁 READY',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/AttendTrue-Analytic',
  },
  {
    id: '09',
    title: 'Hand Gesture Controller',
    desc: 'A real-time hand gesture controller that uses computer vision to recognize and interpret hand movements, allowing users to control their devices with intuitive gestures. It is built with Python and OpenCV, providing a seamless and interactive experience for controlling devices using hand gestures.',
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    color: 'yellow',
    award: '😎 Your Hand Our Tech',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/Hand_Gesture_Controller',
  },
  {
    id: '10',
    title: 'Public DNS Switcher (Flask Web App)',
    desc: 'A Windows-only real-time web application built using Flask to change system DNS settings to popular public DNS providers like Google, Cloudflare, Quad9, etc. It provides a user-friendly interface for switching DNS servers, improving internet speed, security, and privacy with just a few clicks.',
    tags: ['Python', 'Flask', 'Windows'],
    color: 'green',
    award: '🤠 TECHIE',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/Public_DNS_Switcher',
  },
  {
    id: '11',
    title: 'Computer Lab Management System',
    desc: 'Computer_LMS (CLMS) is a powerful and user-friendly Computer Lab Management System designed to streamline the management and monitoring of multiple computer laboratories. Built using PHP, MySQL, and modern web technologies, CLMS allows administrators and lab in-charges to manage devices, systems, stocks, logs, and issues efficiently.',
    tags: ['PHP', 'MySQL', 'HTML/CSS'],
    color: 'red',
    award: '😬 SYS MNG',
    year: '2025',
    link: 'https://github.com/CodeByPrakash/Computer_LMS_LocalHost',
  },
  {
    id: '12',
    title: 'Odisha Tourist Management System',
    desc: 'A comprehensive web-based system for managing tourist information and services in Odisha. It provides features for managing tourist spots, booking services, and user reviews, built using PHP, MySQL, and modern web technologies.',
    tags: ['PHP', 'MySQL', 'HTML/CSS'],
    color: 'ink',
    award: '🤖 TOURISM',
    year: '2024',
    link: 'https://github.com/CodeByPrakash/OTM',
  },
  {
    id: '13',
    title: 'Student Management System',
    desc: 'An Adminstrative Microsoft Access Database for managing student records, attendance, and academic performance. It provides a user-friendly interface for administrators to efficiently manage student information and generate reports.',
    tags: ['Microsoft Access', 'Windows'],
    color: 'purple',
    award: '🦹‍♀️ STUDENT MNG',
    year: '2024',
    link: 'https://github.com/CodeByPrakash/SMS',
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="section-wrap">
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4 }}
        >
          ◉ Projects
        </motion.span>

        <motion.div
          className={styles.headRow}
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 className={styles.heading} variants={fadeIn('left', 0)}>
            Selected<br /><span className={styles.accent}>Work.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.05 }}
        >
          {projects.map(p => (
            <motion.a
              key={p.id}
              href={p.link}
              className={`${styles.card} ${styles[`card_${p.color}`]}`}
              variants={scaleIn(0)}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              {/* Card top */}
              <div className={styles.cardTop}>
                <span className={styles.award}>{p.award}</span>
                <span className={styles.num}>{p.id}</span>
              </div>

              {/* Thumbnail area */}
              <div className={`${styles.thumb} ${styles[`thumb_${p.color}`]}`}>
                <span className={styles.thumbLabel}>{p.title.split(' ')[0]}</span>
              </div>

              {/* Meta */}
              <div className={styles.meta}>
                <div className={styles.titleRow}>
                  <span className={styles.title}>{p.title}</span>
                  <span className={styles.arrow}>↗</span>
                </div>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.tagRow}>
                  {p.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                  <span className={styles.year}>{p.year}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
