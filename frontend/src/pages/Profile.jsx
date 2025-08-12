import AppliedJobTable from "@/components/AppliedJobTable";
import Navbar from "@/components/shared/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import store from "@/redux/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isHaveResume = true;
  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-5xl border rounded-sm border-gray-500 p-6 my-20 mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="">
              <AvatarImage
                src={
                  user.profile.profilePhoto || "https://github.com/shadcn.png"
                }
                className="h-24 w-24 rounded-full"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex my-3 items-center gap-5">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-5">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="">
          <h1>Skills</h1>
          {user?.profile?.skills.length != 0 ? (
            user?.profile?.skills.map((items, index) => (
              <Badge className="px-4 mx-3">{items}</Badge>
            ))
          ) : (
            <span>Skills Not Avilable</span>
          )}
        </div>
        <div className="my-5 grid max-w-sm items-center gap-3">
          <Label className="text-md font-bold">Resume</Label>
          {isHaveResume ? (
            <a href={user?.profile?.resume} target="_blank">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>No resume </span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-xl font-bold my-3">Applied Jobs</h1>
        <AppliedJobTable  />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
