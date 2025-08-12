import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs);
  return (
    <div className="">
      <Table>
        <TableCaption>List Of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        {
          <TableBody>
            {allAppliedJobs?.application?.length <= 0 ? (
              <span>You Have not applied for anyJobs</span>
            ) : (
              allAppliedJobs?.application?.map((appliedJob) => (
                <TableRow key={appliedJob?._id}>
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500"
                          : appliedJob.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-500"
                      }`}
                    >
                      {appliedJob?.status === "pending"
                        ? "pending"
                        : appliedJob.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        }
      </Table>
    </div>
  );
};

export default AppliedJobTable;
