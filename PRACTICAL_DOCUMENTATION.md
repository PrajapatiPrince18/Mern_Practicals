# Ganpat University
## Department of Computer Science

### M.SC(CA & IT) SEM - 1 Practical Documentation
**Subject:** MERN Stack Development  
**Academic Year:** 2026-2027  

**Submitted by:**  
**Name:** Prince Prajapati  
**Enrolment Number:** 26084231038  

---

## Index of Practicals

| Practical No. | Practical Title | Page / Section |
| :---: | :--- | :---: |
| **01** | Build a React application using Functional Components, JSX and Component Reusability concepts. | [Practical 01](#practical--01--build-a-react-application-using-functional-components-jsx-and-component-reusability-concepts) |
| **02** | Develop a React application implementing Props, State Management and Event Handling. | [Practical 02](#practical--02--develop-a-react-application-implementing-props-state-management-and-event-handling) |
| **03** | Create a Student Management System using React Forms, Controlled Components and Validation. | [Practical 03](#practical--03--design-a-student-management-form-with-controlled-components-multi-field-regex-validations-and-crud) |
| **04** | Develop a Single Page Application (SPA) using React Router for navigation between multiple pages. | [Practical 04](#practical--04--build-a-single-page-application-spa-using-react-router-dom-with-dynamic-routing-nested-navigation-and-url-parameters) |
| **05** | Create a backend server using Express.js implementing routing and CRUD operation. | [Practical 05](#practical--05--develop-an-expressjs-backend-server-implementing-modular-routing-custom-middleware-and-full-restful-crud-operations) |
| **06** | Build RESTful APIs for Student Records Management using Express.js and Postman testing. | [Practical 06](#practical--06--develop-a-student-records-rest-api-using-expressjs-with-json-data-store-http-status-codes-validation-middleware-and-postman-collection) |
| **07** | Develop an Employee Management API integrating Express.js with MongoDB Atlas. | [Practical 07](#practical--07--develop-a-complete-employee-management-restful-api-using-expressjs-and-mongodb-mongoose-odm-with-schema-validation-and-aggregations) |

---

<div style="page-break-after: always;"></div>

# Practical – 01 : Build a React application using Functional Components, JSX and Component Reusability concepts.

### 1. Commands :
```bash
npm create vite@latest MERN_01
cd MERN_01
npm install
npm run dev
```

### 2. Project structure :
```text
MERN_01/
|-- src/
|   |-- components/
|   |   |-- Header.jsx
|   |   |-- Button.jsx
|   |   |-- Card.jsx
|   |   |-- Badge.jsx
|   |   |-- CourseCard.jsx
|   |   |-- Footer.jsx
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- package.json
|-- index.html
```

### 3. Source Code :

#### • `src/App.jsx` :
```jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import CourseCard from './components/CourseCard';
import Button from './components/Button';
import Badge from './components/Badge';

function App() {
  const coreConcepts = [
    {
      id: 1,
      icon: '⚛️',
      title: 'Functional Components',
      description: 'JavaScript functions that accept props as an argument and return JSX. They are simpler, lightweight, and modern standard in React.',
      category: 'React Core',
    },
    {
      id: 2,
      icon: '✨',
      title: 'JSX Syntax',
      description: 'JavaScript XML allows writing HTML-like syntax inside JavaScript, transpiled to React.createElement() calls for high readability.',
      category: 'Syntax',
    },
    {
      id: 3,
      icon: '🧩',
      title: 'Component Reusability',
      description: 'Building isolated, reusable UI blocks (Buttons, Cards, Badges) that receive dynamic props to adapt across different application views.',
      category: 'Architecture',
    }
  ];

  const courses = [
    {
      id: 'CS101',
      courseCode: 'REACT-101',
      title: 'Modern React with JSX',
      instructor: 'Dr. John Doe',
      duration: '6 Weeks',
      level: 'Beginner',
      rating: 4.8
    },
    {
      id: 'CS102',
      courseCode: 'NODE-201',
      title: 'Backend Mastery with Express',
      instructor: 'Prof. Jane Smith',
      duration: '8 Weeks',
      level: 'Intermediate',
      rating: 4.9
    },
    {
      id: 'CS103',
      courseCode: 'MERN-301',
      title: 'Full Stack MERN Architecture',
      instructor: 'Alex Johnson',
      duration: '12 Weeks',
      level: 'Advanced',
      rating: 4.7
    }
  ];

  const handleEnroll = (courseTitle) => {
    alert(`⚛️ Successfully enrolled in: ${courseTitle}`);
  };

  const handleLearnMore = (conceptTitle) => {
    alert(`⚛️ Exploring details for: ${conceptTitle}`);
  };

  return (
    <div className="app-container">
      <Header
        practicalNo="Practical No. 01"
        title="Functional Components, JSX & Reusability"
        subtitle="Demonstrating React Functional Component Architecture, JSX templating, and reusable UI components"
      />

      <main className="main-content">
        <div className="concept-box">
          <h3>⚛️ Practical Objective</h3>
          <p>
            Build a clean React application utilizing Functional Components, JSX expressions, and modular
            Component Reusability. Reusable components like <code>Button</code>, <code>Badge</code>, <code>Card</code>,
            and <code>CourseCard</code> are reused throughout the interface with varying props.
          </p>
        </div>

        <section className="section">
          <h2 className="section-title">
            <span>⚛️</span> Core React Concepts (Reusable Card Component)
          </h2>
          <p className="section-desc">
            The same <code>&lt;Card /&gt;</code> component is reused 3 times with different props data.
          </p>

          <div className="grid-3">
            {coreConcepts.map((item) => (
              <Card
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
                category={item.category}
                actionLabel="Explore Concept"
                onAction={() => handleLearnMore(item.title)}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span>📚</span> Available Courses (Reusable CourseCard Component)
          </h2>
          <p className="section-desc">
            Demonstrating nested reusable components (<code>&lt;Badge /&gt;</code> and <code>&lt;Button /&gt;</code> inside <code>&lt;CourseCard /&gt;</code>).
          </p>

          <div className="grid-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseCode={course.courseCode}
                title={course.title}
                instructor={course.instructor}
                duration={course.duration}
                level={course.level}
                rating={course.rating}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span>🎛️</span> Reusable UI Buttons & Badges Showcase
          </h2>
          <p className="section-desc">
            Buttons and Badges rendering with different variant properties.
          </p>

          <div className="custom-card" style={{ gap: '1.25rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Button Variants:</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => alert('Primary Clicked')}>Primary Button</Button>
                <Button variant="secondary" onClick={() => alert('Secondary Clicked')}>Secondary Button</Button>
                <Button variant="success" onClick={() => alert('Success Clicked')}>Success Button</Button>
                <Button variant="primary" size="sm" onClick={() => alert('Small Clicked')}>Small Button</Button>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Badge Variants:</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Badge text="Primary Tag" variant="primary" />
                <Badge text="Active Status" variant="success" />
                <Badge text="Pending Review" variant="warning" />
                <Badge text="Informational" variant="info" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
```

#### • `src/components/Header.jsx` :
```jsx
import React from 'react';

function Header({ title, subtitle, practicalNo }) {
  return (
    <header className="header">
      {practicalNo && <span className="header-badge">{practicalNo}</span>}
      <h1 className="header-title">{title}</h1>
      <p className="header-subtitle">{subtitle}</p>
    </header>
  );
}

export default Header;
```

#### • `src/components/Button.jsx` :
```jsx
import React from 'react';

function Button({ children, variant = 'primary', size = 'md', onClick, icon }) {
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const variantClass = `btn-${variant}`;
  return (
    <button className={`btn ${variantClass} ${sizeClass}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
```

#### • `src/components/Card.jsx` :
```jsx
import React from 'react';
import Badge from './Badge';
import Button from './Button';

function Card({ icon, title, description, category, actionLabel = "Learn More", onAction }) {
  return (
    <div className="custom-card">
      <div className="card-icon" style={{ background: '#eef2ff' }}>
        {icon}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <Badge text={category} variant="primary" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default Card;
```

#### • `src/components/Badge.jsx` :
```jsx
import React from 'react';

function Badge({ text, variant = 'primary' }) {
  return (
    <span className={`badge badge-${variant}`}>
      {text}
    </span>
  );
}

export default Badge;
```

#### • `src/components/CourseCard.jsx` :
```jsx
import React from 'react';
import Badge from './Badge';
import Button from './Button';

function CourseCard({ courseCode, title, instructor, duration, level, rating, onEnroll }) {
  const badgeVariant = level === 'Beginner' ? 'success' : level === 'Intermediate' ? 'info' : 'warning';
  return (
    <div className="custom-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>
          {courseCode}
        </span>
        <Badge text={level} variant={badgeVariant} />
      </div>

      <h3 className="card-title">{title}</h3>

      <div style={{ margin: '0.75rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <p>👨‍🏫 <strong>Instructor:</strong> {instructor}</p>
        <p>⏱️ <strong>Duration:</strong> {duration}</p>
        <p>⭐ <strong>Rating:</strong> {rating} / 5.0</p>
      </div>
      <div className="card-footer">
        <Button variant="success" size="sm" onClick={() => onEnroll(title)}>
          Enroll Now
        </Button>
        <Button variant="secondary" size="sm" onClick={() => alert(`Syllabus for ${title}`)}>
          View Syllabus
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
```

#### • `src/components/Footer.jsx` :
```jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        <strong>Web Technology Practicals Journal</strong> | Built with React.js & Functional Components
      </p>
      <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
        Practical 1: Functional Components, JSX & Reusability &bull; &copy; {currentYear}
      </p>
    </footer>
  );
}

export default Footer;
```

#### • `src/index.css` :
```css
:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --primary-light: #e0e7ff;
  --secondary: #0ea5e9;
  --accent: #f59e0b;
  --success: #10b981;
  --danger: #ef4444;
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --radius-md: 12px;
  --radius-lg: 16px;
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
}

.header {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
  color: white;
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.header-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.header-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 1.1rem;
  color: #c7d2fe;
  max-width: 650px;
  margin: 0 auto;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.custom-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.custom-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.card-description {
  color: var(--text-muted);
  font-size: 0.925rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-hover); }
.btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid var(--border-color); }
.btn-secondary:hover { background: #e2e8f0; }
.btn-success { background: var(--success); color: white; }
.btn-success:hover { background: #059669; }
.btn-sm { padding: 0.4rem 0.85rem; font-size: 0.8rem; }

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-primary { background: var(--primary-light); color: var(--primary); }
.badge-success { background: #d1fae5; color: #065f46; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-info { background: #e0f2fe; color: #0369a1; }

.concept-box {
  background: #ffffff;
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 2rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid #1e293b;
}
```

### 4. Output :
The React application renders with a top dark-gradient header showing "Practical No. 01", followed by the objective callout card, a 3-column grid displaying reusable Core Concept cards, a 3-column grid showcasing nested Course Cards with tags and buttons, and a bottom variant showcase for reusable Button and Badge designs.

---

<div style="page-break-after: always;"></div>

# Practical – 02 : Develop a React Application implementing Props, State Management and Event Handling.

### 1. Commands :
```bash
npm create vite@latest MERN_02
cd MERN_02
npm install
npm run dev
```

### 2. Project structure :
```text
MERN_02/
|-- src/
|   |-- components/
|   |   |-- Header.jsx
|   |   |-- CounterSection.jsx
|   |   |-- TaskManager.jsx
|   |   |-- TaskItem.jsx
|   |   |-- UserProfileCard.jsx
|   |   |-- InteractiveBox.jsx
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- package.json
|-- index.html
```

### 3. Source Code :

#### • `src/App.jsx` :
```jsx
import React from 'react';
import Header from './components/Header';
import CounterSection from './components/CounterSection';
import TaskManager from './components/TaskManager';
import UserProfileCard from './components/UserProfileCard';
import InteractiveBox from './components/InteractiveBox';

function App() {
  return (
    <div className="app-container">
      <Header
        practicalNo="Practical No. 02"
        title="Props, State Management & Event Handling"
        subtitle="Practical implementation of Uni-directional Data Flow, useState Hook, and React Synthetic Event Handlers"
      />

      <main className="main-content">
        <div style={{
          background: '#ffffff',
          borderLeft: '4px solid var(--primary)',
          padding: '1.25rem 1.5rem',
          borderRadius: '0 12px 12px 0',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
            ⚛️ Practical Objective
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Develop a comprehensive React application demonstrating Props passing between parent-child components,
            local State Management with the <code>useState</code> hook, and handling diverse React Synthetic Events
            (<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>, <code>onKeyDown</code>, <code>onMouseMove</code>).
          </p>
        </div>

        <div className="grid-2">
          <CounterSection />
          <TaskManager />
        </div>

        <div className="grid-2">
          <UserProfileCard />
          <InteractiveBox />
        </div>
      </main>

      <footer className="footer">
        <p><strong>Web Technology Practicals Journal</strong> &bull; Practical 02</p>
        <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
          React Props, State Management & Event Handling System
        </p>
      </footer>
    </div>
  );
}

export default App;
```

#### • `src/components/CounterSection.jsx` :
```jsx
import React, { useState } from 'react';

function CounterSection() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrement = () => setCount(prev => prev + Number(step));
  const handleDecrement = () => setCount(prev => (prev - Number(step) >= 0 ? prev - Number(step) : 0));
  const handleReset = () => setCount(0);
  const handleDouble = () => setCount(prev => prev * 2);

  return (
    <div className="card">
      <h3 className="card-title">
        <span>⚛️</span> Interactive Counter (State & Click Events)
      </h3>
      <p className="card-subtitle">
        Demonstrates React <code>useState</code>, numeric state updates, and <code>onClick</code> handlers.
      </p>

      <div className="counter-box">
        <div className="counter-display">{count}</div>

        <div style={{ width: '100%', maxWidth: '240px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Step Value:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={step}
            onChange={(e) => setStep(Math.max(1, parseInt(e.target.value) || 1))}
            className="form-input"
            style={{ marginTop: '0.25rem', textAlign: 'center' }}
          />
        </div>

        <div className="counter-controls">
          <button className="btn btn-primary" onClick={handleIncrement}>+{step} Increment</button>
          <button className="btn btn-danger" onClick={handleDecrement}>-{step} Decrement</button>
          <button className="btn btn-warning" onClick={handleDouble}>✖ 2 Double</button>
          <button className="btn btn-outline" onClick={handleReset}>↺ Reset</button>
        </div>
      </div>
    </div>
  );
}

export default CounterSection;
```

#### • `src/components/TaskManager.jsx` :
```jsx
import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React Props & Component Hierarchy', completed: true },
    { id: 2, text: 'Master useState hook and functional updates', completed: false },
    { id: 3, text: 'Handle Synthetic Events in React', completed: false }
  ]);
  const [inputTask, setInputTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;
    setTasks([{ id: Date.now(), text: inputTask.trim(), completed: false }, ...tasks]);
    setInputTask('');
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="card">
      <h3 className="card-title">
        <span>⚛️</span> Task Manager (Props, List State & Callbacks)
      </h3>
      <p className="card-subtitle">
        Demonstrates parent-child state synchronization and callback prop patterns.
      </p>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Type a new task and press Add or Enter..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          ➕ Add Task
        </button>
      </form>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('all')}>
          All ({tasks.length})
        </button>
        <button className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('active')}>
          Active ({tasks.filter(t => !t.completed).length})
        </button>
        <button className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('completed')}>
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem 0' }}>No tasks found in this view.</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;
```

#### • `src/components/UserProfileCard.jsx` :
```jsx
import React, { useState } from 'react';

function UserProfileCard() {
  const [profile, setProfile] = useState({
    name: 'Prince Prajapati',
    role: 'Full Stack Developer',
    experience: '3 Years',
    location: 'Ahmedabad, India',
    isAvailable: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="card">
      <h3 className="card-title">
        <span>⚛️</span> Live User Profile (Object State & Change Events)
      </h3>
      <p className="card-subtitle">
        Update the inputs below to see immediate two-way state reflection in the profile card.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className="form-input" />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Role:</label>
          <input type="text" name="role" value={profile.role} onChange={handleChange} className="form-input" />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Experience:</label>
          <input type="text" name="experience" value={profile.experience} onChange={handleChange} className="form-input" />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Location:</label>
          <input type="text" name="location" value={profile.location} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
          <input type="checkbox" name="isAvailable" checked={profile.isAvailable} onChange={handleChange} className="task-checkbox" />
          Available for Freelance / Hire
        </label>
      </div>

      <div className="user-preview">
        <div className="user-avatar">{profile.name ? profile.name.charAt(0).toUpperCase() : '?'}</div>
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{profile.name || 'Anonymous'}</h4>
          <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.9rem' }}>{profile.role || 'No Role'}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📍 {profile.location} &bull; 💼 {profile.experience}</p>
          <span style={{
            display: 'inline-block',
            marginTop: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: profile.isAvailable ? '#dcfce7' : '#fee2e2',
            color: profile.isAvailable ? '#15803d' : '#b91c1c'
          }}>
            {profile.isAvailable ? '● Available' : '○ Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
```

#### • `src/components/InteractiveBox.jsx` :
```jsx
import React, { useState } from 'react';

function InteractiveBox() {
  const [bgChoice, setBgChoice] = useState('indigo');
  const [isHovered, setIsHovered] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState('None');
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  const colorPalettes = {
    indigo: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    emerald: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    rose: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
    amber: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)'
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoord({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    });
  };

  return (
    <div className="card">
      <h3 className="card-title">
        <span>⚡</span> Mouse & Keyboard Events Playground
      </h3>
      <p className="card-subtitle">Hover, move cursor inside the canvas, and press keys to inspect synthetic event payload.</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Palette:</span>
        {Object.keys(colorPalettes).map((color) => (
          <button
            key={color}
            onClick={() => setBgChoice(color)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'capitalize',
              background: bgChoice === color ? '#0f172a' : '#e2e8f0',
              color: bgChoice === color ? '#ffffff' : '#334155'
            }}
          >
            {color}
          </button>
        ))}
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          background: colorPalettes[bgChoice],
          color: 'white',
          borderRadius: '12px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.2)' : 'none',
          cursor: 'crosshair',
          marginBottom: '1rem'
        }}
      >
        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {isHovered ? '✨ Mouse is Inside Box!' : '🎯 Hover Cursor Here'}
        </h4>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          Cursor Coordinates: <strong>X: {mouseCoord.x}px | Y: {mouseCoord.y}px</strong>
        </p>
      </div>

      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Test Keyboard Event (Type any key inside input):
        </label>
        <input
          type="text"
          placeholder="Press any key here..."
          onKeyDown={(e) => setLastKeyPressed(`${e.key} (Code: ${e.code})`)}
          className="form-input"
          style={{ marginTop: '0.25rem' }}
        />
        <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Last Key Detected: <strong style={{ color: 'var(--primary-dark)' }}>{lastKeyPressed}</strong>
        </p>
      </div>
    </div>
  );
}

export default InteractiveBox;
```

### 4. Output :
The interface displays an interactive state dashboard with live numerical counter manipulation, task list management with reactive completion toggle and deletions, dynamic two-way data-bound live user profile card, and a mouse hover/coordinate listener alongside real-time keyboard key stroke inspection.

---

<div style="page-break-after: always;"></div>

# Practical – 03 : Design a Student Management Form with Controlled Components, Multi-field Regex Validations, and CRUD.

### 1. Commands :
```bash
npm create vite@latest MERN_03
cd MERN_03
npm install
npm run dev
```

### 2. Project structure :
```text
MERN_03/
|-- src/
|   |-- components/
|   |   |-- Header.jsx
|   |   |-- StudentForm.jsx
|   |   |-- StudentTable.jsx
|   |   |-- StatsOverview.jsx
|   |-- utils/
|   |   |-- validation.js
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- package.json
|-- index.html
```

### 3. Source Code :

#### • `src/utils/validation.js` :
```javascript
export const validateStudentForm = (formData, existingStudents = [], currentEditingId = null) => {
  const errors = {};

  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Full Name must be at least 3 characters.';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
    errors.fullName = 'Full Name can only contain letters and spaces.';
  }

  if (!formData.rollNo || !formData.rollNo.trim()) {
    errors.rollNo = 'Enrollment / Roll No is required.';
  } else if (!/^[A-Za-z0-9_-]{3,15}$/.test(formData.rollNo.trim())) {
    errors.rollNo = 'Roll No must be 3-15 alphanumeric characters.';
  } else {
    const duplicate = existingStudents.find(
      s => s.rollNo.toLowerCase() === formData.rollNo.trim().toLowerCase() && s.id !== currentEditingId
    );
    if (duplicate) errors.rollNo = 'This Roll No is already registered.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = '10-digit Mobile Number is required.';
  } else if (!phoneRegex.test(formData.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6-9.';
  }

  if (!formData.department) errors.department = 'Please select a department / branch.';
  if (!formData.semester) errors.semester = 'Please select the current semester.';
  if (!formData.gender) errors.gender = 'Please select gender.';
  if (!formData.skills || formData.skills.length === 0) errors.skills = 'Please select at least one skill or interest.';

  return { isValid: Object.keys(errors).length === 0, errors };
};
```

#### • `src/App.jsx` :
```jsx
import React, { useState } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    fullName: 'Prince Prajapati',
    rollNo: '26084231038',
    email: 'prince@student.edu',
    phone: '9876543210',
    department: 'Computer Engineering',
    semester: 'Semester 6',
    gender: 'Male',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    address: 'Ahmedabad, Gujarat'
  },
  {
    id: 'STU-1002',
    fullName: 'Priya Sharma',
    rollNo: '21IT012',
    email: 'priya.sharma@student.edu',
    phone: '9812345678',
    department: 'Information Technology',
    semester: 'Semester 6',
    gender: 'Female',
    skills: ['Python', 'SQL', 'React'],
    address: 'Mumbai, Maharashtra'
  }
];

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (text, type = 'success') => {
    setAlertMessage({ text, type });
    setTimeout(() => setAlertMessage(null), 3500);
  };

  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...studentData, id: s.id } : s));
      showAlert(`✅ Student record "${studentData.fullName}" updated successfully!`);
      setEditingStudent(null);
    } else {
      const newStudent = { ...studentData, id: `STU-${Date.now().toString().slice(-4)}` };
      setStudents(prev => [newStudent, ...prev]);
      showAlert(`🎉 Student "${studentData.fullName}" added successfully!`);
    }
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Are you sure you want to delete student: ${name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (editingStudent && editingStudent.id === id) setEditingStudent(null);
      showAlert(`🗑️ Student record "${name}" deleted.`, 'danger');
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDeptFilter === 'All' || student.department === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="app-container">
      <Header
        practicalNo="Practical No. 03"
        title="Student Management System"
        subtitle="Comprehensive React Forms, Controlled Components, Live Field Validations & Full CRUD Operations"
      />

      <main className="main-content">
        {alertMessage && (
          <div style={{
            background: alertMessage.type === 'danger' ? '#fee2e2' : '#dcfce7',
            color: alertMessage.type === 'danger' ? '#991b1b' : '#166534',
            border: `1px solid ${alertMessage.type === 'danger' ? '#f87171' : '#86efac'}`,
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            {alertMessage.text}
          </div>
        )}

        <StatsOverview students={students} />

        <div className="layout-grid">
          <StudentForm
            onSaveStudent={handleSaveStudent}
            editingStudent={editingStudent}
            onCancelEdit={() => setEditingStudent(null)}
            existingStudents={students}
          />

          <div className="card">
            <div className="card-title">
              <span>📋 Registered Student Directory</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing {filteredStudents.length} of {students.length}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <input
                type="text"
                placeholder="🔍 Search by name, roll no, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '180px' }}
              >
                <option value="All">All Departments</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <StudentTable
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p><strong>Web Technology Practicals Journal</strong> &bull; Practical 03</p>
        <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
          Student Management System using React Forms, Controlled Components and Validation
        </p>
      </footer>
    </div>
  );
}

export default App;
```

### 4. Output :
The student portal renders summary statistical widgets at the top, a controlled input form validating required fields, Indian phone regex, email syntax, and unique roll numbers on the left, and a reactive searchable data table with Edit and Delete options on the right.

---

<div style="page-break-after: always;"></div>

# Practical – 04 : Build a Single Page Application (SPA) using React Router DOM with Dynamic Routing, Nested Navigation, and URL Parameters.

### 1. Commands :
```bash
npm create vite@latest MERN_04
cd MERN_04
npm install react-router-dom
npm run dev
```

### 2. Project structure :
```text
MERN_04/
|-- src/
|   |-- components/
|   |   |-- Navbar.jsx
|   |   |-- Footer.jsx
|   |-- pages/
|   |   |-- Home.jsx
|   |   |-- About.jsx
|   |   |-- Courses.jsx
|   |   |-- CourseDetails.jsx
|   |   |-- Contact.jsx
|   |   |-- NotFound.jsx
|   |-- data/
|   |   |-- coursesData.js
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- package.json
|-- index.html
```

### 3. Source Code :

#### • `src/App.jsx` :
```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
```

#### • `src/pages/CourseDetails.jsx` :
```jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/coursesData';

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Course Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No course found with URL slug: <code>{courseId}</code></p>
        <Link to="/courses" className="btn btn-primary">← Back to Courses</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <Link to="/courses">Courses</Link> <span>/</span> <span>{course.title}</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-purple" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{course.category}</span>
            <span className="badge badge-amber">{course.level}</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>{course.title}</h1>
          <p style={{ fontSize: '1.1rem', color: '#c7d2fe', marginBottom: '1.5rem' }}>{course.fullDesc}</p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.25rem' }}>
            <div>👨‍🏫 <strong>Instructor:</strong> {course.instructor}</div>
            <div>⏱️ <strong>Duration:</strong> {course.duration}</div>
            <div>⭐ <strong>Rating:</strong> {course.rating} / 5.0</div>
            <div>👥 <strong>Enrolled:</strong> {course.enrolledStudents} students</div>
          </div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem', color: '#166534' }}>
          🔍 <strong>Dynamic Parameter Inspection:</strong> This page received URL parameter <code>useParams().courseId = "{courseId}"</code>.
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>📖 Course Curriculum & Modules</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {course.modules.map((mod, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {index + 1}
                </span>
                <span>{mod}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" onClick={() => alert(`🎉 Enrolled in: ${course.title}`)}>🎓 Enroll in this Specialization</button>
            <button className="btn btn-outline" onClick={() => navigate('/courses')}>← Back to Catalog</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
```

### 4. Output :
The Single Page Application allows instant navigation between Home, Courses Catalog, Course Details (`/courses/:courseId`), About, and Contact pages with persistent Navbar active highlighting, zero browser reloads, URL parameter parsing via `useParams()`, programmatic navigation via `useNavigate()`, and fallback wildcard handling.

---

<div style="page-break-after: always;"></div>

# Practical – 05 : Develop an Express.js Backend Server implementing Modular Routing, Custom Middleware, and Full RESTful CRUD Operations.

### 1. Commands :
```bash
mkdir MERN_05 && cd MERN_05
npm init -y
npm install express cors morgan
node server.js
```

### 2. Project structure :
```text
MERN_05/
|-- controllers/
|   |-- productController.js
|-- routes/
|   |-- productRoutes.js
|-- middleware/
|   |-- logger.js
|   |-- errorHandler.js
|-- data/
|   |-- products.json
|-- server.js
|-- package.json
|-- test-requests.http
```

### 3. Source Code :

#### • `server.js` :
```javascript
const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Practical 05: Express.js Routing & CRUD API Server',
    endpoints: {
      getAllProducts: 'GET /api/products',
      getProductById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    },
    timestamp: new Date().toISOString()
  });
});

app.use('/api/products', productRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚛️ Express CRUD Server is running on Port: ${PORT}`);
  console.log(`⚛️ Local URL: http://localhost:${PORT}`);
  console.log(`=================================================`);
});
```

#### • `routes/productRoutes.js` :
```javascript
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.route('/')
  .get(getAllProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
```

#### • `controllers/productController.js` :
```javascript
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data', 'products.json');

const readProducts = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (error) {
    return [];
  }
};

const saveProducts = (products) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
};

const getAllProducts = (req, res) => {
  let products = readProducts();
  const { category, search, minPrice, maxPrice } = req.query;

  if (category) products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (minPrice) products = products.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) products = products.filter(p => p.price <= parseFloat(maxPrice));

  res.status(200).json({ success: true, count: products.length, data: products });
};

const getProductById = (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: `Product not found.` });
  res.status(200).json({ success: true, data: product });
};

const createProduct = (req, res) => {
  const { name, category, price, stock } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ success: false, message: 'Validation failed on required fields.' });
  }

  const products = readProducts();
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name: name.trim(),
    category: category.trim(),
    price: parseFloat(price),
    stock: stock !== undefined ? parseInt(stock) : 0,
    inStock: stock !== undefined ? parseInt(stock) > 0 : true,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  saveProducts(products);
  res.status(201).json({ success: true, message: 'Product created successfully.', data: newProduct });
};

const updateProduct = (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Product not found.' });

  products[index] = { ...products[index], ...req.body, updatedAt: new Date().toISOString() };
  saveProducts(products);
  res.status(200).json({ success: true, message: 'Product updated successfully.', data: products[index] });
};

const deleteProduct = (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

  saveProducts(products.filter(p => p.id !== parseInt(req.params.id)));
  res.status(200).json({ success: true, message: 'Product deleted successfully.', data: product });
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
```

### 4. Output :
The Express.js REST service responds with JSON status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`) and logs execution timestamps and HTTP request durations in console logs via custom middleware.

---

<div style="page-break-after: always;"></div>

# Practical – 06 : Develop a Student Records REST API using Express.js with JSON Data Store, HTTP Status Codes, Validation Middleware, and Postman Collection.

### 1. Commands :
```bash
mkdir MERN_06 && cd MERN_06
npm init -y
npm install express cors morgan
node server.js
```

### 2. Project structure :
```text
MERN_06/
|-- controllers/
|   |-- studentController.js
|-- routes/
|   |-- studentRoutes.js
|-- middleware/
|   |-- validator.js
|   |-- logger.js
|-- data/
|   |-- students.json
|-- Student_Records_API.postman_collection.json
|-- server.js
|-- package.json
```

### 3. Source Code :

#### • `server.js` :
```javascript
const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Practical 06: RESTful APIs for Student Records Management',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentByIdOrRoll: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
      getOverviewStats: 'GET /api/students/stats/overview'
    },
    postmanCollection: 'Student_Records_API.postman_collection.json'
  });
});

app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚛️ Practical 06: Student Records REST API Server`);
  console.log(`⚛️ Server running at: http://localhost:${PORT}`);
  console.log(`=================================================`);
});
```

#### • `middleware/validator.js` :
```javascript
const validateStudentPayload = (req, res, next) => {
  const { rollNo, name, email, department, semester, cgpa } = req.body;
  const errors = [];

  if (req.method === 'POST') {
    if (!rollNo || !rollNo.toString().trim()) errors.push('Field "rollNo" is required.');
    if (!name || !name.trim()) errors.push('Field "name" is required.');
    if (!email || !email.trim()) errors.push('Field "email" is required.');
    if (!department || !department.trim()) errors.push('Field "department" is required.');
    if (semester === undefined) errors.push('Field "semester" is required.');
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Field "email" must be a valid email format.');
  }

  if (semester !== undefined) {
    const semNum = parseInt(semester);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) errors.push('Field "semester" must be an integer between 1 and 8.');
  }

  if (cgpa !== undefined) {
    const cgpaNum = parseFloat(cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) errors.push('Field "cgpa" must be a float between 0.00 and 10.00.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed on student record payload.', errors });
  }
  next();
};

module.exports = { validateStudentPayload };
```

#### • `controllers/studentController.js` :
```javascript
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data', 'students.json');

const getStudentsData = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
const saveStudentsData = (data) => fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

const getAllStudents = (req, res) => {
  let students = getStudentsData();
  const { department, semester, minCgpa, search, sortBy } = req.query;

  if (department) students = students.filter(s => s.department.toLowerCase() === department.toLowerCase());
  if (semester) students = students.filter(s => s.semester === parseInt(semester));
  if (minCgpa) students = students.filter(s => s.cgpa >= parseFloat(minCgpa));
  if (search) {
    const q = search.toLowerCase();
    students = students.filter(s => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q));
  }
  if (sortBy === 'cgpa_desc') students.sort((a, b) => b.cgpa - a.cgpa);

  res.status(200).json({ success: true, totalRecords: students.length, data: students });
};

const getStudentById = (req, res) => {
  const students = getStudentsData();
  const param = req.params.id;
  const student = students.find(s => s.id.toString() === param || s.rollNo.toLowerCase() === param.toLowerCase());
  if (!student) return res.status(404).json({ success: false, message: `Student not found.` });
  res.status(200).json({ success: true, data: student });
};

const createStudent = (req, res) => {
  const students = getStudentsData();
  const { rollNo, name, email, phone, department, semester, cgpa } = req.body;

  if (students.find(s => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase())) {
    return res.status(409).json({ success: false, message: 'Student with this roll number already exists.' });
  }

  const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const newStudent = {
    id: nextId,
    rollNo: rollNo.trim().toUpperCase(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : 'N/A',
    department: department.trim(),
    semester: parseInt(semester),
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : 0.0,
    enrolledDate: new Date().toISOString().split('T')[0]
  };

  students.push(newStudent);
  saveStudentsData(students);
  res.status(201).json({ success: true, message: 'Student record created successfully.', data: newStudent });
};

const updateStudent = (req, res) => {
  const students = getStudentsData();
  const index = students.findIndex(s => s.id.toString() === req.params.id || s.rollNo.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) return res.status(404).json({ success: false, message: 'Student record not found.' });

  students[index] = { ...students[index], ...req.body, updatedAt: new Date().toISOString() };
  saveStudentsData(students);
  res.status(200).json({ success: true, message: 'Student record updated successfully.', data: students[index] });
};

const deleteStudent = (req, res) => {
  const students = getStudentsData();
  const student = students.find(s => s.id.toString() === req.params.id || s.rollNo.toLowerCase() === req.params.id.toLowerCase());
  if (!student) return res.status(404).json({ success: false, message: 'Student record not found.' });

  saveStudentsData(students.filter(s => s.id !== student.id));
  res.status(200).json({ success: true, message: `Student deleted.`, data: student });
};

const getStudentStats = (req, res) => {
  const students = getStudentsData();
  const deptCounts = {};
  let totalCgpa = 0;
  students.forEach(s => {
    deptCounts[s.department] = (deptCounts[s.department] || 0) + 1;
    totalCgpa += s.cgpa || 0;
  });

  res.status(200).json({
    success: true,
    statistics: {
      totalStudents: students.length,
      averageCgpa: students.length ? parseFloat((totalCgpa / students.length).toFixed(2)) : 0,
      departmentDistribution: deptCounts
    }
  });
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, getStudentStats };
```

### 4. Output :
Tested with Postman Collection `Student_Records_API.postman_collection.json`. The REST API successfully parses URL parameters, validates payloads, manages duplicate constraints, and delivers summary statistical aggregations.

---

<div style="page-break-after: always;"></div>

# Practical – 07 : Develop a complete Employee Management RESTful API using Express.js and MongoDB (Mongoose ODM) with Schema Validation and Aggregations.

### 1. Commands :
```bash
mkdir MERN_07 && cd MERN_07
npm init -y
npm install express mongoose dotenv cors morgan
node seed.js
node server.js
```

### 2. Project structure :
```text
MERN_07/
|-- config/
|   |-- db.js
|-- models/
|   |-- Employee.js
|-- controllers/
|   |-- employeeController.js
|-- routes/
|   |-- employeeRoutes.js
|-- .env
|-- seed.js
|-- server.js
|-- package.json
```

### 3. Source Code :

#### • `config/db.js` :
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`⚛️ Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
```

#### • `models/Employee.js` :
```javascript
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: [true, 'Employee ID is required.'],
      unique: true,
      trim: true,
      uppercase: true
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
      trim: true,
      minlength: [2, 'First Name must be at least 2 characters.']
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address.']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true
    },
    department: {
      type: String,
      required: [true, 'Department is required.'],
      enum: {
        values: ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Product', 'Operations'],
        message: '{VALUE} is not a supported department.'
      }
    },
    designation: {
      type: String,
      required: [true, 'Designation / Job Title is required.'],
      trim: true
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required.'],
      min: [0, 'Salary cannot be negative.']
    },
    joiningDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'On Leave'],
      default: 'Active'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

employeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
```

#### • `controllers/employeeController.js` :
```javascript
const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const { department, status, search, minSalary, maxSalary, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};

    if (department) query.department = department;
    if (status) query.status = status;
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { empId: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === 'salary_desc') sortOption = { salary: -1 };
    else if (sortBy === 'name') sortOption = { firstName: 1 };

    const skip = (Number(page) - 1) * Number(limit);
    const totalRecords = await Employee.countDocuments(query);
    const employees = await Employee.find(query).sort(sortOption).skip(skip).limit(Number(limit));

    res.status(200).json({
      success: true,
      count: employees.length,
      totalRecords,
      totalPages: Math.ceil(totalRecords / Number(limit)),
      currentPage: Number(page),
      data: employees
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve employees.', error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Employee.findById(id)
      : await Employee.findOne({ empId: id.toUpperCase() });

    if (!employee) return res.status(404).json({ success: false, message: `Employee not found.` });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, message: 'Employee registered successfully.', data: employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate key error: Employee already exists.' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { empId: id.toUpperCase() };
    const updated = await Employee.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Employee not found.' });
    res.status(200).json({ success: true, message: 'Employee updated successfully.', data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { empId: id.toUpperCase() };
    const deleted = await Employee.findOneAndDelete(query);
    if (!deleted) return res.status(404).json({ success: false, message: 'Employee not found.' });
    res.status(200).json({ success: true, message: 'Employee deleted.', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getEmployeeSummaryStats = async (req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          totalEmployees: { $sum: 1 },
          avgSalary: { $avg: '$salary' },
          minSalary: { $min: '$salary' },
          maxSalary: { $max: '$salary' }
        }
      },
      {
        $project: {
          department: '$_id',
          totalEmployees: 1,
          avgSalary: { $round: ['$avgSalary', 2] },
          minSalary: 1,
          maxSalary: 1,
          _id: 0
        }
      },
      { $sort: { totalEmployees: -1 } }
    ]);

    const totalHeadcount = await Employee.countDocuments();
    res.status(200).json({ success: true, totalHeadcount, departmentStats: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getEmployeeSummaryStats };
```

### 4. Output :
The Express-MongoDB backend server establishes connectivity to MongoDB Atlas cloud cluster, validates employee documents against schema constraints, executes multi-stage aggregation pipelines for department analytics, and manages full CRUD operations.

---
**End of Practical Journal**
