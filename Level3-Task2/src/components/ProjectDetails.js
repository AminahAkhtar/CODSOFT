import React from 'react';
import './Project.css'
function ProjectDetails({ project }) {
    console.log('Project:', project);
    
  const phasePercentage = project.phasePercentage || 0;
  const progressBar = project.progressBar || 0;

  return (
    <div className="project-details">
      <div className='mains'>
      <p className="project-title">{project.title}</p>
      {project.description && <p className="project-description">{project.description}</p>}
      {/* {project.projectCreator && <p className="project-creator">Project Creator: {project.projectCreator}</p>} */}
      {project.dateOfCreation && <p className="project-creation-date">Creation Date: {new Date(project.dateOfCreation).toLocaleDateString()}</p>}
      {project.deadline && <p className="project-deadline">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>}
      </div>
      <div className="project-members mains">
        <p className='heading'>Project Members</p>
        <ul>
          {project.members && project.members.map((member) => (
            <li key={member.user._id}>
              {/* <p className="member-name">{member.name}</p> */}
              {/* <p className="member-info">{member.user} - {member.role}</p> */}
              <p>{member.role}</p>
            </li>
          ))} 
        </ul>
      </div>
      
      <div className="project-phases mains">
        <p className='heading'>Project Phases</p>
        <ul>
          {project.projectPhases && project.projectPhases.map((projectPhase) => (
            <li key={projectPhase._id} className="phase">
              <p className="phase-title">{projectPhase.phaseTitle} - {projectPhase.phaseStatus}</p>
              {/* <p className="phase-number">{projectPhase.phaseNumber}</p> */}
              {/* <p className="phase-status">{projectPhase.phaseStatus}</p> */}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-tasks mains">
        <p className='heading'>Project Tasks</p>
        {project.tasks && project.tasks.length > 0 ? (
          <ul>
            {project.tasks.map((task) => (
              <li key={task._id} className="task">
                <p className="task-name">Name: {task.name}</p>
                <p className="task-description">Description: {task.description}</p>
                <p className="task-deadline">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <p className="task-completed">Completed: {task.completed ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks-message">No tasks available for this project.</p>
        )}
      </div>
      
      <div className="project-progress mains">
        <p className='heading'>Phases Completion Percentage</p>
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${phasePercentage}%` }}
            role="progressbar"
            aria-valuenow={phasePercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {phasePercentage}%
          </div>
        </div>

        <p className='heading'>Overall Progress Of Project</p>
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${progressBar}%` }}
            role="progressbar"
            aria-valuenow={progressBar}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progressBar}%
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProjectDetails;
