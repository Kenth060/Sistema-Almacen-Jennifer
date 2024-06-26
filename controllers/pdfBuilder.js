const PDFDocument = require("pdfkit-table");

function buildReporteVentas(dataCallback, endCallback)
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
        doc.fontSize(18).text('Almacén Comercial Jennifer', 120, 20, { align: 'center' })
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
    };

    // Agregar el encabezado
    addHeader('del Mes de Junio del 2024');

    const addTable = async (title, data) => {
        doc.font('Times-Bold').fontSize(14).text(`• ${title}`, { bulletRadius: 5 }).moveDown(0.5);

        // Configuración de la tabla
        const table = {
            title: 'Mes de Junio', 
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
        doc.moveDown(1); // Espacio después de la tabla
    };

 
    // Datos de ejemplo para las tablas
    const exampleData = [
        ['Producto 1', '100', '$1000'],
        ['Producto 2', '150', '$1500'],
        ['Producto 3', '200', '$2000'],
        ['Producto 4', '250', '$2500'],
        ['Producto 5', '300', '$3000'],
        ['Producto 6', '350', '$3500'],
        ['Producto 7', '400', '$4000'],
        ['Producto 8', '450', '$4500'],
        ['Producto 9', '500', '$5000'],
        ['Producto 10', '550', '$5500'],
        ['Producto 11', '600', '$6000'],
        ['Producto 12', '650', '$6500'],
        ['Producto 13', '700', '$7000'],
        ['Producto 14', '750', '$7500'],
        ['Producto 15', '800', '$8000']
    ];
    

    doc.moveDown(2);
    // Agregar contenido de ejemplo (tablas, etc.)
    doc.fontSize(12).text('',50,110, { align: 'justify' });
        // Agregar tablas con datos de ejemplo
        addTable('Informe de Ventas al Contado', exampleData);
        addTable('Ingresos de Ventas al Crédito', exampleData);
        addTable('Otro Tipo de Informe', exampleData);

    doc.end();
}

module.exports = buildReporteVentas;