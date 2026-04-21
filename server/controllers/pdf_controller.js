import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({
        error: "No content found",
      });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );

    doc.pipe(res);

    //  TITLE
    doc
      .fontSize(22)
      .fillColor("#4f46e5")
      .text("ExamNotes AI", { align: "center" });

    doc.moveDown();

    //  IMPORTANCE
    if (result.importance) {
      doc
        .fontSize(14)
        .fillColor("black")
        .text(`Importance: ${result.importance}`);
      doc.moveDown(0.5);
    }

    //  SUBTOPICS
    if (result.subTopics) {
      Object.entries(result.subTopics).forEach(([star, topics]) => {
        doc
          .fontSize(13)
          .fillColor("#111827")
          .text(`${star} Topics:`);

        topics.forEach((t) => {
          doc.fontSize(12).text(`• ${t}`);
        });

        doc.moveDown(0.5);
      });
    }

    doc.moveDown();

    //  NOTES
    if (result.notes) {
      doc.fontSize(16).text("Notes");
      doc.moveDown(0.5);

      doc
        .fontSize(12)
        .text(result.notes.replace(/[#*]/g, ""), {
          align: "justify",
        });

      doc.moveDown();
    }

    //  REVISION
    if (result.revisionPoints?.length) {
      doc.fontSize(16).text("Revision Points");
      doc.moveDown(0.5);

      result.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`• ${p}`);
      });

      doc.moveDown();
    }

    //  QUESTIONS
    if (result.questions) {
      doc.fontSize(16).text("Important Questions");
      doc.moveDown(0.5);

      if (result.questions.short?.length) {
        doc.fontSize(13).text("Short Questions");
        result.questions.short.forEach((q) => {
          doc.fontSize(12).text(`• ${q}`);
        });
        doc.moveDown(0.5);
      }

      if (result.questions.long?.length) {
        doc.fontSize(13).text("Long Questions");
        result.questions.long.forEach((q) => {
          doc.fontSize(12).text(`• ${q}`);
        });
        doc.moveDown(0.5);
      }

      if (result.questions.diagram?.length) {
        doc.fontSize(13).text("Diagram Questions");
        result.questions.diagram.forEach((q) => {
          doc.fontSize(12).text(`• ${q}`);
        });
      }
    }

    doc.end();

  } catch (error) {
    console.error("PDF Error:", error);
    res.status(500).json({
      error: "PDF generation failed",
    });
  }
};