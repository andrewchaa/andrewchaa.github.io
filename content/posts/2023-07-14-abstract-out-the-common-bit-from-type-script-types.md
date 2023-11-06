---
title: Abstract out the common bit from TypeScript types
date: 2023-07-14
tags:
  - typescript
  - javascript
---

I often encounter situations in my TypeScript projects where I define similar looking types that share most of their structure but have slight differences. The duplication has been a dilemma for me, as I question whether I am tightly coupling types simply because they appear similar. While the issue remains unresolved, I have discovered a better approach to abstracting the common aspects. It’s using [`Omit<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html)[ utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html)


```typescript
// before
export type Note = Identifiers<NoteType> & {
  noteFor?: Identifiers<RecordType.ServiceUser>;
  createdAt?: Iso8601String;
  createdBy?: Identifiers<RecordType.Worker> | Worker;
  action?: RecordWithType<NoteAction> & {
    description?: string;
    reviewedAt?: string;
    reviewedBy?: Identifiers<RecordType.Worker> | Worker;
    /** This is only optional or undefined for compatibility with reduce_triage_volume turned off. This should be required once that
     * feature flag is removed.
     */
    reviewOutcome?: string;
    reasonForReview?: string;
  };
  description?: string;
  incident?: string;
  agreedAction?: string;
  safeguardings?: Identifiers<RecordType.Safeguarding>[];
};

export type UpdateNotePayload = WithType<NoteType> & {
  action?: RecordWithType<NoteAction> & {
    description?: string;
    reviewedAt?: string;
    reviewedBy?: Identifiers<RecordType.Worker> | Worker;
    /** This is only optional or undefined for compatibility with reduce_triage_volume turned off. This should be required once that
     * feature flag is removed.
     */
    reviewOutcome?: string;
    reasonForReview?: string;
  };
  description?: string;
  incident?: string;
  agreedAction?: string;
  safeguardings?: Identifiers<RecordType.Safeguarding>[];
}

export type CreateNotePayload = WithType<NoteType> & {
  noteFor?: Identifiers<RecordType.ServiceUser>;
  createdBy?: Identifiers<RecordType.Worker> | Worker;
  action?: RecordWithType<NoteAction> & {
    description?: string;
    reviewedAt?: string;
    reviewedBy?: Identifiers<RecordType.Worker> | Worker;
    /** This is only optional or undefined for compatibility with reduce_triage_volume turned off. This should be required once that
     * feature flag is removed.
     */
    reviewOutcome?: string;
    reasonForReview?: string;
  };
  description?: string;
  incident?: string;
  agreedAction?: string;
  safeguardings?: Identifiers<RecordType.Safeguarding>[];
}
```


```typescript
// after
export type Note = Identifiers<NoteType> & {
  noteFor?: Identifiers<RecordType.ServiceUser>;
  createdAt?: Iso8601String;
  createdBy?: Identifiers<RecordType.Worker> | Worker;
  action?: RecordWithType<NoteAction> & {
    description?: string;
    reviewedAt?: string;
    reviewedBy?: Identifiers<RecordType.Worker> | Worker;
    /** This is only optional or undefined for compatibility with reduce_triage_volume turned off. This should be required once that
     * feature flag is removed.
     */
    reviewOutcome?: string;
    reasonForReview?: string;
  };
  description?: string;
  incident?: string;
  agreedAction?: string;
  safeguardings?: Identifiers<RecordType.Safeguarding>[];
};

export type UpdateNotePayload = Omit<Note, 'noteFor' | 'createdAt' | 'createdBy' | '@id'>;
export type CreateNotePayload = Omit<Note, 'createdAt' | '@id'>;
```


By utilising the `Omit<T>` type, I’m able to exclude specific properties from the origin `Note` type, resulting in more concise and reusable `UpdateNotePayload` and `CreateNotePayload` types.


