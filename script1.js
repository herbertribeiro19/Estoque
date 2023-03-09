const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sEquipamento = document.querySelector('#m-equipamento')
const sMarca = document.querySelector('#m-marca')
const sModelo = document.querySelector('#m-modelo')
const sQuantidade = document.querySelector('#m-quantidade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
  }

  loadItens()
  
  function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.Equipamento}</td>
      <td>R$ ${item.Marca}</td>
      <td>R$ ${item.Modelo}</td>
      <td>R$ ${item.Quantidade}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  function editItem(index) {
    openModal(true, index)
  }
  
  function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }


function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sEquipamento.value = itens[index].Equipamento
      sMarca.value = itens[index].Marca
      sModelo.value = itens[index].Modelo
      sQuantidade.value = itens[index].Quantidade
      id = index
    } else {
      sEquipamento.value = ''
      sMarca.value = ''
      sModelo.value = ''
      sQuantidade.value = ''
    }
  }

  btnSalvar.onclick = e => {
  
    if (sEquipamento.value == '' || sProduto.value == '' || sMarca.value == '' || sModelo.value == '' || sQuantidade.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].Equipamento = sEquipamento.value
      itens[id].Produto = sProduto.value
      itens[id].Marca = sMarca.value
      itens[id].Modelo = sModelo.value
      itens[id].Quantidade = sQuantidade.value
    } else {
      itens.push({'Equipamento': sEquipamento.value, 'Produto': sProduto.value, 'Marca': sMarca.value, 'Marca': sModelo.value, 'Marca': sQuantidade.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
  
  loadItens()