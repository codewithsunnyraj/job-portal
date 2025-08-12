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
  const category = ["frontend DF", "frontend DF", "backend DF", "frontend DF"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full mx-auto max-w-xl my-20">
        <CarouselContent>
          {category.map((items, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchJobHandler(items)}>{items}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
