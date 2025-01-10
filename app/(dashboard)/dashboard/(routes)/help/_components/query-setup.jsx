import { useState } from 'react';

import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

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
  Textarea,
} from '@/components/material-tailwind/components';
import useQueries from '@/hooks/useQueries';
import { getCookie } from '@/utils/misc';

const QUERY_CATEGORIES = [
  'Account Related',
  'Test Related',
  'Subscription Related',
  'General Complaint/Feedback',
  'Others',
];

const QuerySetup = () => {
  const { creating, createQuery, readQueries } = useQueries();

  const [modal, setModal] = useState(false);
  const handleDialog = () => {
    setSent(false);
    setModal(!modal);
  };

  const [sent, setSent] = useState(false);

  const [selectedCategory, setCategory] = useState(null);
  const [query, setQuery] = useState(null);

  const onSubmit = async () => {
    const user = await getCookie('[PI USER]');
    await createQuery(user.fullName, user.email, selectedCategory, query);
    setSent(true);
    await readQueries(user.email);
    handleDialog();
  };

  return (
    <>
      {/* Button to open the test setup modal */}
      <Button size="md" onClick={handleDialog}>
        Raise Issue
      </Button>

      {/* Modal for test setup */}
      <Dialog size="xs" open={modal}>
        {/* Modal header */}
        <DialogHeader className="flex items-center justify-between">
          <div>Create Ticket</div>
          {/* Close button for the modal */}
          <IconButton size="sm" variant="text" className="rounded-full" onClick={handleDialog} disabled={creating}>
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>

        {/* Modal body */}
        <DialogBody className="space-y-4">
          {/* Select test type */}
          <Select onChange={(value) => setCategory(value)} label="Select Category">
            {QUERY_CATEGORIES.map((v, i) => (
              <Option className="my-1" key={i} value={v}>
                {v}
              </Option>
            ))}
          </Select>
          <Textarea label="Query" color="blue" onChange={(e) => setQuery(e.target.value)} />
        </DialogBody>
        {/* Modal footer */}
        <DialogFooter>
          {/* Submit button */}
          <Button disabled={creating || sent || !selectedCategory || !query} size="md" fullWidth onClick={onSubmit}>
            <div className="flex justify-center items-center gap-2">
              {creating ? (
                <Spinner className="h-4 w-4" />
              ) : sent ? (
                <>
                  <CheckCircleIcon className="h-4 w-4" />
                  Recieved
                </>
              ) : (
                'Submit'
              )}
            </div>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default QuerySetup;
