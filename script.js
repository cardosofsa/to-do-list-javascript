const localStorageKey = 'to-do-list-day'

//Função para não repetir atividade
function validateExisteTask(){
    let values = JSON.parse(localStorage.getItem('to-do-list-day') || "[]")  
    let inputValue = document.getElementById('input-new-task').input
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true

}
//Função para nova atividade
function newTask(){
    // Obtém o valor do campo de entrada(input), não armazena nem manipula
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    // Validação
    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    } else if (validateExisteTask()){
        alert('Já existe uma atividade com esta descrição!')
    } else {
    // Else -> Irá salvar no localStorage e irá manipular para lista os dados
    let values = JSON.parse(localStorage.getItem('to-do-list-day') || "[]")  
    // Transforma STRING em ARRAY. se for null, o operador lógico || retorna o valor à direita, que é a string "[]" (um array vazio em formato de string)
    values.push({
        name: input.value
    })
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
    }
    //Após digitar limpar o campo
    input.value = ''
}
//Função para mostrar os valores
function showValues()
{
    let values = JSON.parse(localStorage.getItem('to-do-list-day') || "[]")
    let list = document.getElementById('to-do-list')
    // Limpa os elementos da lista
    list.innerHTML = ''
    // Laço de repetição
    for (let i = 0; i < values.length; i++) 
        {
            list.innerHTML += `<li>${values[i]['name']}
            <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
            </svg></button>
            </li>` 
        }
}
//Função para remover os valores
function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem('to-do-list-day') || "[]")
    // Quando clicar em OK ele mostrará qual informação estou selecionando
    let index = values.findIndex(x => x.name == data)
    //
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values)) 
    // Para atualizar o que tenho na tela  
    showValues()

}
//Para quando recarregar a página os outros elementos não sumirem
showValues()

