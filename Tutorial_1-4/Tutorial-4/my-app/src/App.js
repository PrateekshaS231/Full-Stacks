import "./App.css";

import Header from "./components/Header";
import StatsSection from "./components/StatsSection";
import TaskList from "./components/TaskList";
import Announcements from "./components/Announcements";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />

      <StatsSection />

      <div className="content">
        <TaskList />
        <Announcements />
      </div>

      <Footer />
    </div>
  );
}

export default App;