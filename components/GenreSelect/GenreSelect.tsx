import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";

export interface GenreSelectProps {
  getData: (genre: string) => void;
}

const genres = [
  "Fantasy",
  "Adventure",
  "Comedy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
];

export const GenreSelect: React.FC<GenreSelectProps> = ({ getData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-4 sm:mx-10 md:mx-32">
      {genres.map((genre: string, index: number) => (
        <div className="flex items-center" key={index}>
          <ButtonBadge
            content={genre}
            onClick={() => getData(genre)}
            color="bg-slate-400"
          />
        </div>
      ))}
    </div>
  );
};

export default GenreSelect;
