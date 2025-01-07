import { Button } from "@material-tailwind/react";

const ProfilePanel = ({ setActivePanel }) => {
  return (
    <div className=" w-3/4 flex flex-col border border-gray-500 rounded-sm">
      <p className="text-center text-lg font-semibold p-2">Candidate Credentials</p>
      <div className="h-full grid place-content-center">
        <div className="p-4 border border-gray-500">
          User Id: <br />
          Name:
          <br />
          D.O.B {"(Date of Birth)"}
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-gray-500 gap-2 p-1">
        <Button
          className="rounded-sm bg-blue-300"
          onClick={() => setActivePanel("main")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ProfilePanel;
