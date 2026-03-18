let tarefas = [];

// Salva as tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Carrega as tarefas quando a página abre
function carregarTarefas() {
  const salvas = localStorage.getItem("tarefas");
  if (salvas) {
    tarefas = JSON.parse(salvas);
    tarefas.forEach(function (tarefa) {
      criarElementoTarefa(tarefa.texto, tarefa.concluida);
    });
  }
}

// Cria o elemento visual da tarefa na tela
function criarElementoTarefa(texto, concluida) {
  const li = document.createElement("li");
  li.textContent = texto;

  if (concluida) {
    li.classList.add("concluida");
  }

  li.addEventListener("click", function () {
    li.classList.toggle("concluida");
    const index = Array.from(lista.children).indexOf(li);
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefas();
  });

  const btnDeletar = document.createElement("button");
  btnDeletar.textContent = "✕";
  btnDeletar.classList.add("btn-deletar");
  btnDeletar.setAttribute("aria-label", "Deletar tarefa");
  btnDeletar.addEventListener("click", function (e) {
    e.stopPropagation();
    const index = Array.from(lista.children).indexOf(li);
    tarefas.splice(index, 1);
    salvarTarefas();
    li.remove();
  });

  li.appendChild(btnDeletar);
  lista.appendChild(li);
}

// Pega os elementos da página
const input = document.getElementById("input-tarefa");
const botao = document.getElementById("btn-adicionar");
const lista = document.getElementById("lista-tarefas");

// Quando clicar no botão, adiciona a tarefa
botao.addEventListener("click", adicionarTarefa);

// Quando apertar Enter, também adiciona
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") adicionarTarefa();
});

function adicionarTarefa() {
  const texto = input.value.trim();

  if (texto === "") return;

  const novaTarefa = { texto: texto, concluida: false };
  tarefas.push(novaTarefa);
  salvarTarefas();

  criarElementoTarefa(texto, false);

  input.value = "";
  input.focus();
}

// Carrega as tarefas salvas quando a página abre
carregarTarefas();