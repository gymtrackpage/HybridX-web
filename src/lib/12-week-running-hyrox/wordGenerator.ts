import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  UnderlineType,
  Header,
  Footer,
  PageNumber,
  NumberFormat
} from "docx";
import FileSaver from "file-saver";
import { WeekPlan, DayPlan } from "./types";
import { introContent, chapterTwoContent } from "./data";

// Branding Colors (Safe for Print/PDF)
const BRAND_BLACK = "0f172a"; // Slate 900
const BRAND_YELLOW = "FACC15"; // HybridX Gold (Yellow-400)
const BRAND_GREY = "64748b"; // Slate 500
const BRAND_FONT = "Bahnschrift SemiBold";

export const generateDocument = async (weeks: WeekPlan[]) => {
  // --- Styles & Helpers ---

  const createBullet = (text: string) => {
    return new Paragraph({
      text: text,
      bullet: { level: 0 },
      spacing: { after: 120 },
    });
  };

  const createSectionHeader = (text: string) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: true,
          color: BRAND_GREY, 
          size: 20, // 10pt
          font: BRAND_FONT // Header look
        }),
      ],
      spacing: { before: 240, after: 120 },
    });
  };

  const createCoachHint = (text: string) => {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "COACH'S HINT",
                      bold: true,
                      color: BRAND_BLACK,
                      size: 20,
                      font: BRAND_FONT
                    }),
                  ],
                  spacing: { after: 120 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: text,
                      italics: true,
                      color: BRAND_BLACK,
                    }),
                  ],
                }),
              ],
              shading: {
                fill: "f1f5f9", // Slate 100
                type: ShadingType.CLEAR,
                color: "auto",
              },
              borders: {
                left: { style: BorderStyle.SINGLE, size: 24, color: BRAND_BLACK }, // Thick black border left
                top: { style: BorderStyle.NONE, size: 0, color: "auto" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
                right: { style: BorderStyle.NONE, size: 0, color: "auto" },
              },
              margins: {
                top: 200,
                bottom: 200,
                left: 200,
                right: 200,
              },
            }),
          ],
        }),
      ],
    });
  };

  // --- Content Generation ---

  const docChildren: any[] = [];

  // 1. Title Page
  docChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: "FASTER RUNNING", bold: true, size: 80, color: BRAND_BLACK, font: BRAND_FONT }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 3000, after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "FOR HYROX", bold: true, size: 80, color: BRAND_YELLOW, font: BRAND_FONT }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({ 
            text: "A Specialized Running Program to Boost VO2 Max, Threshold, and Race Day Speed for Hyrox",
            size: 28,
            color: BRAND_GREY
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 4000 },
    }),
    new Paragraph({
      text: `Generated on ${new Date().toLocaleDateString()}`,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ italics: true, size: 20, color: BRAND_GREY })]
    })
  );

  // 2. Introduction (Science of Hybrid Engine)
  docChildren.push(
    new Paragraph({
      text: "",
      pageBreakBefore: true,
    }),
    new Paragraph({
      text: introContent.title.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
    }),
    new Paragraph({
      text: introContent.subtitle,
      heading: HeadingLevel.HEADING_2,
      style: "Heading2",
      spacing: { after: 400 },
    })
  );

  introContent.sections.forEach(section => {
    docChildren.push(
       new Paragraph({
          text: section.title.toUpperCase(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
       })
    );
    section.content.forEach(para => {
       docChildren.push(new Paragraph({ text: para, spacing: { after: 200 } }));
    });

    if (section.subsections) {
      section.subsections.forEach(sub => {
         docChildren.push(
            new Paragraph({
               children: [new TextRun({ text: sub.title.toUpperCase(), bold: true, color: BRAND_BLACK, font: BRAND_FONT })],
               spacing: { before: 200, after: 100 }
            })
         );
         docChildren.push(new Paragraph({ 
            children: [new TextRun({ text: "Focus: ", bold: true }), new TextRun(sub.focus)] 
         }));
         docChildren.push(new Paragraph({ 
            children: [new TextRun({ text: "Mechanism: ", bold: true }), new TextRun(sub.mechanism)] 
         }));
         if (sub.whyItMatters) {
             docChildren.push(new Paragraph({ children: [new TextRun({ text: "Why It Matters:", bold: true })], spacing: { before: 100 } }));
             sub.whyItMatters.forEach(point => docChildren.push(createBullet(point)));
         }
      });
    }

    if (section.glossary) {
       section.glossary.forEach(term => {
          docChildren.push(
             new Paragraph({
                children: [new TextRun({ text: term.term.toUpperCase(), bold: true, color: BRAND_BLACK, font: BRAND_FONT })],
                spacing: { before: 200, after: 100 }
             })
          );
          docChildren.push(createBullet(`The Movement: ${term.movement}`));
          docChildren.push(createBullet(`The Science: ${term.science}`));
       });
    }
  });

  // 3. Chapter 2: The Test (New Section)
  const c2 = chapterTwoContent;
  docChildren.push(
    new Paragraph({ text: "", pageBreakBefore: true }),
    new Paragraph({ text: c2.title.toUpperCase(), heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: c2.subtitle, heading: HeadingLevel.HEADING_2, spacing: { after: 200 } })
  );
  
  c2.intro.forEach(p => docChildren.push(new Paragraph({ text: p, spacing: { after: 120 } })));

  // Part 1
  docChildren.push(new Paragraph({ text: c2.part1.title.toUpperCase(), heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }));
  docChildren.push(new Paragraph({ children: [new TextRun({ text: "Equipment Needed:", bold: true })] }));
  c2.part1.equipment.forEach(item => docChildren.push(createBullet(item)));
  
  docChildren.push(new Paragraph({ children: [new TextRun({ text: "The Mission:", bold: true })], spacing: { before: 120 } }));
  docChildren.push(new Paragraph({ text: c2.part1.mission, spacing: { after: 120 } }));

  c2.part1.steps.forEach(step => {
     docChildren.push(new Paragraph({ children: [new TextRun({ text: step.title, bold: true })], spacing: { before: 120 } }));
     step.items.forEach(item => docChildren.push(createBullet(item)));
  });

  docChildren.push(new Paragraph({ children: [new TextRun({text: "Note: ", bold: true}), new TextRun(c2.part1.note)], spacing: { before: 200 } }));

  // Part 2
  docChildren.push(new Paragraph({ text: c2.part2.title.toUpperCase(), heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }));
  c2.part2.content.forEach(p => docChildren.push(new Paragraph({ text: p, spacing: { after: 120 } })));

  // Part 3
  docChildren.push(new Paragraph({ text: c2.part3.title.toUpperCase(), heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }));
  docChildren.push(new Paragraph({ text: c2.part3.intro, spacing: { after: 120 } }));
  
  c2.part3.zones.forEach(zone => {
      docChildren.push(new Paragraph({ children: [new TextRun({ text: zone.name, bold: true, color: BRAND_BLACK })], spacing: { before: 120 } }));
      docChildren.push(createBullet(`Used for: ${zone.usage}`));
      docChildren.push(createBullet(`Feeling: ${zone.feeling}`));
      zone.calc.forEach(c => docChildren.push(createBullet(c)));
  });

  // Example
  docChildren.push(new Paragraph({ text: c2.example.title.toUpperCase(), heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }));
  c2.example.items.forEach(item => docChildren.push(createBullet(item)));

  // Final Note
  docChildren.push(new Paragraph({ text: c2.finalNote.title.toUpperCase(), heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }));
  c2.finalNote.content.forEach(p => docChildren.push(new Paragraph({ text: p, spacing: { after: 120 } })));


  // 4. Iterate Weeks
  weeks.forEach((week) => {
    // Page break for new week
    docChildren.push(
      new Paragraph({
        text: "",
        pageBreakBefore: true,
      })
    );

    // Week Header
    docChildren.push(
      new Paragraph({
        text: `WEEK ${week.weekNumber}: ${week.title.toUpperCase()}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 120 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "PHASE: ", bold: true }),
          new TextRun({ text: week.phase.toUpperCase() }),
        ],
        spacing: { after: 240 },
      })
    );

    // Week Context (if exists)
    if (week.context) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: week.context,
              italics: true,
            }),
          ],
          spacing: { after: 400 },
          indent: { left: 400 },
          border: {
             left: { style: BorderStyle.SINGLE, size: 24, color: BRAND_BLACK, space: 10 }
          }
        })
      );
    }

    // Days
    week.days.forEach((day) => {
      // Day Title
      docChildren.push(
        new Paragraph({
          text: `${day.day}: ${day.title}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      // Focus
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Focus: ", bold: true, color: BRAND_YELLOW }),
            new TextRun(day.focus),
          ],
          spacing: { after: 200 },
        })
      );

      // Activity (if rest day)
      if (day.activity && day.activity.length > 0) {
         docChildren.push(createSectionHeader("ACTIVITY"));
         day.activity.forEach(act => docChildren.push(createBullet(act)));
      }

      // Warmup
      if (day.warmup && day.warmup.length > 0) {
        docChildren.push(createSectionHeader("WARM UP"));
        day.warmup.forEach((item) => docChildren.push(createBullet(item)));
      }

      // Main Workout
      if (day.mainWorkout && day.mainWorkout.length > 0) {
        docChildren.push(createSectionHeader("MAIN WORKOUT"));
        day.mainWorkout.forEach((item) => docChildren.push(createBullet(item)));
      }

      // Cool Down
      if (day.coolDown && day.coolDown.length > 0) {
        docChildren.push(createSectionHeader("COOL DOWN"));
        day.coolDown.forEach((item) => docChildren.push(createBullet(item)));
      }

      // Coach's Hint
      if (day.coachHint) {
        docChildren.push(new Paragraph({ text: "", spacing: { before: 200, after: 0 } })); // Spacer
        docChildren.push(createCoachHint(day.coachHint));
      }
    });
  });

  // --- Document Assembly ---
  const doc = new Document({
    styles: {
      default: {
        heading1: {
          run: {
            size: 48, // 24pt
            bold: true,
            color: BRAND_BLACK,
            font: BRAND_FONT, // Brand Font
          },
          paragraph: {
            spacing: {
              after: 240,
            },
          },
        },
        heading2: {
          run: {
            size: 32, // 16pt
            bold: true,
            color: BRAND_BLACK,
            font: BRAND_FONT, // Brand Font
          },
          paragraph: {
            spacing: {
              before: 400,
              after: 200,
            },
            border: {
                bottom: { style: BorderStyle.SINGLE, size: 4, color: "e2e8f0" }
            }
          },
        },
        document: {
            run: {
                font: "Calibri",
                size: 24, // 12pt
            }
        }
      },
    },
    sections: [
      {
        properties: {},
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: "HYBRID", color: BRAND_BLACK, size: 16, bold: true, font: BRAND_FONT }),
                            new TextRun({ text: "X", color: BRAND_YELLOW, size: 16, bold: true, font: BRAND_FONT })
                        ],
                        alignment: AlignmentType.RIGHT
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                children: [PageNumber.CURRENT],
                            }),
                        ],
                    }),
                ],
            }),
        },
        children: docChildren,
      },
    ],
  });

  // --- Generation & Save ---
  const blob = await Packer.toBlob(doc);
  // Robustly handle file-saver import
  const saveAs = (FileSaver as any).saveAs || FileSaver;
  saveAs(blob, "Faster_Running_For_Hyrox_Guide.docx");
};