interface DeserializedApiResource {
  id: string;
  type: string;
}

type Drop = DeserializedApiResource & {
  name: string;
  links: {
    previewVideo?: string;
  };
};

type Theme = DeserializedApiResource & {
  name: string;
};

interface DeserializedApiDocument<T> {
  data: T;
  links: {
    first?: string;
    next?: string;
    prev: string;
    last?: string;
  };
}
