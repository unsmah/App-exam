import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  Packer
} from 'docx';
import { ExamDocument } from '../types';

export async function exportExamToDocx(exam: ExamDocument, includeAnswerKey: boolean = false) {
  const h = exam.headerConfig;

  // Header Table (Algerian Ministry header & student info)
  const headerRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE }
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: h.republicTitle, bold: true, size: 18 }),
              ],
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              children: [
                new TextRun({ text: h.ministryTitle, size: 16 }),
              ],
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${h.wilaya} - ${h.schoolName}`, bold: true, size: 18 }),
              ],
              alignment: AlignmentType.LEFT
            })
          ]
        }),
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE }
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `Academic Year: ${h.academicYear}`, bold: true, size: 18 }),
              ],
              alignment: AlignmentType.RIGHT
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Level: ${exam.schoolYear}`, bold: true, size: 18 }),
              ],
              alignment: AlignmentType.RIGHT
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Duration: ${exam.durationMinutes} min   |   Total: ${exam.totalPoints} pts`, bold: true, size: 18 }),
              ],
              alignment: AlignmentType.RIGHT
            })
          ]
        })
      ]
    })
  ];

  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: headerRows
  });

  const docChildren: (Paragraph | Table)[] = [
    headerTable,
    new Paragraph({ text: '', spacing: { after: 120 } }),
    // Exam Title Banner
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 140 },
      children: [
        new TextRun({
          text: exam.title.toUpperCase(),
          bold: true,
          size: 26,
          underline: {}
        })
      ]
    }),
    // Student Info line
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: h.studentNamePlaceholder || `Full Name: ................................................................   Class: ${exam.schoolYear} ...`,
          bold: true,
          size: 20
        })
      ]
    })
  ];

  if (exam.instructions) {
    docChildren.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: `General Instructions: ${exam.instructions}`,
            italics: true,
            size: 18
          })
        ]
      })
    );
  }

  // Sections
  (exam.sections || []).forEach((sec, sIdx) => {
    // Section Header
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: `${sec.title} (${sec.points} pts)`,
            bold: true,
            size: 22
          })
        ]
      })
    );

    // Reading Passage if present
    if (sec.passage) {
      if (sec.passageTitle) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 60 },
            children: [
              new TextRun({
                text: sec.passageTitle,
                bold: true,
                size: 22
              })
            ]
          })
        );
      }

      // Paragraphs of the passage
      const paragraphs = sec.passage.split('\n\n');
      paragraphs.forEach(pText => {
        docChildren.push(
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: pText.trim(),
                size: 20
              })
            ]
          })
        );
      });

      if (sec.passageSource) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: `Source: ${sec.passageSource}`,
                italics: true,
                size: 16
              })
            ]
          })
        );
      }
    }

    // Questions
    (sec.questions || []).forEach((q, qIdx) => {
      docChildren.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: `${q.instruction || `Activity ${qIdx + 1}:`} (${q.points} pt${q.points > 1 ? 's' : ''})`,
              bold: true,
              size: 20
            })
          ]
        })
      );

      const qLines = q.question.split('\n');
      qLines.forEach(line => {
        docChildren.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: line,
                size: 20
              })
            ]
          })
        );
      });

      if (q.options && q.options.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: q.options.join('   |   '),
                size: 18
              })
            ]
          })
        );
      }
    });
  });

  // Writing Task / Situation of Integration
  if (exam.writingTask) {
    const wt = exam.writingTask;
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        children: [
          new TextRun({
            text: `${wt.title} (${wt.points} pts)`,
            bold: true,
            size: 22
          })
        ]
      })
    );

    docChildren.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: wt.prompt,
            size: 20
          })
        ]
      })
    );

    if (wt.cues && wt.cues.length > 0) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 60, after: 40 },
          children: [
            new TextRun({
              text: 'The following cues and hints can help you:',
              italics: true,
              bold: true,
              size: 18
            })
          ]
        })
      );

      wt.cues.forEach(cue => {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: cue,
                size: 18
              })
            ]
          })
        );
      });
    }

    // Student writing lines placeholder
    docChildren.push(
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({
            text: 'Your Production:\n................................................................................................................................................................................\n................................................................................................................................................................................\n................................................................................................................................................................................\n................................................................................................................................................................................\n................................................................................................................................................................................\n................................................................................................................................................................................',
            size: 18
          })
        ]
      })
    );
  }

  // Answer Key Page if requested
  if (includeAnswerKey) {
    docChildren.push(
      new Paragraph({
        pageBreakBefore: true,
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 160 },
        children: [
          new TextRun({
            text: `TEACHER'S CORRECTION & MARKING SCHEME`,
            bold: true,
            size: 26,
            underline: {}
          })
        ]
      })
    );

    exam.sections.forEach(sec => {
      docChildren.push(
        new Paragraph({
          spacing: { before: 160, after: 80 },
          children: [
            new TextRun({
              text: `SECTION: ${sec.title}`,
              bold: true,
              size: 20
            })
          ]
        })
      );

      sec.questions.forEach((q, qIdx) => {
        docChildren.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `Activity ${qIdx + 1} (${q.points} pt${q.points > 1 ? 's' : ''}): `,
                bold: true,
                size: 18
              }),
              new TextRun({
                text: q.answer || 'Answer provided in key',
                size: 18
              })
            ]
          })
        );
      });
    });

    if (exam.writingTask && exam.writingTask.rubric) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 160, after: 80 },
          children: [
            new TextRun({
              text: `WRITING TASK GRADING RUBRIC (${exam.writingTask.points} pts)`,
              bold: true,
              size: 20
            })
          ]
        })
      );

      exam.writingTask.rubric.forEach(r => {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `${r.criterion}: `,
                bold: true,
                size: 18
              }),
              new TextRun({
                text: `${r.points} pt(s) ${r.description ? `(${r.description})` : ''}`,
                size: 18
              })
            ]
          })
        );
      });
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${exam.schoolYear}_${exam.title.replace(/[^a-zA-Z0-9]/g, '_')}${includeAnswerKey ? '_With_Answer_Key' : ''}.docx`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
