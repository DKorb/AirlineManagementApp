package pl.backend.airlinemanagmentapp.file;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketResponseDTO;

import java.io.ByteArrayOutputStream;

import org.thymeleaf.TemplateEngine;


@Service
@RequiredArgsConstructor
public class FileService {

    private final TemplateEngine templateEngine;


    public byte[] generateTicketPdf(TicketResponseDTO ticket) {
        var thymeleafContext = new Context();
        thymeleafContext.setVariable("ticket", ticket);

        String htmlContent = templateEngine.process("ticketTemplate", thymeleafContext);

        var byteArrayOutputStream = new ByteArrayOutputStream();

        var converterProperties = new ConverterProperties();
        var fontProvider = new DefaultFontProvider(true, true, true);
        converterProperties.setFontProvider(fontProvider);

        HtmlConverter.convertToPdf(htmlContent, byteArrayOutputStream, converterProperties);

        return byteArrayOutputStream.toByteArray();
    }

}