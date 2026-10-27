import fs from "node:fs";
import path from "node:path";

import apparatSeed from "@/data/apparat.json";
import dealSeed from "@/data/deal.json";
import dealTypeSeed from "@/data/dealType.json";
import providersSeed from "@/data/providers.json";
import serviceSeed from "@/data/service.json";
import spareOperationSeed from "@/data/spareOperation.json";
import sparesSeed from "@/data/spares.json";
import spareTypeSeed from "@/data/spareType.json";
import usersSeed from "@/data/users.json";
import workersSeed from "@/data/workers.json";

import type {
  Apparat,
  Deal,
  DealType,
  InstallationRecord,
  Provider,
  ServiceRecord,
  Spare,
  SpareOperation,
  SpareType,
  User,
  Worker,
} from "./types";

/**
 * Seed data is bundled with the app. `DATA_STORE=file` keeps mutations in
 * `.data/state.json` (useful while developing locally); `memory` keeps them
 * in the process only (default on Vercel, where the filesystem is read-only).
 *
 * Every entity is exposed through a repository, so the whole app can be moved
 * to a real database (Prisma/Postgres) by re-implementing the repositories
 * only - pages and components stay untouched.
 */
export interface Repository<T extends { id: number }> {
  list(): Promise<T[]>;
  get(id: number): Promise<T | undefined>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: number, data: Partial<Omit<T, "id">>): Promise<T | undefined>;
  remove(id: number): Promise<boolean>;
}

export interface Database {
  apparat: Apparat[];
  workers: Worker[];
  spareType: SpareType[];
  spares: Spare[];
  providers: Provider[];
  dealType: DealType[];
  service: ServiceRecord[];
  installation: InstallationRecord[];
  deal: Deal[];
  spareOperation: SpareOperation[];
  users: User[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "state.json");

function seedState(): Database {
  return {
    apparat: structuredClone(apparatSeed) as Apparat[],
    workers: structuredClone(workersSeed) as Worker[],
    spareType: structuredClone(spareTypeSeed) as SpareType[],
    spares: structuredClone(sparesSeed) as Spare[],
    providers: structuredClone(providersSeed) as Provider[],
    dealType: structuredClone(dealTypeSeed) as DealType[],
    service: structuredClone(serviceSeed) as ServiceRecord[],
    installation: [],
    deal: structuredClone(dealSeed) as Deal[],
    spareOperation: structuredClone(spareOperationSeed) as SpareOperation[],
    users: structuredClone(usersSeed) as User[],
  };
}

function readStateFromDisk(): Database | null {
  if (process.env.DATA_STORE !== "file") return null;
  try {
    if (!fs.existsSync(DATA_FILE)) return null;
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Database;
    return { ...seedState(), ...parsed };
  } catch {
    return null;
  }
}

function writeStateToDisk(state: Database): void {
  if (process.env.DATA_STORE !== "file") return;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch {
    /* the store is optional - never break the request because of it */
  }
}

const globalStore = globalThis as unknown as { __qalightDb?: Database };

export function getDb(): Database {
  if (!globalStore.__qalightDb) {
    globalStore.__qalightDb = readStateFromDisk() ?? seedState();
  }
  return globalStore.__qalightDb;
}

function persist(): void {
  writeStateToDisk(getDb());
}

function nextId(rows: { id: number }[]): number {
  return rows.reduce((max, row) => (row.id > max ? row.id : max), 0) + 1;
}

function createRepository<T extends { id: number }>(key: keyof Database): Repository<T> {
  const rows = () => getDb()[key] as unknown as T[];

  return {
    async list() {
      return rows();
    },
    async get(id: number) {
      return rows().find((item) => item.id === id);
    },
    async create(data) {
      const row = { ...(data as object), id: nextId(rows()) } as T;
      rows().push(row);
      persist();
      return row;
    },
    async update(id: number, data) {
      const list = rows();
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) return undefined;
      const row = { ...list[index], ...(data as object), id } as T;
      list[index] = row;
      persist();
      return row;
    },
    async remove(id: number) {
      const list = rows();
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) return false;
      list.splice(index, 1);
      persist();
      return true;
    },
  };
}

export const apparatRepo = createRepository<Apparat>("apparat");
export const workersRepo = createRepository<Worker>("workers");
export const spareTypeRepo = createRepository<SpareType>("spareType");
export const sparesRepo = createRepository<Spare>("spares");
export const providersRepo = createRepository<Provider>("providers");
export const dealTypeRepo = createRepository<DealType>("dealType");
export const serviceRepo = createRepository<ServiceRecord>("service");
export const installationRepo = createRepository<InstallationRecord>("installation");
export const dealRepo = createRepository<Deal>("deal");
export const spareOperationRepo = createRepository<SpareOperation>("spareOperation");
export const usersRepo = createRepository<User>("users");
