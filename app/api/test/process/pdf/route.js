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
  Tspan,
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

const styles = StyleSheet.create({
  page: {
    paddingVertical: 16,
    gap: 16,
    textAlign: "center",
  },
  header: {
    backgroundColor: "#eeeeee",
    fontSize: 36,
    fontFamily: "Noto Black",
    padding: 8,
  },
  body: {
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  footer: {
    backgroundColor: "#eeeeee",
    textAlign: "right",
    color: "#2196f3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontFamily: "Noto Bold",
    fontSize: 12,
    marginTop: "auto",
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
    textAlign: "center",
    transform: "rotate(-45deg)",
    color: "#eeeeee",
    fontFamily: "Noto Black",
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
          align: "end",
          anchor: "end",
          color: "black",
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
          backgroundColor: "#eeeeee",
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
            borderColor: "grey",
            tickColor: "grey",
          },
          border: {
            color: "black",
          },
          ticks: {
            color: "black",
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
            color: "black",
          },
          ticks: {
            color: "black",
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

const PDF = ({ test }) => (
  <Document>
    <CoverPage test={test} />
    <AllSectionReportPage sections={test.sections} />
    <PerSectionReportPage sections={test.sections} />
  </Document>
);

const CoverPage = ({ test }) => {
  const thisStyles = StyleSheet.create({
    header: {
      fontFamily: "Noto Black",
      color: "#2196f3",
    },
    heading: {
      fontSize: 36,
      fontFamily: "Noto Black",
      marginVertical: 8,
    },
    description: { fontSize: 18 },
  });

  return (
    <Page wrap={false} size={"A4"} style={styles.page}>
      {/* WATERMARK */}
      <View fixed style={styles.watermark}>
        <Text>PrepIt!</Text>
      </View>
      {/* HEADER */}
      <Text style={[styles.header, thisStyles.header]}>PREPIT!</Text>
      {/* BODY */}
      <View style={[thisStyles, styles.body]}>
        <Text style={thisStyles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <Text style={thisStyles.heading}>Mock Test Report</Text>
        <Text>{`${test.userName}\n${test.userEmail}`}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {/* CHART */}
          <View style={{ width: "50%" }}>
            <Image
              src={async () =>
                await generatePieChartWithoutLabel(
                  [
                    test.totalCorrect,
                    test.totalIncorrect,
                    test.totalNotAttempted,
                  ],
                  ["#2196f3", "#9e9e9e", "#212121"]
                )
              }
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View
            style={{
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* LABELS */}
            <Score text={`${test.totalScore}/${test.totalMarks}`} />
            <Labels
              items={[
                { color: "#2196f3", text: "Correct Attempted" },
                { color: "#9e9e9e", text: "Incorrect Attempted" },
                { color: "#212121", text: "Not Attempted" },
              ]}
            />
          </View>
        </View>
      </View>
      {/* FOOTER */}
      <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </Page>
  );
};

const AllSectionReportPage = ({ sections }) => {
  const thisStyles = StyleSheet.create({
    section: {
      heading: { fontSize: 24, fontFamily: "Noto Bold" },
      body: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
      },
    },
  });
  const data = [
    {
      colors: ["#aed581", "#7cb342", "#33691e"],
      items: [
        { color: "#aed581", text: "Attempted" },
        { color: "#7cb342", text: "" },
      ],
    },
    {
      colors: ["#ffb74d", "#fb8c00", "#e65100"],
      items: [
        { color: "#ffb74d", text: "Attempted" },
        { color: "#fb8c00", text: "Not Attempted" },
      ],
    },
    {
      colors: ["#ce93d8", "#9c27b0", "#4a148c"],
      items: [
        { color: "#ce93d8", text: "Attempted" },
        { color: "#9c27b0", text: "Not Attempted" },
      ],
    },
  ];
  return (
    <Page wrap={false} size="A4" style={styles.page}>
      <View fixed style={styles.watermark}>
        <Text>PrepIt!</Text>
      </View>
      <Text style={styles.header}>SECTION WISE REPORT</Text>
      <View style={styles.body}>
        {sections.map((section, i) => (
          <View key={section.sectionId} style={{ gap: 16 }}>
            <Text style={thisStyles.section.heading}>
              {section.sectionName}
            </Text>
            <View style={thisStyles.section.body}>
              <View>
                <Image
                  src={async () =>
                    await generatePieChartWithoutLabel(
                      [section.totalAttempted, section.totalNotAttempted],
                      data[i].colors
                    )
                  }
                  style={{ width: 150, height: 150 }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Score
                  text={`${section.totalAttempted}/${section.totalQuestions}`}
                />
                <Labels items={data[i].items} />
              </View>
            </View>
          </View>
        ))}
      </View>
      <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </Page>
  );
};

const PerSectionReportPage = ({ sections }) => {
  const thisStyles = {
    header: { fontSize: 24 },
  };
  const colors = [
    ["#aed581", "#7cb342", "#33691e"],
    ["#ffb74d", "#fb8c00", "#e65100"],
    ["#ce93d8", "#9c27b0", "#4a148c"],
  ];
  return sections.map((section, i) => (
    <>
      <Page
        key={section.sectionName + "Summary"}
        wrap={false}
        size="A4"
        style={styles.page}
      >
        <View fixed style={styles.watermark}>
          <Text>PrepIt!</Text>
        </View>
        <Text style={[styles.header, thisStyles.header]}>
          {section.sectionName}
        </Text>
        <View style={styles.body}>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}
          >
            <View>
              <Image
                src={async () =>
                  await generatePieChartWithoutLabel(
                    [
                      section.totalCorrect,
                      section.totalIncorrect,
                      section.totalNotAttempted,
                    ],
                    colors[i]
                  )
                }
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={{ justifyContent: "center", alignContent: "center" }}>
              <Score
                text={`${section.totalCorrect}/${section.totalQuestions}`}
              />
              <Labels
                items={[
                  { color: colors[i][0], text: "Correct" },
                  { color: colors[i][1], text: "Incorrect" },
                  { color: colors[i][2], text: "Not Attempted" },
                ]}
              />
            </View>
          </View>
          <View>
            <Image
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
        <Text
          fixed
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
      <QuestionsPage key={section.sectionName} section={section} />
    </>
  ));
};

const QuestionsPage = ({ section }, i) => {
  const options = ["A", "B", "C", "D"];
  const thisStyles = {
    header: { fontSize: 24 },
  };
  return (
    <Page
      key={section.sectionName + "Questions"}
      break={false}
      size="A4"
      style={styles.page}
    >
      <View fixed style={styles.watermark}>
        <Text>PrepIt</Text>
      </View>
      <Text fixed style={[styles.header, thisStyles.header]}>
        {section.sectionName}
      </Text>
      <View style={[styles.body, { justifyContent: "space-around" }]}>
        {section.questions.map((question, i) => (
          <View
            key={question.question + i}
            wrap={false}
            style={{ flexDirection: "row", gap: 16, fontSize: 14 }}
          >
            <Text style={{ fontFamily: "Noto Bold" }}>Q{i + 1}</Text>
            <View
              style={{
                gap: 16,
                textAlign: "left",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Text style={{ flexDirection: "row", fontFamily: "Noto Bold" }}>
                {question.question}
                <Tspan style={{ fontSize: 12 }}>
                  {question.chosenOption == -1 && " (Not Attempted)"}
                </Tspan>
              </Text>
              <View style={{ gap: 4 }}>
                {question.options.map((option, i) => (
                  <View
                    key={option}
                    style={[
                      {
                        flexDirection: "row",
                        backgroundColor: "#f5f5f5",
                        borderRadius: 4,
                        padding: 8,
                        gap: 8,
                        fontSize: 14,
                      },
                      i + 1 == question.chosenOption &&
                        question.chosenOption != question.correctOption && {
                          backgroundColor: "#ef9a9a",
                        },
                      i + 1 == question.correctOption && {
                        backgroundColor: "#c5e1a5",
                      },
                    ]}
                  >
                    <Text>{options[i]}</Text>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={{ fontFamily: "Noto Bold" }}>Explanation</Text>
                <Text>{question.explanation}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </Page>
  );
};

const Score = ({ text }) => (
  <Text style={{ fontSize: 56, fontFamily: "Noto Bold" }}>{text}</Text>
);

const Labels = ({ items }) => {
  const thisStyles = {
    labels: {
      gap: 16,
      item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        icon: { width: 48, height: 24 },
        text: { fontSize: 18 },
      },
    },
  };

  return (
    <View style={thisStyles.labels}>
      {items.map(({ color, text }) => (
        <View key={color} style={thisStyles.labels.item}>
          <View
            style={[thisStyles.labels.item.icon, { backgroundColor: color }]}
          />
          <Text style={thisStyles.labels.item.text}>{text}</Text>
        </View>
      ))}
    </View>
  );
};

export async function POST(request) {
  try {
    log("##### PDF Generation request received #####");

    const test = await request.json();

    // await renderToFile(<PDF test={test} />, "./public/private/result.pdf");

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
    log(error.message);
    log("##### PDF generation failed #####");
    return Response.json(
      { success: false, message: "PDF Generation Failed" },
      { status: 500 }
    );
  }
}
