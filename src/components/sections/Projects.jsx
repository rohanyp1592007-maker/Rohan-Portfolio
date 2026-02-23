import React from 'react';
import Section from '../common/Section';
import ProjectCard from '../project/ProjectCard';
import project1 from '../../assets/project1.png';
import project2 from '../../assets/project2.jpeg';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Grahak Bhandar",
      description: "A comprehensive collegiate inventory system engineered to manage stock dynamically. Streamlined asset tracking and significantly reduced operational overhead by digitizing manual entry logs.",
      impact: ["Decreased manual tracking time by 40%", "Digitized over 1,000+ localized assets", "Zero-downtime deployment"],
      image: project1,
      tech: ["PHP", "JavaScript", "MySQL", "Tailwind CSS"],
      liveLink: "https://grahakbhandar.rf.gd/login.php",
      githubLink: "https://github.com/rohanyp1592007-maker",
      caseStudyLink: "#"
    },
    {
      id: 2,
      title: "Ripeness Detection",
      description: "An innovative machine learning application deploying algorithmic image classification to predict and detect fruit ripeness via automated visual analysis.",
      impact: ["Achieved 92% classification accuracy", "Processed real-time video feeds", "Implemented edge-deployment friendly models"],
      image: project2,
      tech: ["Python", "OpenCV", "TensorFlow"],
      liveLink: "#",
      githubLink: "https://github.com/rohanyp1592007-maker",
      caseStudyLink: "#"
    }
  ];

  return (
    <Section
      id="projects"
      subtitle="04. Work"
      title="Selected Projects."
      className="bg-bg-primary border-t border-border-subtle"
      containerClass="max-w-6xl mx-auto px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;