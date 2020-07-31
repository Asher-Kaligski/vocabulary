export interface CommentReply {
  _id: string;
  isApproved: boolean;
  content: string;
  createAt: Date;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
