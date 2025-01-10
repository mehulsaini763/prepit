import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

import { Card, CardBody, CardHeader, Chip, Spinner, Typography } from '@material-tailwind/react';
import ViewModal from './view-modal';

import { useMediaQuery } from 'react-responsive';

import { useEffect } from 'react';

import moment from 'moment';

import useQueries from '@/hooks/useQueries';
import { getCookie } from '@/utils/misc';

const TABLE_HEAD = ['Query Id', 'Category', 'Date', 'Status', ''];

const QueriesTable = () => {
  const { queries, reading, readQueries, updateQuery } = useQueries();
  const matchMedia = useMediaQuery({ query: '(max-width:920px)' });
  useEffect(() => {
    (async () => {
      const user = await getCookie('[PI USER]');
      readQueries(user.email);
    })();
  }, []);
  return (
    <Card className="h-full w-full border p-0 rounded-md" variant="gradient" color="white">
      <CardHeader className="flex items-center justify-between m-4 rounded-none" floated={false} shadow={false}>
        <Typography variant="h5" className="flex items-center gap-2" color="black">
          <ClipboardDocumentListIcon className="w-6 h-6" />
          Queries
        </Typography>
      </CardHeader>
      <CardBody className="p-0 h-full overflow-auto">
        {reading ? (
          <div className="h-full flex flex-col justify-center items-center">
            <Spinner className="w-8 h-8" color="blue" />
          </div>
        ) : queries.length == 0 ? (
          <div colSpan={5} className="h-full flex flex-col justify-center items-center">
            No Issues
          </div>
        ) : (
          <table className="table w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className={`bg-blue-gray-50 p-4 text-left`}>
                    <Typography variant="small" color="blue-gray" className="font-semibold  leading-none">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queries.map((v, i) => {
                const classes = 'text-left p-4 border-b border-blue-gray-50';
                return (
                  <tr key={i}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {v.id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {v.category}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {matchMedia
                          ? moment.unix(v.createdAt.seconds).format('DD/MM/YY')
                          : moment.unix(v.createdAt.seconds).format('DD/MM/YY hh:mm A')}
                      </Typography>
                    </td>

                    <td className={classes}>
                      {v.status == 'open' ? (
                        <Chip
                          variant="ghost"
                          color="amber"
                          size="sm"
                          value="open"
                          className="w-fit"
                          icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-yellow-900 content-['']" />}
                        />
                      ) : v.status == 'reOpened' ? (
                        <Chip
                          variant="ghost"
                          color="amber"
                          size="sm"
                          value="re-opened"
                          className="w-fit"
                          icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-yellow-900 content-['']" />}
                        />
                      ) : v.status == 'resolved' ? (
                        <Chip
                          variant="ghost"
                          color="blue"
                          size="sm"
                          value="resolved"
                          className="w-fit"
                          icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']" />}
                        />
                      ) : (
                        <Chip
                          variant="ghost"
                          color="gray"
                          size="sm"
                          value="closed"
                          className="w-fit"
                          icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-gray-900 content-['']" />}
                        />
                      )}
                    </td>
                    <td className={classes}>
                      <ViewModal readQueries={readQueries} updateQuery={updateQuery} query={v} />
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

export default QueriesTable;
