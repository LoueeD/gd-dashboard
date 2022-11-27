export interface ProjectScreen {
  route: string;
  title: string;
  icon?: string;
  active?: boolean;
  nested: ProjectScreen[];
}
