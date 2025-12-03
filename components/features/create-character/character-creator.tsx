"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createCharacter } from "@/server/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronsUpDown,
  Dices,
  Radiation,
  Rocket,
  ScrollText,
  Sword,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCharacterFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { ScrollArea } from "@/components/ui/8bit/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

import LoadingSentences from "../loading-sentences";

const genres = [
  {
    id: Genre.FANTASY,
    label: "Fantasy",
    description: "Medieval worlds and magic",
    icon: Sword,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/50",
  },
  {
    id: Genre.SCIFI,
    label: "Sci-Fi",
    description: "Space exploration and technology",
    icon: Rocket,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/50",
  },
  {
    id: Genre.DYSTOPIAN,
    label: "Dystopian",
    description: "Post-apocalyptic scenarios",
    icon: Radiation,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/50",
  },
];

const steps = [
  { id: 1, title: "Choose Genre" },
  { id: 2, title: "Identity" },
  { id: 3, title: "Story" },
  { id: 4, title: "Review" },
];

export default function CharacterCreator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // UI State
  const [isCharacterPopoverOpen, setIsCharacterPopoverOpen] = useState(false);
  const [isItemsPopoverOpen, setIsItemsPopoverOpen] = useState(false);
  const [isPlotDialogOpen, setIsPlotDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createCharacterFormSchema>>({
    resolver: zodResolver(createCharacterFormSchema),
    defaultValues: {
      genre: undefined,
      name: "",
      gender: "male",
      plot: "",
      type: "",
      items: "",
    },
  });

  const currentGenre = form.watch("genre");

  // Derived state for available data based on genre
  const availableData = {
    characters:
      currentGenre === Genre.FANTASY
        ? fantasyCharacters
        : currentGenre === Genre.SCIFI
          ? sciFiCharacters
          : dystopianCharacters,
    stories:
      currentGenre === Genre.FANTASY
        ? fantasyPlots
        : currentGenre === Genre.SCIFI
          ? sciFiPlots
          : dystopianPlots,
    items:
      currentGenre === Genre.FANTASY
        ? fantasyItems
        : currentGenre === Genre.SCIFI
          ? sciFiItems
          : dystopianItems,
  };

  async function onSubmit(values: z.infer<typeof createCharacterFormSchema>) {
    setIsLoading(true);
    try {
      const data = await createCharacter(values);
      router.push(`/play/game/${data.gameId}`);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  const handleGenreSelect = (genre: Genre) => {
    form.setValue("genre", genre);
    // Reset other fields when genre changes
    form.setValue("type", "");
    form.setValue("items", "");
    form.setValue("plot", "");
    setStep(2);
  };

  const randomizeIdentity = () => {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const name =
      gender === "male"
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const type =
      availableData.characters[
        Math.floor(Math.random() * availableData.characters.length)
      ];

    form.setValue("gender", gender);
    form.setValue("name", name);
    form.setValue("type", type);
  };

  const randomizeStory = () => {
    const item =
      availableData.items[
        Math.floor(Math.random() * availableData.items.length)
      ];
    const plot =
      availableData.stories[
        Math.floor(Math.random() * availableData.stories.length)
      ];

    form.setValue("items", item);
    form.setValue("plot", plot);
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 2) {
      isValid = await form.trigger(["name", "gender", "type"]);
    } else if (step === 3) {
      isValid = await form.trigger(["items", "plot"]);
    }

    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  if (isLoading) {
    return <LoadingSentences />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 retro">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-wider md:text-4xl">
          Create Your Legend
        </h1>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <Badge variant={step >= s.id ? "default" : "secondary"}>
                {s.id}
              </Badge>
              <span
                className={cn(
                  "ml-2 hidden font-medium md:block",
                  step >= s.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className="mx-4 h-[2px] w-8 bg-muted md:w-16" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-6 md:grid-cols-3"
              >
                {genres.map((genre) => (
                  <Card
                    key={genre.id}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105 hover:shadow-lg",
                      form.watch("genre") === genre.id
                        ? `ring-2 ring-primary ${genre.bg}`
                        : "hover:bg-accent"
                    )}
                    onClick={() => handleGenreSelect(genre.id)}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={cn(
                          "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-background",
                          genre.border,
                          genre.color
                        )}
                      >
                        <genre.icon className="h-8 w-8" />
                      </div>
                      <CardTitle>{genre.label}</CardTitle>
                      <CardDescription>{genre.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Who are you?</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={randomizeIdentity}
                      className="text-xs"
                    >
                      <Dices className="mr-2 size-4" />
                      Randomize Identity
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
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
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Archetype</FormLabel>
                            <Popover
                              open={isCharacterPopoverOpen}
                              onOpenChange={setIsCharacterPopoverOpen}
                            >
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
                                          (c) => c === field.value
                                        )
                                      : "Select archetype"}
                                    <ChevronsUpDown className="ml-2 size-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search archetype..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No archetype found.
                                    </CommandEmpty>
                                    <CommandGroup className="max-h-[200px] overflow-y-auto">
                                      {availableData.characters.map((char) => (
                                        <CommandItem
                                          value={char}
                                          key={char}
                                          onSelect={() => {
                                            form.setValue("type", char);
                                            setIsCharacterPopoverOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 size-4",
                                              char === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {char}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent">
                                <RadioGroupItem value="male" id="male" />
                                <Label
                                  htmlFor="male"
                                  className="cursor-pointer"
                                >
                                  Male
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent">
                                <RadioGroupItem value="female" id="female" />
                                <Label
                                  htmlFor="female"
                                  className="cursor-pointer"
                                >
                                  Female
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 size-4" /> Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Story</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={randomizeStory}
                      className="text-xs"
                    >
                      <Dices className="mr-2 size-4" />
                      Randomize Story
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="items"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Starting Item</FormLabel>
                          <Popover
                            open={isItemsPopoverOpen}
                            onOpenChange={setIsItemsPopoverOpen}
                          >
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
                                    : "Select starting item"}
                                  <ChevronsUpDown className="ml-2 size-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Search item..." />
                                <CommandList>
                                  <CommandEmpty>No item found.</CommandEmpty>
                                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                                    {availableData.items.map((item) => (
                                      <CommandItem
                                        value={item}
                                        key={item}
                                        onSelect={() => {
                                          form.setValue("items", item);
                                          setIsItemsPopoverOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 size-4",
                                            item === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {item}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plot Hook</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Dialog
                                open={isPlotDialogOpen}
                                onOpenChange={setIsPlotDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "h-auto min-h-[100px] w-full justify-start whitespace-normal p-4 text-left",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      <span className="text-sm md:text-base">
                                        {field.value}
                                      </span>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <ScrollText className="h-5 w-5" />
                                        <span>Choose your story path...</span>
                                      </div>
                                    )}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-h-[80vh] sm:max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Choose Your Path</DialogTitle>
                                    <DialogDescription>
                                      Select a story hook to begin your
                                      adventure.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <ScrollArea className="h-[400px] pr-4">
                                    <div className="grid gap-2">
                                      {availableData.stories.map(
                                        (story, index) => (
                                          <Card
                                            key={index}
                                            className={cn(
                                              "cursor-pointer border-2 transition-all hover:bg-accent",
                                              field.value === story
                                                ? "border-primary bg-accent"
                                                : "border-transparent"
                                            )}
                                            onClick={() => {
                                              form.setValue("plot", story);
                                              setIsPlotDialogOpen(false);
                                            }}
                                          >
                                            <CardContent className="p-4 text-sm">
                                              {story}
                                            </CardContent>
                                          </Card>
                                        )
                                      )}
                                    </div>
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 size-4" /> Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Review Character</CardTitle>
                    <CardDescription>
                      Ready to embark on your adventure?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 flex items-center font-bold text-muted-foreground">
                          <User className="mr-2 size-4" /> Identity
                        </h3>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Name:</dt>
                            <dd className="font-medium">
                              {form.getValues("name")}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Gender:</dt>
                            <dd className="font-medium capitalize">
                              {form.getValues("gender")}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">
                              Archetype:
                            </dt>
                            <dd className="font-medium">
                              {form.getValues("type")}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 flex items-center font-bold text-muted-foreground">
                          <ScrollText className="mr-2 size-4" /> Story
                        </h3>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Genre:</dt>
                            <dd className="font-medium">
                              {genres.find((g) => g.id === currentGenre)?.label}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Item:</dt>
                            <dd className="font-medium">
                              {form.getValues("items")}
                            </dd>
                          </div>
                        </dl>
                        <div className="mt-4 border-t pt-2">
                          <dt className="mb-1 text-xs text-muted-foreground">
                            Plot Hook:
                          </dt>
                          <dd className="text-sm italic">
                            "{form.getValues("plot")}"
                          </dd>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 size-4" /> Back
                    </Button>
                    <Button type="submit" disabled={isLoading} className="w-32">
                      {isLoading ? (
                        "Creating..."
                      ) : (
                        <>
                          Play <Rocket className="ml-2 size-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
}
