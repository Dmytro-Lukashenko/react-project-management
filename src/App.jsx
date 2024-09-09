import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  })
  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  const handleAddProject = (projectData) => {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: uuidv4()
      }
      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartAddProject} />
  }

  console.log(projectsState)


  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
