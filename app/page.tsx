"use client"

import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
import { Card, CardBody, Checkbox, Image } from "@nextui-org/react";

export default function Home() {

  const breeds = [
    { name: "French Bulldog", image: "french-bulldog.avif" },
    { name: "Labrador Retriever", image: "labrador-retriever.avif" },
    { name: "Golden Retriever", image: "golden-retriever.avif" },
    { name: "German Shepherd", image: "german-shepherd.avif" },
    { name: "Poodle", image: "poodle.avif" },
    { name: "Bulldog", image: "bulldog.avif" },
    { name: "Rottweiler", image: "rottweiler.avif" },
    { name: "Beagle", image: "beagle.avif" },
    { name: "Daschund", image: "daschund.avif" },
    { name: "German Shorthaired Pointer", image: "german-shorthaired-pointer.avif" },
    { name: "Pembroke Welsh Corgi", image: "pembroke-welsh-corgi.avif" },
    { name: "Australian Shepherd", image: "australian-shepherd.avif" },
    { name: "Yorkshire Terrier", image: "yorkshire-terrier.avif" },
    { name: "Cavalier King Charles Spaniel", image: "cavalier-king-charles-spaniel.avif" },
    { name: "Doberman Pinscher", image: "doberman-pinscher.avif" },
    { name: "Boxer", image: "boxer.avif" },
    { name: "Miniature Schnauzer", image: "miniature-schnauzer.avif" },
    { name: "Cane Corso", image: "cane-corso.avif" },
    { name: "Great Dane", image: "great-dane.avif" },
    { name: "Shih Tzu", image: "shih-tzu.avif" },
  ]

  const renderDogCards = () => {
    return breeds.map((breed, index) => (
      <Card key={index} className="min-h-24">
        <CardBody className="flex flex-row items-center gap-6">
          <Image
            className="hidden lg:block"
            alt="placeholder."
            height={72}
            width={72}
            radius="lg"
            src="generic-dog.avif"
            isZoomed={true}
          />
          <h2 className="flex-grow">{breed.name}</h2>
          <Checkbox className="mr-2" color="secondary"></Checkbox>
        </CardBody>
      </Card>
    ));
  }

  return (
    <>
      <div className="min-h-screen max-h-screen min-w-screen flex"> {/** Container for the two panels, centers everything vertically */}
        <div className="m-8 gap-8 max-h-full flex flex-grow flex-row items-center"> {/** Another container, mainly used for centering everything horizontally */}
          <div className="bg-neutral-800 flex min-h-full w-3/4 rounded-3xl border-double border-2 border-neutral-600"> {/** Container for the image generation (Really only needs a skeleton image component*/}
            <div className="flex-grow m-6"> {/** I want to avoid the borders overlapping with the content */}
              <p>Breh</p>
            </div>
          </div>
          <div className="bg-neutral-800 max-h-full flex min-h-full flex-grow rounded-3xl border-double border-2 border-neutral-600"> {/** Skinny panel on the right with options*/}
            <div className="flex max-h-full flex-col gap-6 flex-grow m-6 text-center"> {/** Container to hold items and prevent overlap with corner radii */}
              {/* <Input type="search" label="Search breeds..."/> Not important for now, we can add this later.*/}
              <h1 className="font-bold">Dog Breeds</h1>
              <div className="flex-grow flex flex-col overflow-y-scroll gap-1"> {/** Holds all breed cards */}
                {renderDogCards()}
              </div>
              <div className="flex flex-row justify-center"> {/** Container so that I can center my button without it taking the entire width of the parent container */}
                <Button className="w-1/2 font-semibold">Generate</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}