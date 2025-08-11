import CompaniesTable from "@/components/admin/CompaniesTable";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import React from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompany();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-8">
          <Input className="w-fit" placeholder="Filter by name" />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="cursor-pointer"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
