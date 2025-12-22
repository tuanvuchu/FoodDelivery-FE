type Child = {
  id: string;
  blog_id: string;
  user_id: string;
  users: User;
  content: string;
  parent_id: string;
  created_at: string;
};

type User = {
  name: string;
  image: string;
};

export type Comment = {
  id: string;
  blog_id: string;
  user_id: string;
  users: User;
  content: string;
  parent_id: string | null;
  created_at: string;
  other_comments: Child[];
};
