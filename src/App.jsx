import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })
  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  const handleSelectProject = (id) => {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: id,
    })
    )
  }

  const handleAddProject = (projectData) => {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: uuidv4()
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const handleCancelProject = () => {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: undefined
    })
    )
  }

  const handleDeleteProject = () => {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
    }))
  }

  const handleAddTask = (text) => {
    setProjectsState(prevState => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: uuidv4()
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks,]
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectsState(prevState => ({
      ...prevState,
      tasks: prevState.tasks.filter(task => task.id !== id)
    }))
  }

  let selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
  let content = <SelectedProject
    project={selectedProject} onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    tasks={projectsState.tasks}
    onDeleteTask={handleDeleteTask}
  />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
