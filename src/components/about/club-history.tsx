import { Calendar, Trophy, Users } from "lucide-react";
import { StatsCard } from "../stats-card";
import Image from "next/image";

const ClubHistory = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            From humble beginnings to becoming one of Liberia&apos;s premier
            football clubs
          </p>
        </div>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/about-images/img1.jpg"
                  alt="Club Founding"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">2010: The Beginning</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                FC Fassell was founded in 2010 by a group of passionate football
                enthusiasts led by John Smith, with the vision of creating a
                club that would develop local talent and compete at the highest
                level of Liberian football. Starting in the second division, the
                club quickly established itself as a force to be reckoned with.
              </p>
              <p className="text-muted-foreground">
                The club&apos;s name &apos;Fassell&apos; was chosen to honor the
                rich cultural heritage of Liberia, representing strength, unity,
                and perseverance - values that would become the foundation of
                the club&apos;s identity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 md:order-1 order-2">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  2013: First Major Trophy
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                After just three years of existence, FC Fassell claimed its
                first major silverware by winning the Liberian Cup in a
                thrilling final against traditional powerhouse LISCR FC. This
                victory marked the club&apos;s arrival on the big stage and
                earned them their first qualification for continental
                competition.
              </p>
              <p className="text-muted-foreground">
                The cup victory was a testament to the club&apos;s rapid
                development and the effectiveness of its youth-focused
                recruitment strategy, with several academy graduates playing key
                roles in the triumph.
              </p>
            </div>
            <div className="md:col-span-2 md:order-2 order-1">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/about-images/img3.jpg"
                  alt="First Trophy"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/about-images/img2.jpg"
                  alt="League Champions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  2017: League Champions
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                The 2017 season saw FC Fassell claim their first Liberian
                Premier League title, going unbeaten for the entire season - a
                remarkable achievement that cemented the club&apos;s status as
                one of the country&apos;s football powerhouses. The team&apos;s
                attacking style of play captivated fans across Liberia.
              </p>
              <p className="text-muted-foreground">
                This championship victory was particularly sweet as it came
                after two consecutive second-place finishes, demonstrating the
                club&apos;s resilience and determination to reach the summit of
                Liberian football.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 md:order-1 order-2">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">2020: Community Focus</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                In 2020, FC Fassell launched its comprehensive community
                program, focusing on using football as a tool for social
                development. The initiative includes youth coaching programs,
                educational support for young players, and various community
                outreach activities.
              </p>
              <p className="text-muted-foreground">
                This commitment to community development has strengthened the
                bond between the club and its supporters, creating a sense of
                belonging and pride that extends beyond match days.
              </p>
            </div>
            <div className="md:col-span-2 md:order-2 order-1">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/about-images/img5.jpg"
                  alt="Community Program"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/about-images/img4.jpg"
                  alt="Present Day"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  Present Day: Looking to the Future
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Today, FC Fassell continues to build on its strong foundation,
                with a focus on sustainable growth, youth development, and
                competitive success. The club has won a total of 8 major
                trophies and has represented Liberia in continental competitions
                multiple times.
              </p>
              <p className="text-muted-foreground">
                With a state-of-the-art training facility, a thriving academy
                system, and a passionate fan base, FC Fassell is well-positioned
                to continue its journey as one of West Africa&apos;s most
                progressive football clubs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
          Major Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatsCard
            icon={<Trophy className="h-10 w-10 text-primary" />}
            value="7"
            label="Liberia Premier League Titles"
          />
          <StatsCard
            icon={<Trophy className="h-10 w-10 text-primary" />}
            value="5"
            label="Orange Cup Victories"
          />
          <StatsCard
            icon={<Trophy className="h-10 w-10 text-primary" />}
            value="2"
            label="CECAFA Club Cup"
          />
          <StatsCard
            icon={<Users className="h-10 w-10 text-primary" />}
            value="6"
            label="National Team Players"
          />
        </div>
      </div>
    </>
  );
};

export default ClubHistory;
