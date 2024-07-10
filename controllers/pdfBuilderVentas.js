const PDFDocument = require("pdfkit-table");
const conexion = require('../database/db');






/* function buildReporteVentas(dataCallback, endCallback , Datos )
{
    const doc = new PDFDocument();

    doc.on('data',dataCallback);
    doc.on('end',endCallback);

    doc.font('Times-Bold');

    const table = {
        title: { label: 'Informe de Ventas al Contado', fontSize: 16, fontFamily: 'Times-Bold' },
        subtitle: { label: 'Mes de Julio',  fontSize: 13,fontFamily: 'Times-Roman' },
        headers: [
          { label: "Productos", property: 'name', width: 60, renderer: null },
          { label: "Cantidad Vendida", property: 'description', width: 150, renderer: null }, 
          { label: "Ingresos Totales", property: 'price1', width: 100, renderer: null }, 
          { label: "Price 2", property: 'price2', width: 100, renderer: null }, 
          { label: "Price 3", property: 'price3', width: 80, renderer: null }, 
          { label: "Price 4", property: 'price4', width: 43, 
            renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => { return `U$ ${Number(value).toFixed(2)}` } 
          },
        ],
        // complex data
        datas: [
          { 
            name: 'Name 1', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', 
            price1: '$1', 
            price3: '$ 3', 
            price2: '$2', 
            price4: '4', 
          },
          { 
            options: { fontSize: 10, separation: true},
            name: 'bold:Name 2', 
            description: 'bold:Lorem ipsum dolor.', 
            price1: 'bold:$1', 
            price3: { 
              label: 'PRICE $3', options: { fontSize: 12 } 
            }, 
            price2: '$2', 
            price4: '4', 
          },
          // {...},
        ],
        // simeple data
        rows: [
          [
            "Apple",
            "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
            "$ 105,99",
            "$ 105,99",
            "$ 105,99",
            "105.99",
          ],
          // [...],
        ],
      };

      // the magic
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Times-Roman").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        },
      });
      // done!
      doc.end();
    

}  */
    

module.exports = buildReporteVentas;