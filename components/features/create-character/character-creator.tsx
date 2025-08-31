"use client";

import { useState } from "react";
import * as React from "react";

import { useRouter } from "next/navigation";

import { createCharacter } from "@/server/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  Radiation,
  Rocket,
  ScrollText,
  Sword,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCharacterFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/8bit/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/8bit/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/8bit/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/8bit/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/8bit/tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  dystopianCharacters,
  dystopianItems,
  dystopianPlots,
  fantasyCharacters,
  fantasyItems,
  fantasyPlots,
  sciFiCharacters,
  sciFiItems,
  sciFiPlots,
} from "@/components/shared/data";
import { Genre } from "@/components/shared/types";

import LoadingSentences from "../loading-sentences";
import { getRandomCharacter } from "./index";

const genres = [
  {
    id: Genre.FANTASY,
    label: "Fantasy",
    description: "Medieval worlds and magic",
    icon: Sword,
  },
  {
    id: Genre.SCIFI,
    label: "Sci-Fi",
    description: "Space exploration and technology",
    icon: Rocket,
  },
  {
    id: Genre.DYSTOPIAN,
    label: "Dystopian",
    description: "Post-apocalyptic scenarios",
    icon: Radiation,
  },
];

export default function CharacterCreator() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGenreChangeLoading, setIsGenreChangeLoading] =
    useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [availableData, setAvailableData] = useState({
    characters: fantasyCharacters,
    stories: fantasyPlots,
    items: fantasyItems,
  });

  const form = useForm<z.infer<typeof createCharacterFormSchema>>({
    resolver: zodResolver(createCharacterFormSchema),
    defaultValues: {
      genre: undefined,
      name: "",
      gender: "male",
      plot: "",
      type: "",
      items: "",
      //   skill: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createCharacterFormSchema>) {
    setIsLoading(true);

    try {
      const data = await createCharacter(values);
      router.push(`/play/game/${data.gameId}`);
    } catch (e) {
      console.log(e);
    }
  }

  const handleGenreSelect = (genre: Genre) => {
    setIsGenreChangeLoading(true);

    const genreData = {
      [Genre.FANTASY]: {
        characters: fantasyCharacters,
        stories: fantasyPlots,
        items: fantasyItems,
      },
      [Genre.SCIFI]: {
        characters: sciFiCharacters,
        stories: sciFiPlots,
        items: sciFiItems,
      },
      [Genre.DYSTOPIAN]: {
        characters: dystopianCharacters,
        stories: dystopianPlots,
        items: dystopianItems,
      },
    };

    form.reset();

    setAvailableData(genreData[genre]);
    form.setValue("genre", genre);

    setIsGenreChangeLoading(false);
    setStep(2);
  };

  const handleRandomCharacter = async () => {
    const randomCharacter = await getRandomCharacter();
    handleGenreSelect(randomCharacter.genre);
    form.setValue("name", randomCharacter.name);
    form.setValue("gender", randomCharacter.gender as "male" | "female");
    form.setValue("type", randomCharacter.type);
    form.setValue("items", randomCharacter.item);
    form.setValue("plot", randomCharacter.plot);
  };

  if (isLoading) {
    return <LoadingSentences />;
  }

  const allFieldsFilled =
    form.getValues("name") &&
    form.getValues("gender") &&
    form.getValues("type") &&
    form.getValues("items") &&
    form.getValues("plot");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-4xl retro"
      >
        <header className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-md font-bold tracking-wider md:text-2xl">
            Create Your Story
          </h1>
        </header>

        <div className="grid gap-6">
          {/* Genre Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs text-muted-foreground">
                Choose Your Genre
              </h2>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={handleRandomCharacter}
                        disabled={isLoading}
                        type="button"
                      >
                        Random
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 256 256"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          strokeWidth="0.25"
                          className="size-6"
                          aria-label="dice4"
                        >
                          <rect
                            x="96"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="48"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="144"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="176"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="160"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="128"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="112"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="64"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="144"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="160"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="192"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="48"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="176"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="144"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="48"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="96"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="96"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="112"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="80"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="64"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="64"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="80"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="128"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="72"
                            y="160"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="168"
                            y="72"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="72"
                            y="72"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="168"
                            y="160"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="48"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="176"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="192"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="176"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="160"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="64"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="192"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="208"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="192"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="80"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="112"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="160"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="128"
                            y="32"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="144"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="32"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="80"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="96"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="112"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                          <rect
                            x="128"
                            y="208"
                            width="14"
                            height="14"
                            rx="1"
                          ></rect>
                        </svg>
                        <span className="sr-only">Random Character</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate a random character</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-2">
              {genres.map((genre) => (
                <TooltipProvider key={genre.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          "border-none",
                          form.getValues("genre") === genre.id && "bg-primary"
                        )}
                        onClick={() => handleGenreSelect(genre.id)}
                        disabled={isLoading}
                      >
                        <genre.icon className="size-5" />
                        {genre.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{genre.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          {/* Character Details & Story */}
          {form.getValues("genre") && !isGenreChangeLoading && (
            <>
              <h2 className="text-xs text-muted-foreground">
                Create Your Character
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-sm">Character Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Character Type</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? availableData.characters.find(
                                          (character) =>
                                            character === field.value
                                        )
                                      : `${form.getValues("genre")} Character`}
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="Search character..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>
                                      No character found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {availableData.characters.map(
                                        (character) => (
                                          <CommandItem
                                            value={character}
                                            key={character}
                                            onSelect={() => {
                                              form.setValue("type", character);
                                            }}
                                          >
                                            {character}
                                            <Check
                                              className={cn(
                                                "ml-auto",
                                                character === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        )
                                      )}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription className="text-xs">
                              Each genre has different characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter character name"
                                {...field}
                                className="placeholder:text-xs"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="male" />
                                  <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <Label htmlFor="female">Female</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Story & Inventory</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="items"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Item</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? availableData.items.find(
                                          (item) => item === field.value
                                        )
                                      : `${form.getValues("genre")} Item`}
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="Search item..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <CommandGroup>
                                      {availableData.items.map((item) => (
                                        <CommandItem
                                          value={item}
                                          key={item}
                                          onSelect={() => {
                                            form.setValue("items", item);
                                          }}
                                        >
                                          {item}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              item === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription className="text-xs">
                              Each genre has different items.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Story</Label>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-32 w-full bg-background"
                          >
                            {form.getValues("plot") ? (
                              <div className="space-y-2 text-left">
                                <h4 className="text-wrap font-bold">
                                  {form.getValues("plot")}
                                </h4>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <ScrollText className="size-6" />
                                <span>Select Your Story</span>
                              </div>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl">
                              Choose Your Story
                            </DialogTitle>
                            <DialogDescription>
                              Select a story path that will define your
                              character&apos;s journey
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[400px] w-full border border-dashed p-4">
                            <div className="flex flex-col gap-2">
                              {availableData.stories.map(
                                (story: string, index: number) => (
                                  <Card
                                    key={index}
                                    className={cn(
                                      "cursor-pointer transition-color border-x-4 hover:bg-primary",
                                      form.getValues("plot") === story &&
                                        "border-primary"
                                    )}
                                    onClick={() => {
                                      form.setValue("plot", story);
                                      setIsDialogOpen(false);
                                    }}
                                  >
                                    <CardHeader>
                                      <CardTitle className="text-sm">
                                        {index + 1}. {story}
                                      </CardTitle>
                                    </CardHeader>
                                  </Card>
                                )
                              )}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                      <p className="text-xs text-muted-foreground">
                        Each genre has different stories.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Action Buttons */}
          {!isLoading && !isGenreChangeLoading && step > 1 && (
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                  setStep(1);
                }}
              >
                Clear
              </Button>
              <div className="relative flex justify-center">
                <Button disabled={isLoading} type="submit">
                  Play Your Story
                </Button>

                {allFieldsFilled && (
                  <div className="absolute -top-1 w-max -translate-y-full animate-pulse">
                    ready to play
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
