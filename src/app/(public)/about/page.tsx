import AboutHero from "@/components/about/about-hero";
import ClubContact from "@/components/about/club-contact";
import ClubHistory from "@/components/about/club-history";
import ClubInfo from "@/components/about/club-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <div className="container px-4 py-12 mx-auto">
        <Tabs defaultValue="club" className="w-full">
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="club">The Club</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="club">
            <ClubInfo />
          </TabsContent>
          <TabsContent value="history">
            <ClubHistory />
          </TabsContent>
          <TabsContent value="contact">
            <ClubContact />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AboutPage;
