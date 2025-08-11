import CompaniesTable from "@/components/admin/CompaniesTable";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { setSearchCompanyByText } from "@/redux/companySlice";
import store from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompany();
  const [filterCompany, setFilterCompany] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(filterCompany));
  }, [filterCompany]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-8">
          <Input
            className="w-fit"
            onChange={(e) => setFilterCompany(e.target.value)}
            placeholder="Filter by name"
          />
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
