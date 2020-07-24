export interface Comment {
  _id: string;
  commentId: number;
  letterName: string;
  isApproved: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
