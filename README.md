# casl-prisma-generator

casl-prisma-generator generates CASL subjects from schema.prisma file

## Installation

```bash
  npm install casl-prisma-generator
 # or
  yarn add casl-prisma-generator
 # or
  pnpm add casl-prisma-generator
```

## Usage Example

In `package.json` add:

```json
"casl-generate": "npx ts-node ./src/casl/generator.ts",
"prisma:generate": "prisma generate && npm run casl-generate",
```

#### Asuming we have this `schema.prisma` file:

```prisma
enum UserType {
  ADMIN
  USER
}

model User {
    id        String   @id @default(uuid())
    type      UserType @default(USER)
    password  String
}

model Post {
    id      String @id @default(uuid())
    content String @db.VarChar(2048)
}

model Item {
    id String @id @default(uuid())
}

model Subject {
    id String @id @default(uuid())
}
```

### Example1 `src/casl/generator.ts`

```ts
import { generateCaslSubjectsToFile } from 'casl-prisma-generator';
//OR: import { generateCaslSubjectsToFile } from 'casl-prisma-generator/dist';

generateCaslSubjectsToFile('src/casl/generated/subjectsList.ts');
```

The result will be: `src/casl/generated/subjectsList.ts`:

```ts
/** this file is auto generated, don't touch it **/

import { User, Post, Item, Subject } from '@prisma/client';

export type SubjectsList = {
  User: User;
  Post: Post;
  Item: Item;
  Subject: Subject;
};
```

### Example2 `src/casl/generator.ts`

```ts
import {
  generateCaslSubjectsToFile,
  OverrideSubjects,
} from 'casl-prisma-generator';

const overrides: OverrideSubjects = {
  User: {
    typeName: 'JwtUser',
    importPath: "import { JwtUser } from 'src/auth/types-auth';",
  },
  Post: null,
};
generateCaslSubjectsToFile('src/casl/generated/subjectsList.ts', overrides, {
  prismaSchemaPath: 'prisma/schema.prisma',
  prismaClientPath: '@prisma/client',
});
```

The result will be: `src/casl/generated/subjectsList.ts`:

```ts
/** this file is auto generated, don't touch it **/

import { Item, Subject } from '@prisma/client';
import { JwtUser } from 'src/auth/types-auth';

export type SubjectsList = {
  User: JwtUser;
  Item: Item;
  Subject: Subject;
};
```

Notice: `User: JwtUser;` and we removed `Post: Post;`

## Then in our CASL setup: `src/casl/casl-ability.factory.ts`

```ts
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Subjects } from '@casl/prisma';
import { PrismaQuery, createPrismaAbility } from '@casl/prisma';
import { JwtUser } from 'src/auth/types-auth';

import { SubjectsList } from 'src/casl/generated/subjectsList';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type AppAbility = PureAbility<
  [Action, Subjects<SubjectsList> | 'all'],
  PrismaQuery
>;

export function createForUser(user: JwtUser) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility,
  );

  if (user.type === 'ADMIN') {
    can('manage', 'all'); // read-write access to everything
  } else {
    can('manage', 'User', { id: user.id });
  }

  return build();
}
```

# Working Project:

[nest-prisma-casl-starter](https://github.com/moh1434/nest-prisma-casl-starter): this project implements CASL and Prisma with [NestJs](https://docs.nestjs.com/)
