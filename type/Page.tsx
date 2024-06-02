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
  mid: number;
  cid: number[];
  target: string;
  text: string;
  image: string;
  id: string;
  initialPosition: { x: number; y: number };
  frame: string;
};

export type PageConfig = {
  framework: any;
  mode: number;
  user_image: any;
  image: string;
  missions: Mission[];
};

export type Book = {
  bid: number;
  title: string;
  coverImage: string;
  pages: { modes: { id: number; image: string; }[]; }[];
  page_config: PageConfig[];
};
