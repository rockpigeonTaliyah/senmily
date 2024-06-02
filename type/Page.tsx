export type Page = {
  framework: null | string;
  mode: null | string;
  user_image: null | string;
  image: null | string;
  missions: object[];
};
export type Mode = {
  id: number;
  image: string;
};
export type Mission = {
  id: string;
  target:string;
  initialPosition?: { x: number; y: number };
  frame: string;
  text: string;
};

export type PageConfig = {
  framework: string | null;
  mode: number | null;
  user_image: string | null;
  image: string;
  missions: Mission[];
};

export type Book = {
  bid: number | null;
  title: string;
  coverImage: string;
  pages: Page[];
  page_config: PageConfig[];
};
