"use client";

import { type ReactNode, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { createCharacter } from "@/server/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Box,
  Check,
  CircleUserRound,
  Compass,
  Dices,
  Radiation,
  Rocket,
  ScrollText,
  Sparkles,
  Sword,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { type FieldPath, type FieldPathValue, useForm } from "react-hook-form";
import { z } from "zod";

import { createCharacterFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/utils";

import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { DataCard } from "@/components/thegridcn/data-card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { Stepper } from "@/components/thegridcn/stepper";
import { Terminal } from "@/components/thegridcn/terminal";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

type CharacterFormValues = z.infer<typeof createCharacterFormSchema>;
type StepId = 1 | 2 | 3 | 4;

const genres: {
  id: Genre;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  selected: string;
}[] = [
  {
    id: Genre.FANTASY,
    label: "Fantasy",
    description: "Arcane kingdoms, cursed relics, old roads",
    icon: Sword,
    accent: "text-amber-600 dark:text-amber-300",
    selected: "border-amber-500 bg-amber-500/10",
  },
  {
    id: Genre.SCIFI,
    label: "Sci-Fi",
    description: "Deep space, rogue machines, impossible signals",
    icon: Rocket,
    accent: "text-cyan-600 dark:text-cyan-300",
    selected: "border-cyan-500 bg-cyan-500/10",
  },
  {
    id: Genre.DYSTOPIAN,
    label: "Dystopian",
    description: "Broken cities, strict regimes, last chances",
    icon: Radiation,
    accent: "text-rose-600 dark:text-rose-300",
    selected: "border-rose-500 bg-rose-500/10",
  },
];

const steps: { id: StepId; title: string; icon: LucideIcon }[] = [
  { id: 1, title: "World", icon: Compass },
  { id: 2, title: "Hero", icon: UserRound },
  { id: 3, title: "Seed", icon: ScrollText },
  { id: 4, title: "Launch", icon: BadgeCheck },
];

const animation = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.2 },
};

function getAvailableData(genre?: Genre) {
  if (genre === Genre.SCIFI) {
    return {
      characters: sciFiCharacters,
      stories: sciFiPlots,
      items: sciFiItems,
    };
  }

  if (genre === Genre.DYSTOPIAN) {
    return {
      characters: dystopianCharacters,
      stories: dystopianPlots,
      items: dystopianItems,
    };
  }

  return {
    characters: fantasyCharacters,
    stories: fantasyPlots,
    items: fantasyItems,
  };
}

function optionClasses(selected: boolean) {
  return cn(
    "group relative flex min-h-24 w-full flex-col gap-3 rounded border border-border/70 bg-card/70 p-4 text-left font-mono transition-all",
    "hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/5 hover:shadow-[0_0_22px_color-mix(in_oklch,var(--glow)_24%,transparent)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    selected
      ? "border-primary bg-primary/10 shadow-[0_0_26px_color-mix(in_oklch,var(--glow)_34%,transparent)]"
      : "border-border",
  );
}

function OptionButton({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(optionClasses(selected), className)}
    >
      {children}
      <span
        className={cn(
          "absolute right-3 top-3 flex size-6 items-center justify-center rounded-full border border-primary/60 bg-background text-xs text-primary opacity-0 transition-opacity",
          selected && "opacity-100",
        )}
      >
        <Check className="size-4" />
      </span>
    </button>
  );
}

function StepPanel({
  title,
  kicker,
  action,
  children,
}: {
  title: string;
  kicker: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <GlowContainer
      hover={false}
      className="relative overflow-hidden border-primary/30 bg-card/80 p-0 backdrop-blur"
    >
      <GridScanOverlay gridSize={72} scanSpeed={12} />
      <div className="relative p-5 md:p-7">
        <div className="mb-6 flex flex-col gap-4 border-b border-primary/20 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="font-mono text-xs uppercase">
              {kicker}
            </Badge>
            <h2 className="font-mono text-xl font-bold uppercase leading-tight tracking-wider md:text-2xl">
              {title}
            </h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </GlowContainer>
  );
}

export default function CharacterCreator() {
  const router = useRouter();
  const [step, setStep] = useState<StepId>(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CharacterFormValues>({
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

  const values = form.watch();
  const currentGenre = values.genre;
  const selectedGenre = genres.find((genre) => genre.id === currentGenre);
  const availableData = useMemo(
    () => getAvailableData(currentGenre),
    [currentGenre],
  );

  async function onSubmit(values: CharacterFormValues) {
    setIsLoading(true);
    try {
      const data = await createCharacter(values);
      router.push(`/play/game/${data.gameId}`);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  function setField<T extends FieldPath<CharacterFormValues>>(
    field: T,
    value: FieldPathValue<CharacterFormValues, T>,
  ) {
    form.setValue(field, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  function handleGenreSelect(genre: Genre) {
    if (genre !== currentGenre) {
      setField("type", "");
      setField("items", "");
      setField("plot", "");
    }

    setField("genre", genre);
    setStep(2);
  }

  function randomizeIdentity() {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const names = gender === "male" ? maleNames : femaleNames;
    const name = names[Math.floor(Math.random() * names.length)];
    const type =
      availableData.characters[
        Math.floor(Math.random() * availableData.characters.length)
      ];

    setField("gender", gender);
    setField("name", name);
    setField("type", type);
  }

  function randomizeStory() {
    const item =
      availableData.items[
        Math.floor(Math.random() * availableData.items.length)
      ];
    const plot =
      availableData.stories[
        Math.floor(Math.random() * availableData.stories.length)
      ];

    setField("items", item);
    setField("plot", plot);
  }

  async function nextStep() {
    const fieldsByStep: Record<StepId, (keyof CharacterFormValues)[]> = {
      1: ["genre"],
      2: ["name", "gender", "type"],
      3: ["items", "plot"],
      4: ["genre", "name", "gender", "type", "items", "plot"],
    };

    const isValid = await form.trigger(fieldsByStep[step]);

    if (isValid && step < 4) {
      setStep((step + 1) as StepId);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep((step - 1) as StepId);
    }
  }

  if (isLoading) {
    return <LoadingSentences />;
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-3 pb-12 pt-6 sm:px-5 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <CircuitBackground
          opacity={0.08}
          className="rounded-lg border border-primary/30 bg-card/80"
        >
          <div className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded border border-primary/60 bg-primary/10 text-primary shadow-[0_0_18px_color-mix(in_oklch,var(--glow)_30%,transparent)]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h1 className="font-mono text-base font-bold uppercase tracking-wider">
                  New Story
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Mission setup
                </p>
              </div>
            </div>

            <Stepper
              steps={steps.map((item) => ({
                label: item.title,
                description:
                  item.id === 1
                    ? "World scan"
                    : item.id === 2
                      ? "Hero profile"
                      : item.id === 3
                        ? "Opening seed"
                        : "Launch brief",
              }))}
              currentStep={step - 1}
              orientation="vertical"
              className="bg-background/55"
            />
          </div>
        </CircuitBackground>

        <DataCard
          title="Live Brief"
          subtitle="Story uplink"
          fields={[
            {
              label: "World",
              value: selectedGenre?.label || "Not set",
              highlight: !!selectedGenre,
            },
            {
              label: "Hero",
              value: values.name || "Not set",
              highlight: !!values.name,
            },
            { label: "Archetype", value: values.type || "Not set" },
            { label: "Item", value: values.items || "Not set" },
            { label: "Hook", value: values.plot || "Not set" },
          ]}
        />
      </aside>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-0">
          <div className="mb-4 space-y-3">
            <UplinkHeader
              leftText="CREATE STORY"
              rightText={`STEP ${step}/4`}
            />
            <StatusBar
              variant="info"
              leftContent={
                <>
                  <span>{selectedGenre?.label || "Genre pending"}</span>
                  <span>{values.name || "Hero pending"}</span>
                </>
              }
              rightContent={<span>Tron narrative grid online</span>}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="world" {...animation}>
                <StepPanel title="Choose a world with teeth" kicker="World">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={() => (
                      <FormItem>
                        <div className="grid gap-4 md:grid-cols-3">
                          {genres.map((genre) => {
                            const Icon = genre.icon;
                            const selected = currentGenre === genre.id;

                            return (
                              <OptionButton
                                key={genre.id}
                                selected={selected}
                                onClick={() => handleGenreSelect(genre.id)}
                                className={cn(selected && genre.selected)}
                              >
                                <div
                                  className={cn(
                                    "flex size-12 items-center justify-center border-2 bg-background",
                                    genre.accent,
                                  )}
                                >
                                  <Icon className="size-6" />
                                </div>
                                <div className="space-y-2 pr-5">
                                  <h3 className="text-lg font-bold">
                                    {genre.label}
                                  </h3>
                                  <p className="text-xs leading-relaxed text-muted-foreground">
                                    {genre.description}
                                  </p>
                                </div>
                              </OptionButton>
                            );
                          })}
                        </div>
                        <FormMessage className="pt-3" />
                      </FormItem>
                    )}
                  />
                </StepPanel>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="hero" {...animation}>
                <StepPanel
                  title="Shape the protagonist"
                  kicker="Hero"
                  action={
                    <Button
                      type="button"
                      variant="outline"
                      onClick={randomizeIdentity}
                    >
                      <Dices className="size-4" />
                      Randomize
                    </Button>
                  }
                >
                  <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Mira, Thorne, Nyx..."
                                className="h-12 text-base"
                                {...field}
                              />
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
                                value={field.value}
                                className="grid gap-3 sm:grid-cols-2"
                              >
                                {(["male", "female"] as const).map((gender) => (
                                  <Label
                                    key={gender}
                                    htmlFor={gender}
                                    className={cn(
                                      "flex cursor-pointer items-center gap-3 border-2 p-4 capitalize transition-colors hover:bg-accent",
                                      field.value === gender &&
                                        "border-primary bg-primary/10",
                                    )}
                                  >
                                    <RadioGroupItem
                                      value={gender}
                                      id={gender}
                                    />
                                    <CircleUserRound className="size-5" />
                                    {gender}
                                  </Label>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <FormLabel>Archetype</FormLabel>
                            <Badge variant="secondary" className="text-[10px]">
                              {availableData.characters.length} roles
                            </Badge>
                          </div>
                          <div className="grid max-h-[420px] gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
                            {availableData.characters.map((character) => (
                              <OptionButton
                                key={character}
                                selected={field.value === character}
                                onClick={() => setField("type", character)}
                                className="min-h-20"
                              >
                                <div className="flex items-start gap-3 pr-6">
                                  <UserRound className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                                  <span className="text-sm leading-relaxed">
                                    {character}
                                  </span>
                                </div>
                              </OptionButton>
                            ))}
                          </div>
                          <FormMessage className="pt-3" />
                        </FormItem>
                      )}
                    />
                  </div>
                </StepPanel>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="seed" {...animation}>
                <StepPanel
                  title="Set the first spark"
                  kicker="Story Seed"
                  action={
                    <Button
                      type="button"
                      variant="outline"
                      onClick={randomizeStory}
                    >
                      <Dices className="size-4" />
                      Randomize
                    </Button>
                  }
                >
                  <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                    <FormField
                      control={form.control}
                      name="items"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <FormLabel>Starting Item</FormLabel>
                            <Badge variant="secondary" className="text-[10px]">
                              {availableData.items.length} items
                            </Badge>
                          </div>
                          <div className="grid max-h-[500px] gap-3 overflow-y-auto pr-2">
                            {availableData.items.map((item) => (
                              <OptionButton
                                key={item}
                                selected={field.value === item}
                                onClick={() => setField("items", item)}
                                className="min-h-20"
                              >
                                <div className="flex items-start gap-3 pr-6">
                                  <Box className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                                  <span className="text-sm leading-relaxed">
                                    {item}
                                  </span>
                                </div>
                              </OptionButton>
                            ))}
                          </div>
                          <FormMessage className="pt-3" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plot"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <FormLabel>Opening Hook</FormLabel>
                            <Badge variant="secondary" className="text-[10px]">
                              {availableData.stories.length} hooks
                            </Badge>
                          </div>
                          <div className="grid max-h-[500px] gap-3 overflow-y-auto pr-2 md:grid-cols-2">
                            {availableData.stories.map((story) => (
                              <OptionButton
                                key={story}
                                selected={field.value === story}
                                onClick={() => setField("plot", story)}
                                className="min-h-28"
                              >
                                <div className="flex items-start gap-3 pr-6">
                                  <ScrollText className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                                  <span className="text-sm leading-relaxed">
                                    {story}
                                  </span>
                                </div>
                              </OptionButton>
                            ))}
                          </div>
                          <FormMessage className="pt-3" />
                        </FormItem>
                      )}
                    />
                  </div>
                </StepPanel>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="launch" {...animation}>
                <StepPanel title="Ready the first chapter" kicker="Launch">
                  <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                      <DataCard
                        title="Hero"
                        subtitle="Identity"
                        fields={[
                          {
                            label: "Name",
                            value: values.name || "Not set",
                            highlight: true,
                          },
                          {
                            label: "Gender",
                            value: values.gender || "Not set",
                          },
                          {
                            label: "Archetype",
                            value: values.type || "Not set",
                          },
                        ]}
                      />

                      <DataCard
                        title="Story"
                        subtitle="Opening"
                        fields={[
                          {
                            label: "World",
                            value: selectedGenre?.label || "Not set",
                            highlight: true,
                          },
                          { label: "Item", value: values.items || "Not set" },
                          { label: "Hook", value: values.plot || "Not set" },
                        ]}
                      />
                    </div>

                    <Terminal
                      title="LAUNCH CHECK"
                      typewriter={false}
                      lines={[
                        {
                          type: "system",
                          text: "Validating mission parameters",
                        },
                        {
                          type: values.genre ? "output" : "error",
                          text: `World: ${selectedGenre?.label || "missing"}`,
                        },
                        {
                          type: values.name ? "output" : "error",
                          text: `Hero: ${values.name || "missing"}`,
                        },
                        {
                          type:
                            values.items && values.plot ? "output" : "error",
                          text: "Story seed: item and hook linked",
                        },
                        {
                          type: "input",
                          text: "Select Start Story to open the first scene",
                        },
                      ]}
                      className="min-h-64"
                    />
                  </div>
                </StepPanel>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto"
              >
                Continue
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Start Story
                <Rocket className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
