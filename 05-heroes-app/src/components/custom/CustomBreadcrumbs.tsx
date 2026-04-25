import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

interface Props {
  steps: Array<{ label: string; url: string }>;
}

export const CustomBreadcrumbs = ({ steps }: Props) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {steps.map(({ label, url }, index) => {
          if (index !== steps.length - 1) {
            return (
              <div className="flex items-center" key={index}>
                <BreadcrumbItem>
                  <Link
                    to={url}
                    className="transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="ml-3" />
              </div>
            );
          } else {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
