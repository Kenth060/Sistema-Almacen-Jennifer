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
        .lineTo(700, 100)
        .strokeColor('#077E8B')
        .stroke();

        // Agregar contenido de ejemplo (tablas, etc.)
        doc.fontSize(12).text('',50,110, { align: 'justify' });
    };

    const addTable = async (title, data) => 
    {   
        doc.font('Times-Bold').fontSize(14).text(`• ${title}`, { bulletRadius: 5 }).moveDown(0.5);

        // Configuración de la tabla
        const table = 
        {
            title: ``, 
            headers: [
                { label: 'Producto', align: 'center', headerColor: '#28A745', color: '#FFFFFF' },
                { label: 'Cantidad Vendida', align: 'center', headerColor: '#28A745', color: '#FFFFFF' },
                { label: 'Ingresos totales', align: 'center', headerColor: '#28A745', color: '#FFFFFF' }
            ],
            rows: data
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

module.exports = buildReporteVentas;