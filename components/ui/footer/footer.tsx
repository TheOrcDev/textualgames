export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-5 flex w-full items-center justify-between px-5">
      <h2 className="border-l-2 border-black bg-gray-200 px-2 text-xs dark:bg-gray-800 md:text-sm">
        Textual Games © {year}
      </h2>
    </footer>
  );
}
