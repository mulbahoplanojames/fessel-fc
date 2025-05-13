import React from "react";
import { Button } from "../ui/button";
import { Filter, Search, X } from "lucide-react";
import { Input } from "../ui/input";

interface PlayersHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const PlayersHeader: React.FC<PlayersHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  clearSearch,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            First Team Squad
          </h2>
          <p className="text-muted-foreground">
            The stars who represent Fassel FC on the pitch
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              className="pl-10 pr-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlayersHeader;
