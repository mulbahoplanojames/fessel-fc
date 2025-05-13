import { Button } from "@/components/ui/button";
import prisma from "../../../../../prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PrismaPlayerType } from "@/types/players-type";

const SinglePlayerPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const player = (await prisma.player.findUnique({
    where: {
      id: id,
    },
  })) as PrismaPlayerType | null;

  if (!player) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">No Player found</h1>
        <Button asChild>
          <Link href="/players">Back to Players</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-8">
          <Button variant="ghost" className="group" asChild>
            <Link href="/players" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to News
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="relative w-full md:h-[400px] h-[300px] mb-8 rounded-xl overflow-hidden md:col-span-2 col-span-1 border-2">
            <Image
              src={player?.image || "/placeholder.svg"}
              alt={player?.name || "Player"}
              fill
              className="object-cover"
            />
          </div>

          <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">{player?.name}</h1>
            <div className="flex justify-between items-center gap-2">
              <p className="text-muted-foreground mb-4 text-lg">
                Position :&nbsp;
                <Badge className="md:text-base text-sm">
                  {player?.position}
                </Badge>
              </p>
              <p className="text-muted-foreground mb-4 text-lg">
                Number :&nbsp;
                <Badge className="md:text-base text-sm">{player?.number}</Badge>
              </p>
            </div>

            <h2 className="text-muted-foreground mb-4 text-lg">
              Player Statistics
            </h2>
            <div className="flex gap-4 flex-wrap mb-6">
              {player?.stats?.goals !== undefined &&
                player?.stats?.goals !== 0 && (
                  <Badge className="text-base">
                    {player?.stats?.goals}&nbsp;Goals
                  </Badge>
                )}
              {player?.stats?.assists !== undefined &&
                player?.stats?.assists !== 0 && (
                  <Badge className="text-base">
                    {player?.stats?.assists}&nbsp;Assists
                  </Badge>
                )}
              {player?.stats?.appearances !== undefined &&
                player?.stats?.appearances !== 0 && (
                  <Badge className="text-base">
                    {player?.stats?.appearances}&nbsp;Appearances
                  </Badge>
                )}
              {player?.stats?.cleanSheets !== undefined &&
                player?.stats?.cleanSheets !== 0 && (
                  <Badge className="text-base">
                    {player?.stats?.cleanSheets}&nbsp;Clean Sheets
                  </Badge>
                )}
              {player?.stats?.saves !== undefined &&
                player?.stats?.saves !== 0 && (
                  <Badge className="text-base">
                    {player?.stats?.saves}&nbsp;Saves
                  </Badge>
                )}
            </div>
          </div>
        </div>

        {player?.playerbio.map((bio) => (
          <p className="text-muted-foreground mb-4" key={bio?.id}>
            {bio.label}
          </p>
        ))}
      </div>
    </>
  );
};

export default SinglePlayerPage;
