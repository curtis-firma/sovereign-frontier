import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, TableHTMLAttributes } from "react";

function MdxLink({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function MdxTable(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrap">
      <table {...props} />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  table: MdxTable,
};
