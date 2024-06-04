let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); //llamando a la función (opcional)
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    // La barra lateral se abre al hacer clic en el ícono de búsqueda.
    sidebar.classList.toggle("open");
    menuBtnChange(); //llamando a la función (opcional)
  });
}
//codigo para cambiar el botón de la barra lateral (opcional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //reemplazando la clase de iconos
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //reemplazando la clase de iconos
  }
}

document.querySelector("clientes.html").addEventListener("click", function () {
  window.location = "clientes.html";
});

document.querySelector("vendedores.html").addEventListener("click", function () {
  window.location = "vendedores.html";
});

document.querySelector("productos.html").addEventListener("click", function () {
  window.location = "productos.html";
});

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, 
{
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Meses Anteriores",
        data: valores,
        backgroundColor: ["#12C9E5", "#12C9E5", "#12C9E5", "#12C9E5", "#111B54"],
        maxBarThickness: 30,
        maxBarLength: 2,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
var ctx2 = document.getElementById("myChart2").getContext("2d");
var myChart2 = new Chart(ctx2, 
{
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Meses Anteriores",
        data: valores,
        backgroundColor: ["#12C9E5", "#12C9E5", "#12C9E5", "#12C9E5", "#111B54"],
        maxBarThickness: 30,
        maxBarLength: 2,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

async function genPDF(ingresos, productosnuevos, clientesactivos) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  /*

  // Datos para la tabla
  const headers = ['Ingreso', 'Productos Activos', 'No. de Clientes Activos'];
  const data = [[ingresos, productosnuevos, clientesactivos]];

  // Añadir la tabla al PDF
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 30
  });*/
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx codigo marco de las graficas xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //propiedades del cuadro
  const x = 118; // Posición X del rectángulo
  const y = 5; // Posición Y del rectángulo
  const width = 90; // Ancho del rectángulo
  const height = 286; // Alto del rectángulo
  const borderColor = [192, 192, 192]; // Color del borde (negro)
  const fillColor = [255, 255, 255];// Color de relleno (blanco)

  doc.setDrawColor(...borderColor); // Establece el color del borde
  doc.setFillColor(...fillColor); // Establece el color de relleno
  doc.rect(x, y, width, height, 'FD'); // Dibuja el rectángulo con relleno (F) y borde (D)

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx codigo marco de los textos xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const x2 = 3; // Posición X del rectángulo
  const y2 = 5; // Posición Y del rectángulo
  const width2 = 114; // Ancho del rectángulo
  const height2 = 286; // Alto del rectángulo
  const borderColor2 = [192, 192, 192]; // Color del borde (negro)
  const fillColor2 = [192, 192, 192];// Color de relleno (blanco)

  doc.setDrawColor(...borderColor2); // Establece el color del borde
  doc.setFillColor(...fillColor2); // Establece el color de relleno
  doc.rect(x2, y2, width2, height2, 'FD'); // Dibuja el rectángulo con relleno (F) y borde (D)


  // Convertir los canvas a imagen y agregarlas al PDF
  const canvas = document.getElementById('myChart');
  const canvas2 = document.getElementById('myChart2');
  const canvasImg = canvas.toDataURL('image/png', 1.0);
  const canvasImg2 = canvas2.toDataURL('image/png', 1.0);
  
  // Ajusta las posiciones y tamaños según necesites
  const imgWidth = 80;
  const imgHeight = 65;
  const margin = 10; // margen entre las imágenes

  // Añadir texto arriba de la primera imagen
  doc.text("VENTAS AL CONTADO", x+10, y+10);

  // Añadir primera imagen
  doc.addImage(canvasImg, 'PNG', x+5, y+17, imgWidth, imgHeight);


  
  // Añadir texto entre las dos imágenes
  const secondTextY = 60 + imgHeight + margin - 5;
  doc.text("VENTAS AL CRÉDITO", x+10, secondTextY+7);

  // Añadir segunda imagen con un espacio entre ambas
  const secondImageY = 65 + imgHeight + margin;
  doc.addImage(canvasImg2, 'PNG', x+5, secondImageY, imgWidth, imgHeight);

  // Título del documento
  doc.text("REGISTRO DE VENTAS", 25, 20);

  const introText = `Este informe detalla el desempeño de ventas a lo largo de los meses, destacando los ingresos mensuales, los productos activos y el número de clientes activos. 
  Los datos se presentan con gráficos que permiten una visualización clara de las tendencias y el crecimiento de las ventas al crédito y al contado de cada mes. A continuacion
  se mostrará a más detalle información sobre los ingresos generados en este mes, la cantidad de productos que estan activos, es decir que han sido comprados en los ultimos dias
  y que son bastante solicitados; La cantidad de Clientes activos que tiene la empresa, es decir el número de clientes que han hecho una compra a la empresa en los ultimos dias.`;

  var textdetallesY2 = 150;

  const splitIntroText = doc.splitTextToSize(introText, 100);
  doc.setFontSize(12);
  doc.text(splitIntroText, 20, 35);

  // Agregar datos del mes
  const monthIncome = "En este mes tenemos un ingreso de ";
  const activeProducts = "La cantidad de Productos activos son ";
  const activeClients = "La cantidad de clientes activos es de ";

  

  doc.text(`${monthIncome} ${ingresos}`, 20, textdetallesY2+10);
  doc.text(`${activeProducts} ${productosnuevos}`, 20, textdetallesY2+20);
  doc.text(`${activeClients} ${clientesactivos}`, 20, textdetallesY2+30);
  
  // Guardar el documento
  doc.save('Reporte.pdf');
}
