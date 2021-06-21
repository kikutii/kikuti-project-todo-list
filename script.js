const INPUT_TEXTO_TAREFA = document.getElementById('texto-tarefa');
const OL_LISTA_TAREFAS = document.getElementById('lista-tarefas');
const BTN_CRIAR_TAREFA = document.getElementById('adicionar-tarefa');
const BTN_APAGA_TUDO = document.getElementById('remover-tudo');
const BTN_REMOVER_FINALIZADOS = document.getElementById('remover-finalizados');
let counter = 0;

const completedTaskArray = [];
let lastTargetSelected;

function insertNewListItem() {
  if (INPUT_TEXTO_TAREFA.value !== '') {
    const NEW_LI = document.createElement('li');
    OL_LISTA_TAREFAS.appendChild(NEW_LI);
    counter += 1;

    const NEW_CHECKBOX = document.createElement('input');
    NEW_CHECKBOX.type = 'checkbox';
    NEW_CHECKBOX.className = 'checkbox-tarefa';
    NEW_CHECKBOX.id = counter;
    NEW_LI.appendChild(NEW_CHECKBOX);

    const NEW_LABEL = document.createElement('label');
    NEW_LABEL.htmlFor = counter;
    NEW_LABEL.innerHTML += INPUT_TEXTO_TAREFA.value;
    NEW_LI.appendChild(NEW_LABEL);

    INPUT_TEXTO_TAREFA.value = '';
  }
}

function selectLi(event) {
  const CURRENT_TARGET = event.target;

  if (CURRENT_TARGET !== lastTargetSelected) {
    CURRENT_TARGET.classList.add('selected');
    if (lastTargetSelected !== undefined) {
      lastTargetSelected.classList.remove('selected');
    }
  }
  lastTargetSelected = CURRENT_TARGET;
}

function completedTask(event) {
  const CURRENT_TARGET = event.target;
  if (CURRENT_TARGET.classList[0] === 'completed' || CURRENT_TARGET.classList[1] === 'completed') {
    CURRENT_TARGET.classList.remove('completed');
    completedTaskArray.splice(completedTaskArray.length - 1, 1);
  } else {
    CURRENT_TARGET.classList.add('completed');
    completedTaskArray.push(CURRENT_TARGET);
  }
}

function removeCompletedTasks() {
  for (let index = 0; index < completedTaskArray.length; index += 1) {
    completedTaskArray[index].remove();
  }
}

function clearList() {
  OL_LISTA_TAREFAS.innerHTML = '';
}

window.onload = () => {
  BTN_CRIAR_TAREFA.addEventListener('click', insertNewListItem);
  BTN_APAGA_TUDO.addEventListener('click', clearList);
  BTN_REMOVER_FINALIZADOS.addEventListener('click', removeCompletedTasks);
  OL_LISTA_TAREFAS.addEventListener('click', selectLi);
  OL_LISTA_TAREFAS.addEventListener('dblclick', completedTask);
};
