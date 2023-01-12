# 🤔 What is Ponder?

Ponder aim to Be A FSM-based programming Framework

## 🚀 Quick Start

## 🥸 Why Use Ponder?

✅ Focus on state
✅ Logic is easy to reuse
✅ Scalability

## 📓 A Confirm Manager

```mermaid
sequenceDiagram
    loop Every MSG
        MSG Queue(snap up) ->> Confirm Manager: Consume messsage
    end

    loop Every MSG
        MSG Queue(result) ->> API Gate: Consume message
    end

    API Gate ->> MSG Queue(snap up): Order messsage

    Confirm Manager ->> Cache: cache query (custom logic)
    Confirm Manager ->> MSG Queue(result): Faild or Success (custom logic)
```

### How Confirm Manager Work

The following diagram defines how the Confirm Manager works.

When a message is received, the Confirm Manager performs the query action.

If it is already locked, send a confirmation failure message.

If not locked, lock it and send a success message.

```mermaid
stateDiagram-v2
    [*] --> cache_query
    cache_query --> send_faild_msg : locked
    cache_query --> update_cache : not locked
    update_cache --> send_success_msg

    send_faild_msg --> [*]
    send_success_msg  --> [*]
```

### Confirm Manager's State

Using ponder define the Confirm Manager.

- First define all states.

  > Start , not_locked, locked, cache_updated, message_sent

- Then define the transitions.

  > query_cache_transition, update_cache_transition, send_message_transition,

```mermaid
stateDiagram-v2
    [*] --> not_locked: query_cache_transition
    [*] --> locked: query_cache_transition
    not_locked --> cache_updated: update_cache_transition
    cache_updated --> message_sent: send_message_transition
    locked --> message_sent
    message_sent --> [*]
```

---

## 🔑 How Ponder Work?

![Alt text](./docs/schema.excalidraw.png)

### Schema

A collection that stores state machine data

```ts
export interface ISchema {
  states: Record<string, IState>;
  transitions: Record<string, ITransition>;
  actions: Record<string, IAction>;
}
```

### State

Defines the state, including transitions

```ts
export interface IState {
  id: string;
  name: string;
  transitions: string[];
}
```

### Transition

Describes how to get from one state to the next.

```ts
export interface ITransition {
  id: string;
  from: string;
  faild: string;
  success: string;
  action: string;
}
```

### Action

Defines scripts that need to be executed during a transformation

```ts
export interface IAction {
  id: string;
  url?: string;
  content?: string;
}
```
