export const dynamic = "force-dynamic";

import { log } from "console";

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebase";

import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  renderToBuffer,
  renderToFile,
} from "@react-pdf/renderer";

import { createCanvas, registerFont } from "canvas";
import {
  Chart,
  ArcElement,
  PieController,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import path from "path";

Font.register({
  family: "Noto Regular",
  src: "https://firebasestorage.googleapis.com/v0/b/letsnailit-pythonevaltest.appspot.com/o/fonts%2FNotoSans-Regular.ttf?alt=media&token=de93e80c-9e54-4a91-b7fd-8c97ce998734",
});
Font.register({
  family: "Noto Bold",
  src: "https://firebasestorage.googleapis.com/v0/b/letsnailit-pythonevaltest.appspot.com/o/fonts%2FNotoSans-Bold.ttf?alt=media&token=2b855eea-e1a0-4bf7-85d5-9a7405ebc2f9",
});
Font.register({
  family: "Noto Black",
  src: "https://firebasestorage.googleapis.com/v0/b/letsnailit-pythonevaltest.appspot.com/o/fonts%2FNotoSans-Black.ttf?alt=media&token=9fcdd557-be8a-458c-a8aa-79898e65a76d",
});
Font.register({
  family: "SourceCodePro Regular",
  src: "https://firebasestorage.googleapis.com/v0/b/letsnailit-pythonevaltest.appspot.com/o/fonts%2FSourceCodePro-Regular.ttf?alt=media&token=f55315db-465c-40df-9fca-59b729dab4d7",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#1e88e5",
    fontFamily: "Noto Regular",
  },
  header: {
    textAlign: "center",
    marginVertical: 16,
    paddingVertical: 4,
    backgroundColor: "white",
  },
  headerText: {
    color: "#1e88e5",
    fontSize: 56,
    fontFamily: "Noto Bold",
    letterSpacing: 4,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
    marginVertical: 16,
    marginHorizontal: 40,
  },
  page1: {
    section1: {
      color: "white",
      fontSize: 20,
      fontFamily: "Noto Regular",
      marginVertical: 8,
      lineHeight: 1.5,
      textAlign: "center",
    },
    section2: {
      heading: {
        fontSize: 36,
        fontFamily: "Noto Bold",
      },
      content: {
        fontSize: 24,
        fontFamily: "Noto Regular",
        lineHeight: 1.5,
      },
      paddingHorizontal: 16,
    },
    section3: {
      fontSize: 12,
      fontFamily: "Noto Regular",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      gap: 32,
      paddingVertical: 32,
    },
  },
  page2: {
    body: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginVertical: 16,
      marginHorizontal: 40,
      gap: 32,
    },
    headerText: {
      color: "#1e88e5",
      fontSize: 46,
      fontFamily: "Noto Bold",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    subSection: {
      display: "flex",
      flexDirection: "row",
      gap: 32,
      alignItems: "center",
    },
    subSubSection: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    heading: {
      backgroundColor: "black",
      borderRadius: 4,
      color: "white",
      fontSize: 20,
      fontFamily: "Noto Bold",
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    score: {
      color: "white",
      fontSize: 56,
      fontFamily: "Noto Bold",
    },
    chart_image: {
      width: 200,
      height: 200,
    },
  },
  sectionPage: {
    header: {
      marginVertical: 16,
      paddingVertical: 4,
      paddingHorizontal: 32,
      backgroundColor: "black",
    },
    headerText: {
      color: "white",
      fontSize: 24,
      fontFamily: "Noto Bold",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      marginVertical: 16,
      marginHorizontal: 40,
    },
    section1: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 32,
    },
    subSection1: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 32,
    },
    subSection2: {
      backgroundColor: "#aed581",
      fontSize: 12,
      padding: 8,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    chart_image: {
      width: 150,
      height: 150,
    },
    label_icon: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      border: 1,
      borderColor: "black",
      borderStyle: "solid",
    },
    label_text: {
      color: "white",
      fontFamily: "Noto Bold",
      fontSize: 12,
    },
  },
  chart_section: {},
  chart_image: {
    height: 250,
  },
  label_section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  },
  label_item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  label_icon: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    border: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  label_text: {
    color: "white",
    fontFamily: "Noto Bold",
    fontSize: 16,
  },
  questionPageHeader: {
    marginVertical: 16,
    paddingVertical: 4,
    paddingHorizontal: 32,
    backgroundColor: "black",
  },

  questionPageHeaderText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Noto Bold",
  },

  questionPageBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
    marginVertical: 16,
    marginHorizontal: 40,
  },
  questionSection: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingBottom: 16,
  },
  questionNumberContainer: {
    backgroundColor: "#aed581",
    fontFamily: "Noto Regular",
    fontSize: 12,
    padding: 4,
    borderRadius: 4,
  },
  questionDetailsContainer: {
    gap: 16,
    fontFamily: "Noto Bold",
    width: "100%",
    color: "white",
  },
  question: { fontSize: 12 },
  explanationHeading: { fontSize: 12 },
  explanation: { fontSize: 12 },
  optionConatiner: {
    gap: 4,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "black",
    fontFamily: "Noto Regular",
    borderRadius: 4,
    padding: 4,
    gap: 8,
    backgroundColor: "#eeeeee",
    width: "70%",
  },
  optionText: { fontSize: 12 },
  optionIconLeft: {
    backgroundColor: "white",
    borderRadius: 100,
    paddingHorizontal: 4,
    fontSize: 12,
  },
  optionIconRight: {},

  footer: {
    backgroundColor: "white",
    color: "#1e88e5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: "auto",
    fontFamily: "Noto Bold",
    fontSize: 12,
  },
  watermark: {
    position: "absolute",
    zIndex: 10,
    fontSize: 128,
    fontWeight: "extrabold",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: "rotate(-45deg)",
    color: "rgba(255,255,255,0.25)",
    fontFamily: "Noto Black",
    textAlign: "center",
  },
});

registerFont(path.join(process.cwd(), "public", "fonts", "NotoSans-Bold.ttf"), {
  family: "Noto Sans Bold  ",
});
Chart.register(
  ArcElement,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  PieController,
  ChartDataLabels
);

const generatePieChartWithoutLabel = async (data, colors) => {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Correct Attempted", "Incorrect Attempted", "Not Attempted"],
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: "#000000",
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      animation: false,
      plugins: {
        legend: false,
        datalabels: {
          display: false,
        },
      },
    },
  });

  return chart.toBase64Image();
};

const generatePieChartWithLabel = async (topics, questions) => {
  // Function to calculate percentages of correct answers per topic
  function calculatePercentages(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0); // Total number of correct answers

    // Check if the total is zero to avoid division by zero
    if (total === 0) {
      return arr.map(() => 0); // Return an array of zeros if no correct answers
    }

    // Calculate the percentage of correct answers per topic
    return arr.map((value) => (value / total) * 100);
  }

  const labels = topics;

  // Count the number of correct answers for each topic
  const unformattedData = topics.map(
    (topic) => questions.filter((question) => question.topic === topic).length
  );

  // Calculate percentages
  const data = calculatePercentages(unformattedData);

  const canvas = createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#64b5f6",
            "#1e88e5",
            "#0d47a1",
            "#e0e0e0",
            "#9e9e9e",
            "#212121",
          ],
          borderColor: "#000000",
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      animation: false,
      layout: {
        padding: 250,
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          formatter: (value, context) => {
            return `${
              context.chart.data.labels[context.dataIndex]
            }\n ${value}%`;
          },
          color: "white",
          align: "end",
          anchor: "end",
          font: {
            size: 24,
            weight: "bold",
            family: "Noto Sans",
          },
          textAlign: "center",
        },
      },
    },
  });

  return chart.toBase64Image();
};

const generateBarChart = async (topics, questions) => {
  const labels = topics;

  const correct = topics.map(
    (topic, i) =>
      questions.filter(
        (question) =>
          question.topic == topic &&
          question.chosenOption != -1 &&
          question.correctOption == question.chosenOption
      ).length * 2
  );

  const incorrect = topics.map(
    (topic, i) =>
      questions.filter(
        (question) =>
          question.topic == topic &&
          question.chosenOption != -1 &&
          question.correctOption != question.chosenOption
      ).length * 2
  );

  const notAttempted = topics.map(
    (topic, i) =>
      questions.filter(
        (question) => question.topic == topic && question.chosenOption == -1
      ).length * 2
  );

  const canvas = createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: correct,
          backgroundColor: "#4caf50",
          barThickness: 30,
        },
        {
          data: incorrect,
          backgroundColor: "#ef5350",
          barThickness: 30,
        },
        {
          data: notAttempted,
          backgroundColor: "#fafafa",
          barThickness: 30,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      scales: {
        x: {
          grid: {
            color: "white",
            borderColor: "grey",
            tickColor: "grey",
          },
          border: {
            color: "white",
          },
          ticks: {
            color: "white",
            font: {
              family: "Noto Sans",
              weight: "bold",
              size: 24,
            },
          },
          stacked: true,
        },
        y: {
          labels: labels,
          stacked: true,
          border: {
            color: "white",
          },
          ticks: {
            color: "white",
            font: {
              family: "Noto Sans",
              weight: "bold",
              size: 24,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },

        datalabels: {
          display: false,
        },
      },
    },
  });

  return chart.toBase64Image();
};

const PDF = ({ test }) => {
  const colors = [
    {
      id: "qa",
      colors: ["#aed581", "#7cb342", "#33691e"],
    },
    {
      id: "varc",
      colors: ["#ffb74d", "#fb8c00", "#e65100"],
    },
    {
      id: "dilr",
      colors: ["#ce93d8", "#9c27b0", "#4a148c"],
    },
  ];
  const options = ["A", "B", "C", "D"];
  return (
    <Document>
      {/* PAGE1 */}
      <Page wrap={false} size="A4" style={styles.page}>
        <View fixed style={styles.watermark}>
          <Text>Basic Funda</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>BASIC FUNDA</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.page1.section1}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>
          <View style={styles.page1.section2}>
            <Text style={styles.page1.section2.heading}>
              Mock Test Mini Report
            </Text>
            <Text
              style={styles.page1.section2.content}
            >{`Name: ${test.userName}\nE-mail: ${test.userEmail}\nScore: ${test.totalScore}/${test.totalMarks}`}</Text>
          </View>
          <View style={styles.page1.section3}>
            <View style={styles.page1.section3.chart_section}>
              <Image
                src={async () =>
                  await generatePieChartWithoutLabel(
                    [
                      test.totalCorrect,
                      test.totalIncorrect,
                      test.totalNotAttempted,
                    ],
                    ["#fafafa", "#9e9e9e", "#212121"]
                  )
                }
                style={styles.page1.section3.chart_image}
              />
            </View>
            <View style={styles.label_section}>
              <View style={styles.label_item}>
                <View
                  style={[styles.label_icon, { backgroundColor: "#fafafa" }]}
                />
                <Text style={styles.label_text}>Correct Attempted</Text>
              </View>
              <View style={styles.label_item}>
                <View
                  style={[styles.label_icon, { backgroundColor: "#9e9e9e" }]}
                />
                <Text style={styles.label_text}>Incorrect Attempted</Text>
              </View>
              <View style={styles.label_item}>
                <View
                  style={[styles.label_icon, { backgroundColor: "#212121" }]}
                />
                <Text style={styles.label_text}>Not Attempted</Text>
              </View>
            </View>
          </View>
        </View>
        <View fixed style={styles.footer}>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
      {/* PAGE2 */}
      <Page wrap={false} size="A4" style={styles.page}>
        <View fixed style={styles.watermark}>
          <Text>Basic Funda</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.page2.headerText}>SECTION WISE REPORT</Text>
        </View>
        <View style={styles.page2.body}>
          {test.sections.map((section) => {
            const colorOptions = colors.find(
              (obj) => obj.id == section.sectionId
            ).colors;
            return (
              <View key={section.sectionName} style={styles.page2.section}>
                <Text style={styles.page2.heading}>{section.sectionName}</Text>
                <View style={styles.page2.subSection}>
                  <View style={styles.page2.chartSection}>
                    <Image
                      style={styles.page2.chart_image}
                      src={async () =>
                        await generatePieChartWithoutLabel(
                          [section.totalAttempted, section.totalNotAttempted],
                          colorOptions
                        )
                      }
                    />
                  </View>
                  <View style={styles.page2.subSubSection}>
                    <Text style={styles.page2.score}>
                      {section.totalAttempted}/{section.totalQuestions}
                    </Text>
                    <View style={styles.label_section}>
                      <View style={styles.label_item}>
                        <View
                          style={[
                            styles.label_icon,
                            { backgroundColor: colorOptions[0] },
                          ]}
                        />
                        <Text style={styles.label_text}>Attempted</Text>
                      </View>
                      <View style={styles.label_item}>
                        <View
                          style={[
                            styles.label_icon,
                            { backgroundColor: colorOptions[1] },
                          ]}
                        />
                        <Text style={styles.label_text}>Not Attempted</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View fixed style={styles.footer}>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
      {/* DYNAMIC PAGES */}
      {test.sections.map((section) => {
        const colorOptions = colors.find(
          (obj) => obj.id == section.sectionId
        ).colors;
        return (
          <>
            <Page
              key={section.sectionName + "Summary"}
              wrap={false}
              size="A4"
              style={styles.page}
            >
              <View fixed style={styles.watermark}>
                <Text>Basic Funda</Text>
              </View>
              <View style={styles.sectionPage.header}>
                <Text style={styles.sectionPage.headerText}>
                  {section.sectionName}
                </Text>
              </View>
              <View style={styles.sectionPage.body}>
                <View style={styles.sectionPage.section1}>
                  <View style={styles.sectionPage.subSection1}>
                    <View>
                      <Image
                        style={styles.sectionPage.chart_image}
                        src={async () =>
                          await generatePieChartWithoutLabel(
                            [
                              section.totalCorrect,
                              section.totalIncorrect,
                              section.totalNotAttempted,
                            ],
                            colorOptions
                          )
                        }
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: "Noto Bold",
                          color: "white",
                        }}
                      >{`${section.totalCorrect}/${section.totalQuestions}`}</Text>
                      <View style={styles.label_section}>
                        <View style={styles.label_item}>
                          <View
                            style={[
                              styles.sectionPage.label_icon,
                              { backgroundColor: colorOptions[0] },
                            ]}
                          />
                          <Text style={styles.sectionPage.label_text}>
                            Correct
                          </Text>
                        </View>
                        <View style={styles.label_item}>
                          <View
                            style={[
                              styles.sectionPage.label_icon,
                              { backgroundColor: colorOptions[1] },
                            ]}
                          />
                          <Text style={styles.sectionPage.label_text}>
                            Wrong
                          </Text>
                        </View>
                        <View style={styles.label_item}>
                          <View
                            style={[
                              styles.sectionPage.label_icon,
                              { backgroundColor: colorOptions[2] },
                            ]}
                          />
                          <Text style={styles.sectionPage.label_text}>
                            Not Attempted
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.sectionPage.subSection2}>
                    <Text>Total Questions : {section.totalQuestions}</Text>
                    <Text>Attempted : {section.totalAttempted}</Text>
                    <Text>Correct Answer : {section.totalCorrect}</Text>
                    <Text>Wrong Answer : {section.totalIncorrect}</Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={{ width: 500, height: 500 }}
                    src={async () =>
                      await generatePieChartWithLabel(
                        section.topics,
                        section.questions
                      )
                    }
                  />
                </View>
                <View>
                  <Image
                    style={styles.chart_image}
                    src={async () =>
                      await generateBarChart(section.topics, section.questions)
                    }
                  />
                </View>
              </View>
              <View fixed style={styles.footer}>
                <Text
                  render={({ pageNumber, totalPages }) =>
                    `Page ${pageNumber} of ${totalPages}`
                  }
                />
              </View>
            </Page>
            <Page
              key={section.sectionName + "Questions"}
              break={false}
              size="A4"
              style={styles.page}
            >
              <View fixed style={styles.watermark}>
                <Text>Basic Funda</Text>
              </View>
              <View fixed style={styles.questionPageHeader}>
                <Text style={styles.questionPageHeaderText}>
                  {section.sectionName}
                </Text>
              </View>
              <View style={styles.questionPageBody}>
                {section.questions.map((question, i) => (
                  <View
                    key={question.question}
                    wrap={false}
                    style={styles.questionSection}
                  >
                    <View>
                      <Text style={styles.questionNumberContainer}>
                        Q{i + 1}
                      </Text>
                    </View>
                    <View style={styles.questionDetailsContainer}>
                      <Text>
                        {question.question}
                        <Text style={styles.question}>
                          {question.chosenOption == -1 && " (Not Attempted)"}
                        </Text>
                      </Text>
                      <View style={styles.optionConatiner}>
                        {question.options.map((option, i) => (
                          <View
                            key={option}
                            style={[
                              styles.option,
                              i + 1 == question.chosenOption &&
                                question.chosenOption !=
                                  question.correctOption && {
                                  backgroundColor: "#e57373",
                                },
                              i + 1 == question.correctOption && {
                                backgroundColor: "#aed581",
                              },
                            ]}
                          >
                            <View
                              style={[
                                styles.optionIconLeft,
                                i + 1 == question.chosenOption &&
                                  question.chosenOption !=
                                    question.correctOption && {
                                    backgroundColor: "#f44336",
                                  },
                                i + 1 == question.correctOption && {
                                  backgroundColor: "#8bc34a",
                                },
                              ]}
                            >
                              <Text>{options[i]}</Text>
                            </View>
                            <Text style={styles.optionText}>{option}</Text>
                          </View>
                        ))}
                      </View>
                      <View>
                        <Text>Explanation</Text>
                        <Text>{question.explanation}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View fixed style={styles.footer}>
                <Text
                  render={({ pageNumber, totalPages }) =>
                    `Page ${pageNumber} of ${totalPages}`
                  }
                />
              </View>
            </Page>
          </>
        );
      })}
    </Document>
  );
};

export async function POST(request) {
  try {
    log("##### PDF Generation request received #####");

    const test = await request.json();

    const buffer = await renderToBuffer(<PDF test={test} />);
    const storageRef = ref(
      storage,
      `users/${test.userId}/tests/${test.testId}`
    );
    await uploadBytes(storageRef, buffer, { contentType: "application/pdf" });

    log("##### PDF Generated #####");

    return Response.json(
      { success: true, message: "PDF Generated", data: buffer },
      { status: 200 }
    );
  } catch (error) {
    log(error);
    log("##### PDF generation failed #####");
    return Response.json(
      { success: false, message: "PDF Generation Failed" },
      { status: 500 }
    );
  }
}
