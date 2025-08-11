import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import store from "@/redux/store";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <div className="flex items-center gap-5 p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-3 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-black text-xl">Company Setup</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label>Company Name</Label>
              <Input
                placeholder="Company Name"
                value={input.name}
                onChange={changeEventHandler}
                type="text"
                name="name"
                className="my-3"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                placeholder="Description Here"
                value={input.description}
                onChange={changeEventHandler}
                type="text"
                name="description"
                className="my-3"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                placeholder="Website Link Here"
                value={input.website}
                onChange={changeEventHandler}
                type="text"
                name="website"
                className="my-3"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="Location Here"
                value={input.location}
                onChange={changeEventHandler}
                type="text"
                name="location"
                className="my-3"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="file"
                accept="image/*"
                className="my-3"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="mr-4 w-full">
              <Loader2 className="animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full cursor-pointer py-3 my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
