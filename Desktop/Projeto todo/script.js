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
  // Cria o item da lista
  const li = document.createElement("li");
  li.textContent = texto;

  // Clica na tarefa para marcar como concluída
  li.addEventListener("click", function () {
    li.classList.toggle("concluida");
  });

  // Botão de deletar
  const btnDeletar = document.createElement("button");
  btnDeletar.textContent = "✕";
  btnDeletar.classList.add("btn-deletar");
  btnDeletar.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(btnDeletar);
  lista.appendChild(li);

  // Limpa o input
  input.value = "";
  input.focus();
}