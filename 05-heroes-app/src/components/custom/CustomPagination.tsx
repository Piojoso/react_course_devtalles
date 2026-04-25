import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const page = 2 as number;

  return (
    <>
      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" size="sm" disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={page === index + 1 ? "default" : "ghost"}
            size="sm"
          >
            {index + 1}
          </Button>
        ))}

        {/* <Button variant="outline" size="sm">
          2
        </Button> */}
        {/* <Button variant="ghost" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button> */}

        <Button disabled={page === totalPages} variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
