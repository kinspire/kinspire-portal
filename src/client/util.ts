// custom interfaces

export interface LinkPair {
  link: string;
  name: string;
  subtitle?: string;
}

export interface ListItem {
  title: string;
  subtitle: string;
  links: LinkPair[];
}