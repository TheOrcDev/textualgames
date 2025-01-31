import { dystopianCharacters, dystopianItems, dystopianPlots, fantasyCharacters, fantasyItems, fantasyPlots, femaleNames, genres, maleNames, sciFiCharacters, sciFiItems, sciFiPlots } from "@/components/shared/data";
import { Genre } from "@/components/shared/types";

export async function getRandomCharacter() {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const randomGender = Math.random() < 0.5 ? "male" : "female";

    const randomName =
        randomGender === "male"
            ? maleNames[Math.floor(Math.random() * maleNames.length)]
            : femaleNames[Math.floor(Math.random() * femaleNames.length)];

    let randomType = "";
    let randomItem = "";
    let randomPlot = "";

    if (randomGenre.name === Genre.FANTASY) {
        randomType = fantasyCharacters[Math.floor(Math.random() * fantasyCharacters.length)];
        randomItem = fantasyItems[Math.floor(Math.random() * fantasyItems.length)];
        randomPlot = fantasyPlots[Math.floor(Math.random() * fantasyPlots.length)];
    }

    if (randomGenre.name === Genre.SCIFI) {
        randomType = sciFiCharacters[Math.floor(Math.random() * sciFiCharacters.length)];
        randomItem = sciFiItems[Math.floor(Math.random() * sciFiItems.length)];
        randomPlot = sciFiPlots[Math.floor(Math.random() * sciFiPlots.length)];
    }

    if (randomGenre.name === Genre.DYSTOPIAN) {
        randomType = dystopianCharacters[Math.floor(Math.random() * dystopianCharacters.length)];
        randomItem = dystopianItems[Math.floor(Math.random() * dystopianItems.length)];
        randomPlot = dystopianPlots[Math.floor(Math.random() * dystopianPlots.length)];
    }

    return {
        genre: randomGenre.name,
        gender: randomGender,
        name: randomName,
        type: randomType,
        item: randomItem,
        plot: randomPlot
    }
}