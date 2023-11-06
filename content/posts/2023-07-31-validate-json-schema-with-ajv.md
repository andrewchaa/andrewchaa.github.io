---
title: Validate JSON schema with Ajv

date: 2023-07-31
tags:
  - javascript
  - typescript
  - JSON
---

WIP


### anyOf


`outcome` becomes `required` when the incoming `@type` is either Admin or Safeguarding


```bash
export const updateNoteSchema = {
  type: 'object',
  properties: {
    '@type': {
      type: 'string',
      enum: [NoteType.Admin, NoteType.Safeguarding],
    },
    action: {
      type: 'object',
      properties: {
        description: { type: 'string', minLength: 1 },
        reviewedAt: { type: 'string', minLengh: 1 },
        reviewedBy: {
          type: 'object',
          properties: {
            '@type': { type: 'string', enum: ['user'] },
            '@id': { type: 'string', format: 'uuid' },
          },
          required: ['@type', '@id'],
        },
      },
      dependentSchemas: {
        reasonForReview: { required: ['@type'] },
      },
      required: ['description', 'reviewedAt', 'reviewedBy'],
    },
  },
  anyOf: [
    {
      properties: {
        '@type': { enum: [NoteType.Admin, NoteType.Safeguarding] },
      },
      required: ['outcome'],
    },
  ],
};
```


