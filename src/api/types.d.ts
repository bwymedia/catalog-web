type ApiResource = {
  id: string;
  type: string;
};

type Drop = ApiResource & {
  name: string;
  previewVideo?: string;
  thumbnail?: string;
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

type ChoreoGuide = ApiResource & {
  slug: string;
  choreographer?: string;
  producer?: string;
  otherCredits?: string;
  marketingDescription?: string;
  marketingImage?: string;
  songs: ChoreoSong[];
  hasAccess: boolean;
  show?: Show;
};

type ChoreoSong = {
  id: number;
  name: string;
  description: string;
  previewVideo: string | false;
  previewThumbnail: string | false;
  videos: ChoreoVideo[];
};

type ChoreoVideo = {
  id: number;
  name: string;
  description: string;
  videoThumbnail?: string;
  videoFile?: string;
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
