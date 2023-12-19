package pl.backend.airlinemanagmentapp.file;

import com.itextpdf.barcodes.BarcodeQRCode;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.io.util.StreamUtil;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketResponseDTO;
import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class FileService {

    private final ResourceLoader resourceLoader;

    public byte[] generateTicketPdf(TicketResponseDTO ticket) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        Table table = new Table(2);
        table.addCell(new Cell().add(new Paragraph("Passenger e-mail: ")));
        table.addCell(new Cell().add(new Paragraph(ticket.user().username())));
        table.addCell(new Cell().add(new Paragraph("Flight Number: ")));
        table.addCell(new Cell().add(new Paragraph(ticket.flight().flightNumber())));
        document.add(table);

        BarcodeQRCode qrCode = new BarcodeQRCode("ticket information");
        Image qrCodeImage = new Image(qrCode.createFormXObject(pdf));
        document.add(qrCodeImage);

/*        Resource resource = resourceLoader.getResource("classpath:static/airplane-vector.png");
        ImageData imageData = ImageDataFactory.create(StreamUtil.inputStreamToArray(resource.getInputStream()));

        Image img = new Image(imageData);
        document.add(img);*/

        document.close();
        return byteArrayOutputStream.toByteArray();
    }

}