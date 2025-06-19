import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UserInfo() {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/my-games"}>My Games</Link>

      <Button variant={"outline"}>ffff</Button>
    </div>
  );
}
