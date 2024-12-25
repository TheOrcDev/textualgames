"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  dystopianCharacters,
  dystopianItems,
  dystopianPlots,
  fantasyCharacters,
  fantasyItems,
  fantasyPlots,
  femaleNames,
  maleNames,
  sciFiCharacters,
  sciFiItems,
  sciFiPlots,
} from "@/components/shared/data";
import { Genre } from "@/components/shared/types";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { createCharacterFormSchema } from "@/lib/form-schemas";
import { getRandomElement } from "@/lib/utils";
import { getLevel } from "@/server/ai";

import LoadingSentences from "../loading-sentences/loading-sentences";
import NotEnoughTokens from "../not-enough-tokens/not-enough-tokens";

export default function CreateCharacter() {
  const router = useRouter();

  const [availableData, setAvailableData] = useState({
    characters: fantasyCharacters,
    stories: fantasyPlots,
    items: fantasyItems,
  });

  const [hasNoTokens, setHasNoTokens] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createCharacterFormSchema>>({
    resolver: zodResolver(createCharacterFormSchema),
    defaultValues: {
      genre: Genre.FANTASY,
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
      const game = {
        id: "",
        email: "",
        levels: [],
        choice: "",
        character: {
          ...values,
          id: "",
          gameId: "",
          createdAt: new Date(),
        },
        genre: values.genre,
      };

      const data = await getLevel(game);

      if (data === "Not enough tokens") {
        setHasNoTokens(true);
        return;
      }

      router.push(`/game/${data.gameId}`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const onGenreChange = (genre: Genre) => {
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

    setAvailableData(genreData[genre]);
  };

  const quickGame = () => {
    const randomGenre = getRandomElement(Object.values(Genre));
    const randomCharacter = getRandomElement(availableData.characters);
    const randomStory = getRandomElement(availableData.stories);
    const randomItem = getRandomElement(availableData.items);
    const randomGender = Math.random() > 0.5 ? "male" : "female";
    const randomName = getRandomElement(
      randomGender === "male" ? maleNames : femaleNames,
    );

    const formValues = {
      genre: randomGenre,
      type: randomCharacter,
      plot: randomStory,
      items: randomItem,
      gender: randomGender,
      name: randomName,
    };

    Object.entries(formValues).forEach(([key, value]) =>
      form.setValue(
        key as "type" | "name" | "genre" | "gender" | "plot" | "items",
        value as any,
      ),
    );
  };

  if (hasNoTokens) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-24">
        <NotEnoughTokens />
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingSentences />}

      {!isLoading && (
        <>
          <h1>Create Your Character</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-5 px-5 text-xs md:grid-cols-2 md:text-base"
            >
              <div className="col-span-full flex flex-col items-center gap-5 md:flex-row md:justify-between">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Your Genre</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          {Object.values(Genre).map((genre) => (
                            <div
                              key={genre}
                              className={`${field.value === genre ? "border-b-2" : ""} pb-2`}
                            >
                              <Button
                                size={"sm"}
                                disabled={genre === field.value}
                                onClick={() => {
                                  field.onChange(genre);
                                  onGenreChange(genre);
                                }}
                                type="button"
                              >
                                {genre}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size={"sm"} type="button" onClick={quickGame}>
                  Random Character
                </Button>
              </div>
              <div className="flex max-w-[29rem] flex-col gap-5 border p-5">
                <h2>Character Details</h2>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`${form.getValues("genre")} Character Type`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableData.characters.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        Each genre has different characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex max-w-[29rem] flex-col gap-5 border p-5">
                <h2>Story & Inventory</h2>
                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableData.items.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        Each genre has different items.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plot"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel>Story</FormLabel>
                      <DropdownMenu>
                        <FormControl>
                          <DropdownMenuTrigger asChild>
                            <Button className="h-52 w-full text-wrap text-xs md:text-base">
                              {field.value ? field.value : "Select Your Story"}
                            </Button>
                          </DropdownMenuTrigger>
                        </FormControl>
                        <DropdownMenuContent>
                          <ScrollArea className="h-[25rem] min-w-80 rounded-md border p-4 md:w-[40rem] xl:w-[55rem]">
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                              {availableData.stories.map((story) => (
                                <DropdownMenuItem key={story}>
                                  <Button
                                    onClick={() => {
                                      field.onChange(story);
                                    }}
                                    className="size-52 text-wrap text-xs md:text-base xl:w-full"
                                  >
                                    {story}
                                  </Button>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </ScrollArea>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <FormDescription className="text-xs">
                        Each genre has different stories.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full flex flex-col justify-end gap-3 md:flex-row">
                <Button type="button" onClick={() => form.reset()}>
                  Clear
                </Button>
                <Button type="submit">Play Your Story</Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
