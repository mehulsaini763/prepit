import { useEffect } from "react";

import {
  ArrowDownTrayIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Spinner,
  Typography,
  Tooltip,
} from "@/components/material-tailwind/components";

import moment from "moment";

import useTests from "@/hooks/useTests";
import { useMediaQuery } from "react-responsive";

const TABLE_HEAD = [
  "Test Id",
  "Type",
  "Section",
  "Topics",
  "Score",
  "Date",
  "",
];

const SECTION_TYPES = [
  { type: "qa", label: "Quantitative Aptitude" },
  { type: "dilr", label: "Data Interpretation & Logical Reasoning" },
  { type: "varc", label: "Verbal Ability & Reading Comprehension" },
];

const TestsTable = ({ user }) => {
  const { tests, reading, readTests, downloadTest } = useTests();
  const matchMedia = useMediaQuery({ query: "(max-width:920px)" });

  useEffect(() => {
    readTests(user.id);
  }, []);

  return (
    <Card
      className="h-full w-full border p-0 rounded-md overflow-hidden"
      variant="filled"
    >
      <CardHeader
        className="flex items-center justify-between m-4 rounded-none"
        floated={false}
        shadow={false}
      >
        <Typography
          color="black"
          className="flex items-center gap-2"
          variant="h5"
        >
          <ClipboardDocumentListIcon className="w-6 h-6" />
          Tests
        </Typography>
      </CardHeader>
      <CardBody className="p-0 h-full overflow-auto border-t">
        {reading ? (
          <div className="h-full flex flex-col justify-center items-center">
            <Spinner className="w-8 h-8" color="blue" />
          </div>
        ) : tests.length == 0 ? (
          <div
            colSpan={5}
            className="h-full flex flex-col justify-center items-center"
          >
            No Tests Available
          </div>
        ) : (
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`font-semibold leading-none ${
                        head == "Date" ? "text-right" : "text-left"
                      }`}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((test, i) => {
                const classes = "text-left p-4 border-b border-blue-gray-50";
                return (
                  <tr key={i}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {test.testId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {test.testType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal max-w-48"
                      >
                        {test?.sections?.length == 1
                          ? matchMedia
                            ? SECTION_TYPES.find(
                                (v) => v.label == test.sections[0].sectionName
                              ).type.toUpperCase()
                            : test.sections[0].sectionName
                          : "Various"}
                      </Typography>
                    </td>
                    <td className={[classes]}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal max-w-48"
                      >
                        {Array.isArray(test.sections) ? (
                          test.testType == "topic" ? (
                            test.sections[0].topics
                          ) : test.testType == "section" ? (
                            test.sections[0].topics.length < 3 ? (
                              test.sections[0].topics
                            ) : (
                              <div className="flex gap-2">
                                <div className="flex flex-col">
                                  <p> {test?.sections[0].topics[0]}</p>
                                  <p> {test?.sections[0].topics[1]}</p>
                                </div>
                                <Tooltip
                                  content={test?.sections[0].topics.map(
                                    (topic, i, arr) =>
                                      i < arr.length - 1 ? topic + ", " : topic
                                  )}
                                >
                                  <InformationCircleIcon className="w-5 h-5 shrink-0" />
                                </Tooltip>
                              </div>
                            )
                          ) : (
                            "Various"
                          )
                        ) : (
                          "-"
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {test.totalScore} / {test.totalMarks}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-right"
                      >
                        {matchMedia
                          ? moment
                              .unix(test.createdAt.seconds)
                              .format("DD/MM/YY")
                          : moment
                              .unix(test.createdAt.seconds)
                              .format("DD/MM/YY hh:mm A")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {test.isProcessed &&
                        (test.testType == "mockMini" ||
                          test.testType == "mockFull") && (
                          <IconButton
                            size="sm"
                            color="blue"
                            variant="text"
                            onClick={() =>
                              downloadTest(test.userId, test.testId)
                            }
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </IconButton>
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
};

export default TestsTable;
