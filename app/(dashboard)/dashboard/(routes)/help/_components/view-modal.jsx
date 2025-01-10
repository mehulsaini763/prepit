import { useState } from 'react';

import { EyeIcon, XMarkIcon } from '@heroicons/react/24/solid';

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Textarea,
  Typography,
} from '@/components/material-tailwind/components';
import { getCookie } from '@/utils/misc';

const ViewModal = ({ readQueries, updateQuery, query }) => {
  const [message, setMessage] = useState(false);

  const [modal, setModal] = useState(false);
  const handleDialog = () => setModal(!modal);

  const onSubmit = async () => {
    const user = await getCookie('[PI USER]');
    await updateQuery(query.id, {
      reOpenRequest: message,
      status: 'reOpened',
    });
    handleDialog();
    await readQueries(user.email);
  };

  return (
    <>
      <IconButton size="sm" color="blue" variant="text" onClick={handleDialog}>
        <EyeIcon className="h-5 w-5" />
      </IconButton>

      <Dialog size="sm" open={modal}>
        <DialogHeader className="flex items-center justify-between">
          <div>Details</div>
          <IconButton size="sm" variant="text" className="rounded-full" onClick={handleDialog}>
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody>
          <div className="h-80 overflow-hidden">
            <div className="flex flex-col h-full gap-2 p-2 overflow-scroll">
              {query.openRequest != '' && (
                <div className="grid w-full">
                  <Typography variant="h6">Open Query</Typography>
                  <Textarea disabled value={query.openRequest} id="openRequest" color="blue" />
                </div>
              )}
              {query.resolvedResponse != '' && (
                <div className="grid w-full text-right">
                  <Typography variant="h6">Resolved Response</Typography>
                  <Textarea disabled value={query.resolvedResponse} id="resolvedResponse" color="blue" />
                </div>
              )}
              {query.reOpenRequest != '' && (
                <div className="grid w-full">
                  <Typography variant="h6">Re-Open Query</Typography>
                  <Textarea disabled value={query.reOpenRequest} id="reOpenRequest" color="blue" />
                </div>
              )}
              {query.closedResponse != '' && (
                <div className="grid w-full text-right">
                  <Typography variant="h6">Closed Response</Typography>
                  <Textarea disabled value={query.closedResponse} id="closedResponse" color="blue" />
                </div>
              )}
              {query.status == 'resolved' && (
                <div className="grid w-full pt-2">
                  <Textarea label="Reopen Request" onChange={(e) => setMessage(e.target.value)} color="blue" />
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          {query.status == 'resolved' && (
            <Button size="md" disabled={!message} fullWidth onClick={onSubmit}>
              Reopen Issue
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ViewModal;
