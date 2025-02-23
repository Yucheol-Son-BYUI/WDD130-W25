function renderMoreProject(){
  const projectList = document.querySelector("#projectList");
  let visibleProjectCount = projectList.dataset.visibleProject;
  const projects = document.querySelectorAll(".project");

  // case: less than 4 projects
  if(projects.length <= 4){
    document.querySelector("li.moreProject").removeEventListener("click", renderMoreProject)
    return;
  }

  // case: has clicked "collapse all"
  if(visibleProjectCount == projects.length){
    visibleProjectCount = 4;
    for(i = visibleProjectCount; i < projects.length; i++){
      projects[i].classList.add('hide');
    }

    const moreButton = document.querySelector("li.moreProject");
    moreButton.innerText = Math.min(4, projects.length - visibleProjectCount) +' more projects';
    projectList.dataset.visibleProject = visibleProjectCount;
    return;
  }

  for(i = visibleProjectCount; i < Math.min(projects.length, visibleProjectCount + 4);i++){
    projects[i].classList.remove('hide');
  }

  visibleProjectCount = Math.min(projects.length, visibleProjectCount + 4);
  projectList.dataset.visibleProject = visibleProjectCount;
  
  if(projects.length == visibleProjectCount){
    const moreButton = document.querySelector("li.moreProject");
    moreButton.innerText = 'collapse all';
  }
}


document.querySelector("li.moreProject").addEventListener("click", renderMoreProject);