import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const CategoryCarousel = () => {
  const category = [
    "Frontend Developer",
    "Mernstack Developer",
    "Backend Developer",
    "Fullstack Developer",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full mx-auto -z-10  max-w-xl my-20">
        <CarouselContent>
          {category.map((items, index) => (
            <CarouselItem className="md:basis-1/2 cursor-pointer  lg:basis-1/3">
              <Button
                className="cursor-pointer"
                onClick={() => searchJobHandler(items)}
              >
                {items}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="cursor-pointer" />
        <CarouselPrevious className="cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
