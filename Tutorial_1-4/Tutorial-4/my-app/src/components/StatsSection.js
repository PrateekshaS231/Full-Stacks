import StatCard from "./StatCard";

function StatsSection() {
  return (
    <div className="stats">
      <StatCard title="Attendance" value="92%" icon="📚" />
      <StatCard title="Assignments" value="18/20" icon="📝" />
      <StatCard title="CGPA" value="8.9" icon="🏆" />
      <StatCard title="Projects" value="6" icon="💻" />
    </div>
  );
}

export default StatsSection;