package com.info5059.casestudy.purchaseorder;

import com.info5059.casestudy.Product.Product;
import com.info5059.casestudy.Product.ProductRepository;
import com.info5059.casestudy.Product.QRCodeGenerator;
import com.info5059.casestudy.vendor.Vendor;
import com.info5059.casestudy.vendor.VendorRepository;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
// import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
// import java.math.MathContext;
// import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class PurchaseOrderPDFGenerator extends AbstractPdfView {
    public static ByteArrayInputStream generatePurchaseOrder(String poid, PurchaseOrderRepository poRepository,
        VendorRepository vendorRepository, ProductRepository productRepository, QRCodeGenerator qrCodeGenerator) throws IOException {
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        URL imageUrl = PurchaseOrderPDFGenerator.class.getResource("/static/images/TeamRocketLogo.png");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        // Initialize PDF document to be written to a stream not a file
        PdfDocument pdf = new PdfDocument(writer);
        // Document is the main object
        Document document = new Document(pdf);
        PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        // add the image to the document
        Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(80, 80);
        document.add(img);
        // now let's add a big heading
        Locale locale = Locale.of("en", "US");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

        try {
            Table headerTable = new Table(1).setWidth(new UnitValue(UnitValue.PERCENT, 130)).setMarginTop(-60)
                            .setHorizontalAlignment(HorizontalAlignment.LEFT);
            headerTable.addCell(
                            new Cell()
                            .add(new Paragraph("Purchase Order"))
                            .setFont(font)
                            .setFontSize(18)
                            .setBold()
                            .setTextAlignment(TextAlignment.CENTER)
                            .setBorder(Border.NO_BORDER));
            headerTable.addCell(
                            new Cell()
                            .add(new Paragraph("# " + poid))
                            .setFont(font)
                            .setFontSize(14)
                            .setBold()
                            .setTextAlignment(TextAlignment.CENTER)
                            .setBorder(Border.NO_BORDER));
            document.add(headerTable);
            document.add(new Paragraph("\n\n\n"));

            Optional<PurchaseOrder> opt = poRepository.findById(poid);
            if (opt.isPresent()) {
                // Set data to a PurchaseOrder class variable
                purchaseOrder = opt.get();

                // Get vendor info
                Vendor vendor = vendorRepository.findById(purchaseOrder.getVendorid()).get();
                // Table for vendor header data
                Table vendorTable = new Table(2).setWidth(new UnitValue(UnitValue.PERCENT, 30))
                                .setHorizontalAlignment(HorizontalAlignment.LEFT);
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph("Vendor:")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph(vendor.getName())
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER)
                                .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph("")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph(vendor.getAddress1())
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER)
                                .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph("")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph(vendor.getCity())
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER)
                                .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph("")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph(vendor.getProvince())
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER)
                                .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph("")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER));
                vendorTable.addCell(
                                new Cell()
                                .add(new Paragraph(vendor.getEmail())
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.LEFT)
                                .setBorder(Border.NO_BORDER)
                                .setBackgroundColor(ColorConstants.LIGHT_GRAY));

                // Add employee-table data to the container document
                document.add(vendorTable);
                document.add(new Paragraph("\n"));

                Table purchaseOrderTable = new Table(5).setWidth(new UnitValue(UnitValue.PERCENT, 100))
                                .setHorizontalAlignment(HorizontalAlignment.LEFT);
                purchaseOrderTable.addCell(
                                new Cell()
                                .add(new Paragraph("Product Code")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.CENTER));
                purchaseOrderTable.addCell(
                                new Cell()
                                .add(new Paragraph("Description")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.CENTER));
                purchaseOrderTable.addCell(
                                new Cell()
                                .add(new Paragraph("Qty Sold")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.CENTER));
                purchaseOrderTable.addCell(
                                new Cell()
                                .add(new Paragraph("Price")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.CENTER));
                purchaseOrderTable.addCell(
                                new Cell()
                                .add(new Paragraph("Ext. Price")
                                .setFont(font)
                                .setFontSize(12)
                                .setBold())
                                .setTextAlignment(TextAlignment.CENTER));

                BigDecimal tot = new BigDecimal(0.0);
                for(PurchaseOrderLineItem line: purchaseOrder.getItems()) {
                    Optional<Product> optx = productRepository.findById(line.getProductid());
                    if (optx.isPresent()) {
                        Product product = optx.get();
                        purchaseOrderTable.addCell(
                                        new Cell()
                                        .add(new Paragraph(product.getId())
                                        .setFont(font)
                                        .setFontSize(12))
                                        .setTextAlignment(TextAlignment.CENTER));
                        purchaseOrderTable.addCell(
                                        new Cell()
                                        .add(new Paragraph(product.getName())
                                        .setFont(font)
                                        .setFontSize(12))
                                        .setTextAlignment(TextAlignment.CENTER));
                        purchaseOrderTable.addCell(
                                        new Cell()
                                        .add(new Paragraph(String.valueOf(line.getQty()))
                                        .setFont(font)
                                        .setFontSize(12))
                                        .setTextAlignment(TextAlignment.RIGHT));
                        purchaseOrderTable.addCell(
                                        new Cell()
                                        .add(new Paragraph(formatter.format(product.getCostprice()))
                                        .setFont(font)
                                        .setFontSize(12))
                                        .setTextAlignment(TextAlignment.RIGHT));
                        purchaseOrderTable.addCell(
                                        new Cell()
                                        .add(new Paragraph(formatter.format(product.getCostprice().doubleValue() * line.getQty()))
                                        .setFont(font)
                                        .setFontSize(12))
                                        .setTextAlignment(TextAlignment.RIGHT));

                        tot = tot.add(new BigDecimal(product.getCostprice().doubleValue() * line.getQty()));
                    }
                }

                purchaseOrderTable.addCell(
                    new Cell(1, 4)
                    .setBorder(Border.NO_BORDER)
                    .add(new Paragraph("Sub Total:")
                    .setFont(font)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT)));
                purchaseOrderTable.addCell(
                    new Cell()
                    .add(new Paragraph(formatter.format(tot)))
                    .setFont(font)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT));
                purchaseOrderTable.addCell(
                    new Cell(1, 4)
                    .setBorder(Border.NO_BORDER)
                    .add(new Paragraph("Tax:")
                    .setFont(font)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT)));
                purchaseOrderTable.addCell(
                    new Cell()
                    .add(new Paragraph(formatter.format(tot.doubleValue() * 0.13))
                    .setFont(font)
                    .setFontSize(12))
                    .setTextAlignment(TextAlignment.RIGHT));
                purchaseOrderTable.addCell(
                    new Cell(1, 4)
                    .setBorder(Border.NO_BORDER)
                    .add(new Paragraph("PO Total:")
                    .setFont(font)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT)));
                purchaseOrderTable.addCell(
                    new Cell()
                    .add(new Paragraph(formatter.format(tot.doubleValue() * 1.13))
                    .setFont(font)
                    .setFontSize(12))
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBackgroundColor(ColorConstants.YELLOW));

                document.add(purchaseOrderTable);

                // Add report datetime
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd h:mm:ss a");
                document.add(new Paragraph("\n\n"));
                document.add(new Paragraph(dateFormatter.format(purchaseOrder.getPodate())).setTextAlignment(TextAlignment.CENTER));

                Image qrcode = addSummaryQRCode(vendor, purchaseOrder, qrCodeGenerator);
                document.add(qrcode);
                document.close();

            } else {
                document.add(new Paragraph("Purchase Order # " + poid + " not found..."));
            }
        } catch (Exception ex) {
            Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new ByteArrayInputStream(baos.toByteArray());
    }

    private static Image addSummaryQRCode(Vendor vendor, PurchaseOrder po, QRCodeGenerator qGenerator) {
        var dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd h:mm a");
        Locale locale = Locale.of("en", "US");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
        
        byte[] code = qGenerator.generateQRCode(("Summary for Purchase Order:" + po.getId()
                                                + "\nDate:" + dateFormatter.format(po.getPodate())
                                                + "\nVendor:" + vendor.getName() + "\nTotal:"
                                                + formatter.format(po.getAmount())));

        
        var qrcode = new Image(ImageDataFactory.create(code)).scaleAbsolute(100, 100).setFixedPosition(460,60);

        return qrcode;
    }
}
