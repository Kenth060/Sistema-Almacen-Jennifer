const PDFDocument = require("pdfkit-table");
const conexion = require('../database/db');

function buildReporteVentas(dataCallback, endCallback , Datos )
{
    const doc = new PDFDocument();

    doc.on('data',dataCallback);
    doc.on('end',endCallback);

    const addHeader = (Periodo) => 
    {
        doc.font('Times-Bold');
        // Agregar imagen
        doc.image('./LogoACJ.png', 30, 10, { width: 80 });
        
        doc.fillColor('#077E8B')
        // Texto 'Reportes Mensuales'
        doc.fontSize(18).text(`Almacén Comercial Jennifer`, 120, 20, { align: 'center' })
        .fillColor('black')
        .moveDown(0.01)
        .fontSize(15).text(`Reporte de Ventas ${Periodo}`, { align: 'center' }) 
        .font('Times-Roman')
        .fontSize(12).text('Dirección: De la Nestlé 1 cuadra al sur, 2 cuadras abajo 2 cuadras al sur',{ align: 'center' });
        doc.text('Teléfono:  2232-3159', { align: 'center' });
        
        // Línea separadora
        doc.moveTo(0, 100)
        .lineWidth(2)
        .lineTo(700, 100)
        .strokeColor('#077E8B')
        .stroke();

        // Agregar contenido de ejemplo (tablas, etc.)
        doc.fontSize(12).text('',50,110, { align: 'justify' });
    };

    const addTable = async (title, data) => 
    {   
        doc.font('Times-Bold').fontSize(14).text(`${title}`, { bulletRadius: 5 }).moveDown(0.5);

        const totalVendido = data.reduce((sum, row) => sum + parseFloat(row[2].replace('C$ ', '')), 0);
        const footer= ['', 'Total ', `C$ ${totalVendido.toFixed(2)}`];
        data.push(footer);

        // Configuración de la tabla
        const table = 
        {
            title: ``, 
            headers: [
                { label: 'Producto', align: 'center', headerColor: '#28A745', color: '#FFFFFF'},
                { label: 'Cantidad Vendida', align: 'center', headerColor: '#28A745', color: '#FFFFFF' },
                { label: 'Ingresos totales', align: 'center', headerColor: '#28A745', color: '#FFFFFF' }
            ],
            rows: data,
        };

        // Dibujar la tabla
        await doc.table(table, {
            width: 500
        });
        doc.moveDown(2); // Espacio después de la tabla
    }; 

    const mapearProductos = (productos) => 
    {
        return productos.map(producto => [
            `${producto.Descripcion}`,
            `${producto.TotalVendido}`,
            `C$ ${producto.IngresoTotal}`
        ]);
    }

    // Agregar el encabezado
    addHeader(Datos[0].Titulo);
    // Agregar tablas con datos de ejemplo
    addTable('Informe de Ventas al Contado',mapearProductos(Datos[1]) );
    addTable('Ingresos de Ventas al Crédito', mapearProductos(Datos[2]) );
    addTable('Ingresos Totales', mapearProductos(Datos[3]) ); 

    doc.end();
} 

function buildReporteVentas(dataCallback, endCallback , Datos )
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
    

} 
    

module.exports = buildReporteVentas;