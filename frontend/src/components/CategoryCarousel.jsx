import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const CategoryCarousel = () => {
  const category = ["frontend DF", "frontend DF", "backend DF", "frontend DF"];
  return (
    <div>
      <Carousel className="w-full mx-auto max-w-xl my-20">
        <CarouselContent>
          {category.map((items, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button>{items}</Button>
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
