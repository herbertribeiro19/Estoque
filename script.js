const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sEquipamento = document.querySelector('#m-equipamento')
const sMarca = document.querySelector('#m-marca')
const sModelo = document.querySelector('#m-modelo')
const sQuantidade = document.querySelector('#m-quantidade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sEquipamento.value = itens[index].equipamento
    sMarca.value = itens[index].marca
    sModelo.value = itens[index].modelo
    sQuantidade.value = itens[index].quantidade
    id = index
  } else {
    sEquipamento.value = ''
    sMarca.value = ''
    sModelo.value = ''
    sQuantidade.value = ''
  }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.equipamento}</td>
    <td>${item.marca}</td>
    <td>${item.modelo}</td>
    <td>${item.quantidade} Unidades</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sEquipamento.value == '' || sMarca.value == '' || sModelo.value == ''|| sQuantidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].equipamento = sEquipamento.value
    itens[id].marca = sMarca.value
    itens[id].modelo = sModelo.value
    itens[id].quantidade = sQuantidade.value
  } else {
    itens.push({'equipamento': sEquipamento.value, 'marca': sMarca.value, 'modelo': sModelo.value, 'quantidade': sQuantidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()