<?php
  if(isset($_POST['submit'])){
    include_once('config.php');

    $equipamento = $_POST['m-equipamento'];
    $marca = $_POST['m-marca'];
    $modelo = $_POST['m-modelo'];
    $quantidade = $_POST['m-quantidade'];

    $result = mysqli_query($conexao, "INSERT INTO estoque(equipamento,marca,modelo,quantidade) VALUES ('$equipamento', '$marca', '$modelo', '$quantidade')");
    $sql = "SELECT * FROM estoque ORDER BY id DESC";

    $result = $conexao->query($sql);
  }
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Estoque TI - Verde</title>
  <link rel="icon" href="./assets/icon.png">
  <link rel="stylesheet" href="style.css">
  <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
 
</head>

<body>
    <header>
        <img src="./assets/logoverde.svg" alt="">
    </header>

  <div class="container">
    <div class="header">
      <span>Estoque de equipamentos - TI</span>
      <button onclick="openModal()" id="new">Incluir</i></button>
    </div>

    <div class="divTable">
      <table>
          <thead>
                <tr>
                    <th>#</th>
                    <th>Equipamento</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Quantidade</th>
                    <th class="acao">Editar</th>
                    <th class="acao">Excluir</th>
                </tr>
          </thead>
           <tbody>
              <?php
                  while($user_data = mysqli_fetch_assoc($result)){
                    echo "<tr>";
                        echo "<td>".$user_data['id']."</td>";
                        echo "<td>".$user_data['equipamento']."</td>";
                        echo "<td>".$user_data['marca']."</td>";
                        echo "<td>".$user_data['modelo']."</td>";
                        echo "<td>".$user_data['quantidade']."</td>";
                        echo "<td class='acao'>
                          <a href='edit.php?id=$user_data[id]'><button><i class='bx bx-edit' ></i></button></a>
                          </td>";
                        echo "<td class='acao'>
                          <button><i class='bx bx-trash'></i></button>
                          </td>";
                    echo "</tr>";
                  }
              ?>
          </tbody> 
      </table>
    </div>

    <div class="modal-container">
      <div class="modal">
      <form action="index.php" method="POST">
          <label for="m-equipamento">Equipamento</label>
          <input id="m-equipamento" name="m-equipamento" type="text" required />
  
          <label for="m-marca">Marca</label>
          <input id="m-marca" name="m-marca" type="text" required />
  
          <label for="m-modelo">Modelo</label>
          <input id="m-modelo" name="m-modelo" type="text" required />

          <label for="m-quantidade">Quantidade</label>
          <input id="m-quantidade" name="m-quantidade" type="number" required />

          <input id="submit" name="submit" type="submit" required />
        </form>
      </div>
    </div>

  </div>
  <script src="script.js"></script>
</body>

</html>