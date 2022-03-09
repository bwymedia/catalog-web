type ApiResource = {
  id: string;
  type: string;
};

type Drop = ApiResource & {
  name: string;
  previewVideo?: string;
};

type Tag = ApiResource & {
  name: string;
};

type Package = ApiResource & {
  name: string;
  show: Show;
  curtainWarmerPreview: string;
  scenes: Scene[];
};

type Show = ApiResource & {
  title: string;
  packages?: Package[];
};

type Scene = ApiResource & {
  name: string;
  actOrder: number;
  sceneOrder: number;
  links: {
    previewVideo?: string;
  };
};

type PageLinks = {
  first?: string;
  next?: string;
  prev?: string;
  last?: string;
};

interface ApiDocument<T> {
  data: T;
  links: PageLinks;
}

type ApiParams = Record<string, string>;

type ApiKey = {
  path: string;
  params?: ApiParams;
};
