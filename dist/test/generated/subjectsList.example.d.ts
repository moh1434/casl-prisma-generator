import { Post, Item, Subject } from '@prisma/client';
import { JwtUser } from 'test/auth-types';
export type SubjectsList = {
    User: JwtUser;
    Post: Post;
    Item: Item;
    Subject: Subject;
};
