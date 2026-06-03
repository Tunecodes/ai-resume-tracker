// lib/types.ts

export type Resume = {
  id: string;
  file_name: string;

  parsed_json: {
    name?: string;
    skills?: string[];
    education?: {
      school: string;
      degree?: string;
    }[];
    projects?: {
      name: string;
      description?: string;
    }[];
  };
};
