"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, Checkbox, Image, Spinner } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [isGenerating, setGenerating] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null); // State for the returned image
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])

  const selectBreed = (item: string) => {
    setSelectedBreeds((prevList) => [...prevList, item])
  }

  const deSelectBreed = (item: string) => {
    setSelectedBreeds((prevList) => prevList.filter((i) => i !== item))
  }

  const breeds = [
    { name: "French Bulldog", image: "breeds/french-bulldog.avif" },
    { name: "Labrador Retriever", image: "breeds/labrador-retriever.avif" },
    { name: "Golden Retriever", image: "breeds/golden-retriever.avif" },
    { name: "German Shepherd", image: "breeds/german-shepherd.avif" },
    { name: "Poodle", image: "breeds/poodle.avif" },
    { name: "Bulldog", image: "breeds/bulldog.avif" },
    { name: "Rottweiler", image: "breeds/rottweiler.avif" },
    { name: "Beagle", image: "breeds/beagle.avif" },
    { name: "Dachshund", image: "breeds/dachshund.avif" },
    { name: "German Shorthaired Pointer", image: "breeds/german-shorthaired-pointer.avif" },
    { name: "Pembroke Welsh Corgi", image: "breeds/pembroke-welsh-corgi.avif" },
    { name: "Australian Shepherd", image: "breeds/australian-shepherd.avif" },
    { name: "Yorkshire Terrier", image: "breeds/yorkshire-terrier.avif" },
    { name: "Cavalier King Charles Spaniel", image: "breeds/cavalier-king-charles-spaniel.avif" },
    { name: "Doberman Pinscher", image: "breeds/doberman-pinscher.avif" },
    { name: "Boxer", image: "breeds/boxer.avif" },
    { name: "Miniature Schnauzer", image: "breeds/miniature-schnauzer.avif" },
    { name: "Cane Corso", image: "breeds/cane-corso.avif" },
    { name: "Great Dane", image: "breeds/great-dane.avif" },
    { name: "Shih Tzu", image: "breeds/shih-tzu.avif" },
  ];

  breeds.sort((a, b) => {
    return a.name.replace(/\s+/g, '').toLowerCase().localeCompare(b.name.replace(/\s+/g, '').toLowerCase());
  });

  const renderDogCards = () => {
    return breeds.map((breed, index) => (
      <Card key={index} className="min-h-24 hover:scale-105 mr-8 ml-8">
        <CardBody className="flex shrink-0 flex-row items-center gap-6">
          <Image
            className="hidden lg:block "
            alt={breed.name} 
            height={72}
            width={72}
            radius="lg"
            src={breed.image}
            isZoomed={true}
          />
          <h2 className="flex-grow">{breed.name}</h2>
          <Checkbox
            className="mr-2"
            color="secondary"
            isReadOnly={isGenerating}
            onChange={() => {
              if (selectedBreeds.includes(breed.name)) {
                deSelectBreed(breed.name)
              } else {
                selectBreed(breed.name)
              }
            }}
          ></Checkbox>
        </CardBody>
      </Card>
    ));
  };

  const handleGenerate = async () => {
    if (selectedBreeds.length === 0) {
      return;
    }
    setGenerating(true);
    setBase64Image(null)
    console.log(selectedBreeds)
    try {
      const response = await fetch("https://mixas-backend-6a9e7662ec77.herokuapp.com/generate-image/DamarrHamlin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: selectedBreeds }), // Sends selected breeds
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setBase64Image(data.image_base64); // Set the returned base64 image
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <div className="min-h-screen max-h-screen min-w-screen flex">
        <div className="m-8 gap-8 max-h-full flex flex-grow flex-row items-center">
          <div className="bg-neutral-800 flex flex-col min-h-full w-3/4 rounded-3xl border-double border-2 border-neutral-600 text-center">
          <h1 className="mt-6 font-bold min-w-full">Image Panel</h1>
            <div className="max-h-full flex flex-grow m-6 justify-center items-center">
              {base64Image ? (
                <img
                  className="aspect-square lg:min-h-[650px] max-h-[650px] lg:min-w-[650px] max-w-[650px] object-cover rounded-xl"
                  alt="Generated dog breeds"
                  src={`data:image/png;base64,${base64Image}`} // Renders the base64 image
                />
              ) : isGenerating ? (<Spinner label="Loading your fluffy mixture... This might take a while..." color="success" />) : <></>}
            </div>
          </div>
          <div className="bg-neutral-800 max-h-full flex min-h-full flex-grow rounded-3xl border-double border-2 border-neutral-600">
            <div className="flex max-h-full flex-col gap-6 flex-grow mt-6 mb-6 text-center">
              <h1 className="font-bold">Dog Breeds</h1>
              <div className="flex-grow flex flex-col overflow-x-clip overflow-y-scroll gap-1">
                {renderDogCards()}
              </div>
              <div className="flex flex-row gap-3 justify-center">
                <Button
                  className="w-1/2 font-semibold"
                  isLoading={isGenerating}
                  onPress={handleGenerate}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
