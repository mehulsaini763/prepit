import { useState } from "react";

import { useRouter } from "next/navigation";

import { XMarkIcon } from "@heroicons/react/24/solid";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Option,
  Select,
  Spinner,
} from "@/components/material-tailwind/components";

import {
  topics,
  types,
  sections,
} from "@/app/(dashboard)/dashboard/(routes)/tests/_components/data";
import { setCookie } from "@/utils/misc";

const TestSetup = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedType, setType] = useState(null);
  const [selectedSection, setSection] = useState(null);
  const [selectedTopic, setTopic] = useState(null);
  const [modal, setModal] = useState(false);
  const handleDialog = () => {
    setType(null);
    setSection(null);
    setTopic(null);
    setModal(!modal);
  };

  const onSubmit = async () => {
    setLoading(true);
    await setCookie("token", {
      userEmail: user.email,
      userId: user.id,
      userName: user.fullName,
      sectionId: selectedSection,
      testType: selectedType,
      topic: selectedTopic,
      expiresIn: "30s",
    });
    router.push(`/test/generating`);
  };

  return (
    <>
      <Button size="md" onClick={handleDialog}>
        Take Test
      </Button>

      <Dialog size="xs" open={modal}>
        <DialogHeader className="flex items-center justify-between">
          <div>Test Setup</div>
          <IconButton
            size="sm"
            variant="text"
            className="rounded-full"
            onClick={handleDialog}
            disabled={loading}
          >
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <Select
            disabled={loading}
            onChange={(value) => setType(value)}
            label="Select Test Type"
          >
            {types.map((v, i) => (
              <Option className="my-1" key={i} value={v.value}>
                {v.label}
              </Option>
            ))}
          </Select>

          <Select
            disabled={
              loading || !selectedType
                ? true
                : selectedType == types[2].value ||
                  selectedType == types[3].value
            }
            label="Select Section"
            onChange={(value) => setSection(value)}
          >
            {sections.map((v, i) => (
              <Option className="my-1" key={i} value={v.value}>
                {v.label}
              </Option>
            ))}
          </Select>
          <Select
            disabled={
              loading || selectedType != types[0].value || !selectedSection
            }
            label="Select Topic"
            onChange={(value) => setTopic(value)}
            menuProps={{ className: "max-h-48" }}
          >
            {!selectedSection ? (
              <Option className="my-1" value="none">
                None
              </Option>
            ) : (
              topics[selectedSection].map((v, i) => (
                <Option className="my-1" key={i} value={v}>
                  {v}
                </Option>
              ))
            )}
          </Select>
        </DialogBody>

        <DialogFooter>
          <Button
            disabled={
              loading
                ? true
                : !selectedType
                ? true
                : selectedType == types[0].value
                ? !selectedSection || !selectedTopic
                : selectedType == types[1].value && !selectedSection
            }
            size="md"
            fullWidth
            onClick={onSubmit}
          >
            <div className="flex justify-center">
              {loading ? <Spinner className="h-4 w-4" /> : "Submit"}
            </div>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TestSetup;
