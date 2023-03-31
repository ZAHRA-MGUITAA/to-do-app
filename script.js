let tasks = [];
let id = 0;
let tasksleft = 0;
const addTask = ()=>{
  let task = document.querySelector(".new-task input");
  task.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      id++;
      tasks.push({task:task.value,status:"active",id:id});
      // console.log(tasks);
      let dark = document.querySelector('.darkMode');
      let light = document.querySelector('.lightMode');
      if(dark){
        var taskp = `
       
        <div class="day-task" draggable="true">
        <input class="checkbox" type="checkbox" name="" id="${id}" >
        <span class="checkmark"></span>
        <input type="text" value="${task.value}" readonly style="background:var(--Very-Dark-Desaturated-Blue)">
        <img class="icon-cross" src="./images/icon-cross.svg" alt="">
    </div>`;
      }else if(light){
        var taskp = `
        <div class="day-task">
        <input class="checkbox" type="checkbox" name="" id="${id}" >
        <span class="checkmark"></span>
        <input type="text" value="${task.value}" readonly style="background:var(--Very-Light-Gray);color:#000000">
        <img class="icon-cross" src="./images/icon-cross.svg" alt="">
    </div>`;
      }
      
      let taskslist = document.querySelector('.tasks');
      taskslist.insertAdjacentHTML("afterbegin",taskp);
      task.value = "";
      countTasksLeft();
      removeTask();
      // dragtask();


    }
   
  });
}

const toCompleted = ()=>{
  let taskschange = document.querySelector('.tasks');
  taskschange.addEventListener('change',()=>{
    let checkboxs = Array.from(document.querySelectorAll('.checkbox'));
    let checkedCheckbox = checkboxs.filter((checkbox)=>checkbox.checked);
    checkedCheckbox.map((item)=>{
     item.nextElementSibling.nextElementSibling.style.textDecoration="line-through";
    });
    let notcheckedCheckbox = checkboxs.filter((checkbox)=>!checkbox.checked);
    notcheckedCheckbox.map((item)=>{
     item.nextElementSibling.nextElementSibling.style.textDecoration="none";
    });
  }); 
}

const removeTask = () => {
  // let taskschange = document.querySelector('.tasks');
  // taskschange.addEventListener('change',()=>{
  let iconcross = document.querySelectorAll('.icon-cross');
  Array.from(iconcross).map((icon)=>{
    icon.addEventListener('click',(event)=>{
      // console.log(event.target);
      event.target.parentElement.remove();
      countTasksLeft();

    })
  });

// });
}



const clearCompleted = () => {
  document.getElementById('clear-completed').addEventListener('click',()=>{
    let daytasks = Array.from(document.querySelectorAll('.checkbox'));
    daytasks.filter((task)=>task.checked).map((item)=>{
      item.checked = false;
    })
    countTasksLeft();
  })

}

const displayCompleted = () => {
  let completedbutton = document.getElementById('completed');
  completedbutton.addEventListener('click',()=>{
    let daytasks = Array.from(document.querySelectorAll('.checkbox'));
    Array.from(document.querySelectorAll('.day-task')).map((item)=>{
      item.style.display ="flex";
    });
    daytasks.filter((task)=>!task.checked).map((item)=>{
      // item.style.visibility="hidden";
      item.parentElement.style.display="none";
    });
  });

}

const displayAll = () => {
  document.getElementById('all').addEventListener('click',()=>{
    Array.from(document.querySelectorAll('.day-task')).map((item)=>{
      item.style.display ="flex";
    });
  
  })
}


const displayActive = () => {
  document.getElementById('active').addEventListener('click',()=>{
    let daytasks = document.querySelectorAll('.checkbox');
    Array.from(document.querySelectorAll('.day-task')).map((item)=>{
      item.style.display ="flex";
    });
    Array.from(daytasks).filter((task)=>task.checked).map((item)=>{
      // item.style.visibility = "hidden";
      item.parentElement.style.display = "none";
    })
  })
}
const countTasksLeft = () => {
 
    let tasksleft = Array.from(document.querySelectorAll('.checkbox')).filter((task)=>!task.checked);
    document.getElementById('tasks-left').innerHTML = `${tasksleft.length} items left`;
 
}



const lightMode = () => {
  document.getElementById('light-mode').addEventListener('click',()=>{
    document.querySelector('body').classList.add("lightMode");
    document.querySelector('body').classList.remove("darkMode");

    document.querySelector('body').style.background = "var(--Very-Light-Gray)";
    document.getElementById('light-mode').style.display = "none";
    document.getElementById('dark-mode').style.display = "block";
    Array.from(document.querySelectorAll('input')).map((input)=>{input.style.background="var(--Very-Light-Gray)";input.style.color="#000000"});
    document.querySelector('.tasks-actions').style.background="var(--Very-Light-Gray)";
    Array.from(document.querySelectorAll('li')).map((li)=>{
      li.style.color = "#000000";
    });
    Array.from(document.querySelectorAll('p')).map((p)=>{
      p.style.color = "#000000";
    });
    document.querySelector('header').style.background = 'url("./images/bg-desktop-light.jpg")';
  })
}



const darktMode = () => {
  document.getElementById('dark-mode').addEventListener('click',()=>{
    document.querySelector('body').classList.remove("lightMode");
    document.querySelector('body').classList.add("darkMode");
    document.querySelector('body').style.background = "var(--Very-Dark-Desaturated-Blue)";
    document.getElementById('dark-mode').style.display = "none";
    document.getElementById('light-mode').style.display = "block";
    Array.from(document.querySelectorAll('input')).map((input)=>{input.style.background="var(--Very-Dark-Desaturated-Blue)";input.style.color="#ffffff"});
    document.querySelector('.tasks-actions').style.background="var(--Very-Dark-Desaturated-Blue)";
    Array.from(document.querySelectorAll('li')).map((li)=>{
      li.style.color = "#ffffff";
    });
    Array.from(document.querySelectorAll('p')).map((p)=>{
      p.style.color = "#ffffff";
    });
    document.querySelector('header').style.background = 'url("./images/bg-desktop-dark.jpg")';
  })
}

const checkmark = () => {
  let checkmark =  document.querySelectorAll('.checkmark');
  Array.from(checkmark).map((check)=>{
    check.addEventListener('click',()=>{
      console.log(check);
    })
  })

}

// let drag = null;
// const dragtask = () => {
//   let daytasks = document.querySelectorAll('.day-task');
//   daytasks.forEach(task => {
//     task.addEventListener('dragstart',()=>{
//       task.style.opacity = '0.5';
//       drag = task;
//     });
//     task.addEventListener('dragend',()=>{
//       task.style.opacity = '1';
//       drag = null;
//     })
//   });
//   let tasks = document.querySelector('.box');
//   tasks.forEach(item=>{
//     item.addEventListener('drop',()=>{
//       item.append(drag);
//     })
//   })
 
// }

addTask();
toCompleted();
displayCompleted();
displayAll();
displayActive();
lightMode();
darktMode();
clearCompleted();
let taskschange = document.querySelector('.tasks');
taskschange.addEventListener('change',()=>{
  countTasksLeft();
});

let daytasks = document.querySelector('.tasks');
new Sortable(daytasks,{
  animation:300
});

