# Todo Master - MERN Stack Todo Application

A modern, responsive todo application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring full CRUD operations, priority management, due dates, and a beautiful user interface.

## Features

### ✨ Core Functionality
- **Full CRUD Operations**: Create, Read, Update, Delete todos
- **Task Management**: Mark todos as complete/incomplete
- **Priority System**: Set priority levels (High, Medium, Low)
- **Due Dates**: Set and track due dates with overdue indicators
- **Search & Filter**: Search by title/description and filter by status/priority

### 🎨 User Experience
- **Responsive Design**: Optimized for both mobile and desktop
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Instant feedback with toast notifications
- **Statistics Dashboard**: Overview of total, completed, pending, and overdue tasks

### 🛠 Technical Features
- **TypeScript**: Full type safety across the application
- **RESTful API**: Well-structured backend API
- **MongoDB Integration**: Persistent data storage
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-todo-app
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # In the server directory, create a .env file
   cd server
   cp .env.example .env
   ```
   
   Update the `.env` file with your MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the connection string to point to MongoDB Atlas.

5. **Run the application**
   ```bash
   # From the root directory, start both frontend and backend
   npm run dev
   ```

   This will start:
   - Frontend on `http://localhost:3000`
   - Backend on `http://localhost:5000`

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
mern-todo-app/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── TodoForm.tsx         # Todo creation form
│   │   ├── TodoItem.tsx         # Individual todo item
│   │   ├── TodoStats.tsx        # Statistics dashboard
│   │   ├── TodoFilters.tsx      # Search and filter controls
│   │   └── EditTodoModal.tsx    # Edit todo modal
│   ├── services/                # API services
│   │   └── api.ts              # API client and methods
│   ├── types/                   # TypeScript type definitions
│   │   └── todo.ts             # Todo-related types
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── server/                     # Backend source code
│   ├── models/                # Database models
│   │   └── Todo.js           # Todo model schema
│   ├── routes/               # API routes
│   │   └── todos.js         # Todo routes
│   ├── server.js           # Express server setup
│   └── package.json       # Backend dependencies
├── public/                # Static assets
├── package.json          # Frontend dependencies
└── README.md            # Project documentation
```

## Features in Detail

### Todo Management
- Create todos with title, description, priority, and due date
- Edit existing todos with a modal interface
- Mark todos as complete/incomplete with visual feedback
- Delete todos with confirmation

### Filtering and Search
- Search todos by title or description
- Filter by completion status (All, Pending, Completed)
- Filter by priority level (All, High, Medium, Low)
- Real-time filtering without page refresh

### Statistics
- Total number of todos
- Completed todos count
- Pending todos count
- Overdue todos count with visual indicators

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized typography and spacing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/) for optimal development experience