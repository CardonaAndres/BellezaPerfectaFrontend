import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Invoice } from "../ts/types";

declare module 'jspdf' {
    interface jsPDF {
      lastAutoTable: {
        finalY: number;
      };
    }
}

export class InvoicesFormats {
  static async downloadInvoiceAsPDF(invoice: Invoice) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor: [number, number, number] = [255, 179, 0];
    const textColor: [number, number, number] = [255, 255, 255];
    const accentColor: [number, number, number] = [38, 38, 38];
    const secondaryColor: [number, number, number] = [26, 26, 26];

    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;

    const today = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    doc.setFillColor(...secondaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setFillColor(...primaryColor);
    doc.rect(0, 40, pageWidth, 3, 'F');

    doc.setFontSize(22);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURA', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`N° ${(invoice.invoice_ID || 0).toString().padStart(6, '0')}`, pageWidth / 2, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');

    const companyInfo = [
      'Belleza Perfecta',
      'NIT: 1007222883',
      'Dirección: Calle 83A #57-02',
      'Teléfono: +57 311 747 7869',
      'Email: Zuleluisa50@gmail.com'
    ];

    let yPos = 50;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    companyInfo.forEach(line => {
      doc.text(line, margin, yPos);
      yPos += 5;
    });

    const infoBoxX = pageWidth - margin - 80;
    const infoBoxY = 50;
    const infoBoxWidth = 80;
    const infoBoxHeight = 30;

    doc.setDrawColor(...primaryColor);
    doc.setFillColor(...accentColor);
    doc.roundedRect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight, 2, 2, 'FD');

    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    doc.text(`Fecha de emisión: ${this.formatDate(invoice.date_invoice)}`, infoBoxX + 5, infoBoxY + 7);
    doc.text(`Fecha de vencimiento: ${this.formatDate(invoice.date_end)}`, infoBoxX + 5, infoBoxY + 14);
    doc.text(`Forma de pago: ${invoice.type_payment}`, infoBoxX + 5, infoBoxY + 21);

    yPos = Math.max(yPos, infoBoxY + infoBoxHeight + 10);

    doc.setFillColor(...accentColor);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 35, 2, 2, 'F');

    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', margin + 5, yPos + 7);

    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');

    const client = invoice.client_ID;
    doc.text(`Cliente: ${client.name}`, margin + 5, yPos + 15);
    doc.text(`${client.document_type}: ${client.client_ID}`, margin + 5, yPos + 22);
    doc.text(`Dirección: ${invoice.address}, ${invoice.neighborhood}`, margin + 5, yPos + 29);
    doc.text(`Ciudad: ${invoice.city}${invoice.zone ? `, ${invoice.zone}` : ''}`, pageWidth - margin - 70, yPos + 15);
    doc.text(`Teléfono: ${invoice.cellphone}`, pageWidth - margin - 70, yPos + 22);

    yPos += 45;

    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLE DE PRODUCTOS', margin, yPos);

    yPos += 7;

    autoTable(doc, {
      startY: yPos,
      head: [['Código', 'Producto', 'Cantidad', 'Precio Unit.', 'Total']],
      body: invoice.details.map(detail => [
        detail.product_ID.product_ID,
        detail.product_ID.name,
        this.formatNumber(parseFloat(detail.quantity)),
        this.formatCurrency(parseFloat(detail.price)),
        this.formatCurrency(parseFloat(detail.total))
      ]),
      headStyles: {
        fillColor: [...secondaryColor],
        textColor: [...primaryColor],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 35, halign: 'right' }
      },
      margin: { left: margin, right: margin }
    });

    const finalY = (doc.lastAutoTable.finalY || 0) + 10;
    const totalsBoxWidth = 80;
    const totalsBoxX = pageWidth - margin - totalsBoxWidth;
    const totalsBoxY = finalY;
    const totalsBoxHeight = 50;

    doc.setDrawColor(...primaryColor);
    doc.setFillColor(...accentColor);
    doc.roundedRect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsBoxHeight, 2, 2, 'FD');

    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');

    let rowY = totalsBoxY + 8;

    doc.text('Subtotal:', totalsBoxX + 5, rowY);
    doc.text(this.formatCurrency(parseFloat(invoice.subtotal)), totalsBoxX + totalsBoxWidth - 5, rowY, { align: 'right' });
    rowY += 8;

    doc.text('IVA:', totalsBoxX + 5, rowY);
    doc.text(this.formatCurrency(parseFloat(invoice.IVA)), totalsBoxX + totalsBoxWidth - 5, rowY, { align: 'right' });
    rowY += 8;

    if (parseFloat(invoice.retefuente) > 0) {
      doc.text('ReteFuente:', totalsBoxX + 5, rowY);
      doc.text(this.formatCurrency(parseFloat(invoice.retefuente)), totalsBoxX + totalsBoxWidth - 5, rowY, { align: 'right' });
      rowY += 8;
    }

    if (parseFloat(invoice.reteiva) > 0) {
      doc.text('ReteIVA:', totalsBoxX + 5, rowY);
      doc.text(this.formatCurrency(parseFloat(invoice.reteiva)), totalsBoxX + totalsBoxWidth - 5, rowY, { align: 'right' });
      rowY += 8;
    }

    doc.setDrawColor(...primaryColor);
    doc.line(totalsBoxX + 5, rowY - 3, totalsBoxX + totalsBoxWidth - 5, rowY - 3);

    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL:', totalsBoxX + 5, rowY + 5);
    doc.text(this.formatCurrency(parseFloat(invoice.total)), totalsBoxX + totalsBoxWidth - 5, rowY + 5, { align: 'right' });

    const notesY = totalsBoxY + totalsBoxHeight + 15;

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.text('Esta factura es un título valor según la Ley 1231 de 2008 y representa una obligación de pago irrevocable.', margin, notesY);
    doc.text('Para cualquier consulta contacte a nuestro departamento financiero.', margin, notesY + 5);

    const footerY = doc.internal.pageSize.height - 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generado el ${today}`, pageWidth / 2, footerY, { align: 'center' });

    doc.save(`Factura-${(invoice.invoice_ID || 0).toString().padStart(6, '0')}.pdf`);
  }

  static async exportInvoicesToExcel(invoices: Invoice[], fileName = 'facturas.xlsx') {
    const workbook = XLSX.utils.book_new();

    // Hoja 1: Resumen de facturas
    const summaryData = invoices.map((invoice) => ({
      'N° Factura': invoice.invoice_ID,
      'Cliente': invoice.client_ID.name,
      'ID Cliente': invoice.client_ID.client_ID,
      'Fecha Emisión': this.formatDate(invoice.date_invoice),
      'Fecha Vencimiento': this.formatDate(invoice.date_end),
      'Método de Pago': invoice.type_payment,
      'Subtotal': parseFloat(invoice.subtotal).toLocaleString('es-CO'),
      'IVA': parseFloat(invoice.IVA).toLocaleString('es-CO'),
      'Retención': parseFloat(invoice.retefuente).toLocaleString('es-CO'),
      'Total': parseFloat(invoice.total).toLocaleString('es-CO'),
      'Ciudad': invoice.city,
      'Zona': invoice.zone,
      'Dirección': invoice.address,
      'Teléfono': invoice.cellphone,
      'Productos': invoice.details.length,
      'Creado por': invoice.user_ID.name
    }));

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);

    // Ajustar anchos de columna para la hoja de resumen
    const summaryColWidths = [
      { wch: 10 }, // N° Factura
      { wch: 25 }, // Cliente
      { wch: 15 }, // ID Cliente
      { wch: 15 }, // Fecha Emisión
      { wch: 15 }, // Fecha Vencimiento
      { wch: 15 }, // Método de Pago
      { wch: 12 }, // Subtotal
      { wch: 12 }, // IVA
      { wch: 12 }, // Retención
      { wch: 12 }, // Total
      { wch: 15 }, // Ciudad
      { wch: 15 }, // Zona
      { wch: 25 }, // Dirección
      { wch: 15 }, // Teléfono
      { wch: 10 }, // Productos
      { wch: 20 }  // Creado por
    ];

    summarySheet['!cols'] = summaryColWidths;

    // Agregar la hoja de resumen al libro
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen Facturas');

    // Para cada factura, crear una hoja detallada
    invoices.forEach((invoice) => {
      // Datos de la factura
      const invoiceData = [
        ['FACTURA N°', (invoice.invoice_ID || 0).toString()],
        [''],
        ['DATOS DEL CLIENTE'],
        ['Cliente:', invoice.client_ID.name],
        ['Identificación:', `${invoice.client_ID.document_type} ${invoice.client_ID.client_ID}`],
        ['Dirección:', invoice.address],
        ['Ciudad/Zona:', `${invoice.city} / ${invoice.zone}`],
        ['Barrio:', invoice.neighborhood],
        ['Teléfono:', invoice.cellphone],
        [''],
        ['DATOS DE LA FACTURA'],
        ['Fecha Emisión:', this.formatDate(invoice.date_invoice)],
        ['Fecha Vencimiento:', this.formatDate(invoice.date_end)],
        ['Método de Pago:', invoice.type_payment],
        ['Emisor:', invoice.user_ID.name],
        [''],
        ['PRODUCTOS'],
        ['Código', 'Descripción', 'Cantidad', 'Precio Unitario', 'Total']
      ];
      
      // Agregar productos
      invoice.details.forEach(detail => {
        invoiceData.push([
          detail.product_ID.product_ID,
          detail.product_ID.name,
          parseFloat(detail.quantity).toString(),
          `$${parseFloat(detail.price).toLocaleString('es-CO')}`,
          `$${parseFloat(detail.total).toLocaleString('es-CO')}`
        ]);
      });
      
      // Agregar totales
      invoiceData.push(
        [''],
        ['', '', '', 'Subtotal:', `$${parseFloat(invoice.subtotal).toLocaleString('es-CO')}`],
        ['', '', '', 'IVA:', `$${parseFloat(invoice.IVA).toLocaleString('es-CO')}`],
        ['', '', '', 'Retención:', `$${parseFloat(invoice.retefuente).toLocaleString('es-CO')}`],
        ['', '', '', 'Reteiva:', `$${parseFloat(invoice.reteiva).toLocaleString('es-CO')}`],
        ['', '', '', 'TOTAL:', `$${parseFloat(invoice.total).toLocaleString('es-CO')}`]
      );
      
      // Crear la hoja para esta factura
      const invoiceSheet = XLSX.utils.aoa_to_sheet(invoiceData);
      
      // Ajustar anchos de columna para la hoja de factura
      const invoiceColWidths = [
        { wch: 15 }, // Primera columna
        { wch: 30 }, // Segunda columna
        { wch: 10 }, // Tercera columna
        { wch: 15 }, // Cuarta columna
        { wch: 15 }  // Quinta columna
      ];
      invoiceSheet['!cols'] = invoiceColWidths;
      
      // Agregar estilos (merges) para la hoja de factura
      invoiceSheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } } // Combinar celdas para el título
      ];
      
      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(workbook, invoiceSheet, `Factura ${invoice.invoice_ID}`);
      
      // Hoja adicional para los detalles detallados de productos de esta factura
      const productsData = invoice.details.map(detail => ({
        'Código': detail.product_ID.product_ID,
        'Producto': detail.product_ID.name,
        'Descripción': detail.product_ID.description,
        'Unidad': detail.product_ID.unit_measure,
        'Cantidad': parseFloat(detail.quantity),
        'Precio Unitario': `$${parseFloat(detail.price).toLocaleString('es-CO')}`,
        'IVA': `${parseFloat(detail.product_ID.iva)}%`,
        'Total': `$${parseFloat(detail.total).toLocaleString('es-CO')}`
      }));
      
      if (productsData.length > 0) {
        const productsSheet = XLSX.utils.json_to_sheet(productsData);
        
        // Ajustar anchos de columna para la hoja de productos
        const productsColWidths = [
          { wch: 10 }, // Código
          { wch: 25 }, // Producto
          { wch: 30 }, // Descripción
          { wch: 10 }, // Unidad
          { wch: 10 }, // Cantidad
          { wch: 15 }, // Precio Unitario
          { wch: 10 }, // IVA
          { wch: 15 }  // Total
        ];
        productsSheet['!cols'] = productsColWidths;
        
        // Agregar la hoja de productos al libro
        XLSX.utils.book_append_sheet(workbook, productsSheet, `Productos F-${invoice.invoice_ID}`);
      }
    });
    
    XLSX.writeFile(workbook, fileName);
    console.log(`Archivo Excel "${fileName}" generado correctamente con ${invoices.length} facturas.`);
  }

  private static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  private static formatCurrency(value: number): string {
    return `$${value.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  private static formatNumber(value: number): string {
    return value.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
}
