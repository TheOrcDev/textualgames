"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { trpc } from "@/server/client";

import LoadingSentences from "../loading-sentences/loading-sentences";
import NotEnoughTokens from "../not-enough-tokens/not-enough-tokens";

export default function CreateCharacter() {
  const level = trpc.ai.getLevel.useMutation();
  const utils = trpc.useUtils();

  const router = useRouter();

  const [availableCharacters, setAvailableCharacters] =
    useState<string[]>(fantasyCharacters);
  const [availableStories, setAvailableStories] =
    useState<string[]>(fantasyPlots);
  const [availableItems, setAvailableItems] = useState<string[]>(fantasyItems);
  const [hasNoTokens, setHasNoTokens] = useState<boolean>(false);

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
    try {
      // TODO: remove this by creating new api endpoint for new character
      const game = {
        id: "",
        levels: [],
        choice: "",
        character: {
          ...values,
          id: "",
          gameId: "",
          createdAt: "",
        },
        genre: values.genre,
      };

      const data = await level.mutateAsync({
        game,
      });

      if (data === "Not enough tokens") {
        setHasNoTokens(true);
        return;
      }

      utils.tokens.getTokens.refetch();
      router.push(`/game/${data}`);
    } catch (e) {
      console.log(e);
    }
  }

  const onGenreChange = (genre: Genre) => {
    if (genre === Genre.FANTASY) {
      setAvailableCharacters(fantasyCharacters);
      setAvailableStories(fantasyPlots);
      setAvailableItems(fantasyItems);
    }

    if (genre === Genre.SCIFI) {
      setAvailableCharacters(sciFiCharacters);
      setAvailableStories(sciFiPlots);
      setAvailableItems(sciFiItems);
    }

    if (genre === Genre.DYSTOPIAN) {
      setAvailableCharacters(dystopianCharacters);
      setAvailableStories(dystopianPlots);
      setAvailableItems(dystopianItems);
    }
  };

  const quickGame = () => {
    const randomGenre =
      Object.values(Genre)[
        Math.floor(Math.random() * Object.values(Genre).length)
      ];
    const randomCharacter =
      availableCharacters[
        Math.floor(Math.random() * availableCharacters.length)
      ];
    const randomStory =
      availableStories[Math.floor(Math.random() * availableStories.length)];
    const randomItem =
      availableItems[Math.floor(Math.random() * availableItems.length)];
    const randomGender = Math.random() > 0.5 ? "male" : "female";
    const randomName =
      randomGender === "male"
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)];

    form.setValue("genre", randomGenre);
    form.setValue("type", randomCharacter);
    form.setValue("plot", randomStory);
    form.setValue("items", randomItem);
    form.setValue("gender", randomGender);
    form.setValue("name", randomName);
  };

  if (hasNoTokens) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-24">
        <NotEnoughTokens />
      </div>
    );
  }

  if (level.isPending) {
    return <LoadingSentences />;
  }

  return (
    <>
      <h1>Create Your Character</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-5 px-5 text-xs md:grid-cols-2 md:text-base"
        >
          <div className="col-span-full flex md:justify-between md:flex-row flex-col gap-5 items-center">
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
                      {availableCharacters.map((type) => (
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
                      {availableItems.map((item) => (
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
                      <ScrollArea className="h-[25rem] min-w-[20rem] md:w-[40rem] xl:w-[55rem] rounded-md border p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableStories.map((story) => (
                            <DropdownMenuItem key={story}>
                              <Button
                                onClick={() => {
                                  field.onChange(story);
                                }}
                                className="h-52 w-52 xl:w-full text-wrap text-xs md:text-base"
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
  );
}
