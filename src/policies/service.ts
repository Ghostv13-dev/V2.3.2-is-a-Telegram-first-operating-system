// src/policies/service.ts
import { PolicyBase } from "./base.ts";

export class CustomerServicePolicy extends PolicyBase {
  max_open_tickets_per_user = 5;
  init(cfg?: { max_open_tickets_per_user?: number }) {
    if (cfg?.max_open_tickets_per_user)
      this.max_open_tickets_per_user = cfg.max_open_tickets_per_user;
  }
}
