import { ExamDocument } from '../types';

export function printExamDocument(exam: ExamDocument, mode: 'student' | 'teacher' | 'both' = 'student') {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const h = exam.headerConfig;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${exam.title} - Print</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 15mm 15mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111;
      line-height: 1.35;
      font-size: 13pt;
      margin: 0;
      padding: 10px;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
      font-size: 11pt;
    }
    .header-table td {
      vertical-align: top;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .bold { font-weight: bold; }
    .exam-title-box {
      border: 1.5px solid #222;
      padding: 6px 12px;
      text-align: center;
      font-weight: bold;
      font-size: 14pt;
      margin: 10px 0;
      background-color: #fafafa;
    }
    .student-info-bar {
      border-bottom: 1px dashed #444;
      padding: 4px 0 8px 0;
      margin-bottom: 12px;
      font-size: 11.5pt;
      font-weight: bold;
    }
    .section-title {
      font-weight: bold;
      font-size: 12.5pt;
      margin-top: 14px;
      margin-bottom: 6px;
      border-bottom: 1px solid #111;
      padding-bottom: 2px;
      text-transform: uppercase;
    }
    .passage-box {
      border: 1px solid #777;
      padding: 10px 14px;
      margin: 8px 0 12px 0;
      background-color: #fcfcfc;
      border-radius: 4px;
    }
    .passage-title {
      font-weight: bold;
      text-align: center;
      margin-bottom: 6px;
      font-size: 12.5pt;
    }
    .activity-title {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 4px;
    }
    .question-content {
      margin-left: 8px;
      margin-bottom: 8px;
      white-space: pre-line;
    }
    .writing-box {
      border: 1px solid #333;
      padding: 10px 12px;
      margin-top: 8px;
      border-radius: 4px;
    }
    .cues-list {
      margin: 6px 0;
      padding-left: 20px;
    }
    .student-lines {
      margin-top: 12px;
      line-height: 2.2;
      border-bottom: 1px dotted #999;
    }
    .page-break {
      page-break-before: always;
    }
    .answer-key-box {
      background-color: #f4f6f8;
      border: 1.5px solid #2b5797;
      padding: 12px;
      margin-top: 15px;
      border-radius: 4px;
    }
    .rubric-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }
    .rubric-table th, .rubric-table td {
      border: 1px solid #666;
      padding: 5px 8px;
      text-align: left;
      font-size: 11pt;
    }
    .rubric-table th {
      background-color: #e9ecef;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>

  <!-- STUDENT EXAM SECTION -->
  <table class="header-table">
    <tr>
      <td style="width: 55%;">
        <div class="bold">${h.republicTitle}</div>
        <div>${h.ministryTitle}</div>
        <div class="bold">${h.wilaya} — ${h.schoolName}</div>
      </td>
      <td style="width: 45%;" class="text-right">
        <div class="bold">Academic Year: ${h.academicYear}</div>
        <div class="bold">Level: ${exam.schoolYear}</div>
        <div>Duration: ${exam.durationMinutes} min  |  Total: ${exam.totalPoints} pts</div>
      </td>
    </tr>
  </table>

  <div class="exam-title-box">
    ${exam.title.toUpperCase()}
  </div>

  <div class="student-info-bar">
    ${h.studentNamePlaceholder || `Full Name: ................................................................   Class: ${exam.schoolYear} ...`}
  </div>

  ${exam.instructions ? `<div style="font-style: italic; margin-bottom: 8px; font-size: 11pt;">${exam.instructions}</div>` : ''}

  ${(exam.sections || []).map((sec, sIdx) => `
    <div class="section-title">${sec.title} (${sec.points} pts)</div>
    ${sec.passage ? `
      <div class="passage-box">
        ${sec.passageTitle ? `<div class="passage-title">${sec.passageTitle}</div>` : ''}
        <div>${sec.passage.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>')}</div>
        ${sec.passageSource ? `<div class="text-right" style="font-style: italic; font-size: 10pt; margin-top: 6px;">Source: ${sec.passageSource}</div>` : ''}
      </div>
    ` : ''}
    ${(sec.questions || []).map((q, qIdx) => `
      <div class="activity-title">${q.instruction || `Activity ${qIdx + 1}:`} (${q.points} pt${q.points > 1 ? 's' : ''})</div>
      <div class="question-content">${q.question.replace(/\n/g, '<br/>')}</div>
      ${q.options && q.options.length > 0 ? `<div style="margin-left: 12px; margin-bottom: 6px; font-style: italic;">Options: ${q.options.join('   |   ')}</div>` : ''}
    `).join('')}
  `).join('')}

  ${exam.writingTask ? `
    <div class="section-title">${exam.writingTask.title} (${exam.writingTask.points} pts)</div>
    <div class="writing-box">
      <div>${exam.writingTask.prompt}</div>
      ${exam.writingTask.cues && exam.writingTask.cues.length > 0 ? `
        <div style="font-weight: bold; margin-top: 6px; font-size: 11pt;">Helpful Cues & Guidelines:</div>
        <ul class="cues-list">
          ${exam.writingTask.cues.map(c => `<li>${c}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
    <div style="margin-top: 8px; font-weight: bold;">Your Production:</div>
    <div style="height: 160px; line-height: 26px; background-image: repeating-linear-gradient(transparent, transparent 25px, #bbb 26px); margin-top: 4px;"></div>
  ` : ''}

  <!-- TEACHER ANSWER KEY PAGE (If requested) -->
  ${mode === 'teacher' || mode === 'both' ? `
    <div class="page-break"></div>
    <div class="exam-title-box" style="background-color: #e3f2fd; border-color: #1565c0; color: #0d47a1;">
      TEACHER'S MARKING SCHEME & MODEL ANSWER KEY
    </div>
    <div style="margin-bottom: 12px; font-weight: bold;">
      ${exam.title} — Level: ${exam.schoolYear} (${exam.totalPoints} Points Total)
    </div>

    ${(exam.sections || []).map(sec => `
      <div style="font-weight: bold; font-size: 12pt; margin-top: 12px; color: #1565c0;">${sec.title}</div>
      <table class="rubric-table">
        <thead>
          <tr>
            <th style="width: 25%;">Activity / Item</th>
            <th style="width: 60%;">Expected Correct Answers</th>
            <th style="width: 15%;">Points</th>
          </tr>
        </thead>
        <tbody>
          ${(sec.questions || []).map((q, idx) => `
            <tr>
              <td class="bold">Activity ${idx + 1}</td>
              <td style="white-space: pre-line;">${q.answer || 'Detailed answer in sheet'}</td>
              <td class="bold">${q.points} pt(s)</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `).join('')}

    ${exam.writingTask && exam.writingTask.rubric ? `
      <div style="font-weight: bold; font-size: 12pt; margin-top: 14px; color: #1565c0;">${exam.writingTask.title} — Grading Rubric (${exam.writingTask.points} pts)</div>
      <table class="rubric-table">
        <thead>
          <tr>
            <th>Evaluation Criteria</th>
            <th>Descriptors / Indicators</th>
            <th>Max Points</th>
          </tr>
        </thead>
        <tbody>
          ${exam.writingTask.rubric.map(r => `
            <tr>
              <td class="bold">${r.criterion}</td>
              <td>${r.description || 'Full compliance with level requirements'}</td>
              <td class="bold">${r.points} pt(s)</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}
  ` : ''}

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
