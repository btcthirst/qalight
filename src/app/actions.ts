"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  apparatRepo,
  dealRepo,
  dealTypeRepo,
  installationRepo,
  providersRepo,
  serviceRepo,
  spareOperationRepo,
  sparesRepo,
  spareTypeRepo,
  usersRepo,
  workersRepo,
} from "@/lib/db";
import { formatDateParts } from "@/lib/format";
import { createSession, getSession } from "@/lib/session";

function text(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function truthy(formData: FormData, name: string): boolean {
  return formData.get(name) !== null;
}

async function destroyAndRedirect(repo: { remove(id: number): Promise<boolean> }, id: string, to: string) {
  await repo.remove(Number(id));
  revalidatePath(to);
  redirect(to);
}

export async function saveEntity(formData: FormData): Promise<void> {
  const entity = text(formData, "_entity");
  const id = text(formData, "_id");
  const redirectTo = text(formData, "_redirect") || "/";
  const deleting = formData.get("delete") !== null;

  if (deleting && id) {
    switch (entity) {
      case "apparat":
        await destroyAndRedirect(apparatRepo, id, redirectTo);
        break;
      case "workers":
        await destroyAndRedirect(workersRepo, id, redirectTo);
        break;
      case "spareType":
        await destroyAndRedirect(spareTypeRepo, id, redirectTo);
        break;
      case "spares":
        await destroyAndRedirect(sparesRepo, id, redirectTo);
        break;
      case "prov_cus":
        await destroyAndRedirect(providersRepo, id, redirectTo);
        break;
      case "deal_type":
        await destroyAndRedirect(dealTypeRepo, id, redirectTo);
        break;
      case "service":
        await destroyAndRedirect(serviceRepo, id, redirectTo);
        break;
      case "installation":
        await destroyAndRedirect(installationRepo, id, redirectTo);
        break;
      case "deal":
        await destroyAndRedirect(dealRepo, id, redirectTo);
        break;
      case "spare_operation":
        await destroyAndRedirect(spareOperationRepo, id, redirectTo);
        break;
      case "userProfileEdit": {
        await usersRepo.remove(Number(id));
        const session = await getSession();
        const target = session?.id === Number(id) ? "/logout" : redirectTo;
        revalidatePath(redirectTo);
        redirect(target);
        break;
      }
      default:
        break;
    }
    return;
  }

  const numericId = id ? Number(id) : undefined;

  switch (entity) {
    case "apparat": {
      const data = {
        number: text(formData, "apparat[apparatNumber]"),
        comment: text(formData, "apparat[apparatComment]"),
      };
      if (numericId) await apparatRepo.update(numericId, data);
      else await apparatRepo.create(data);
      break;
    }
    case "workers": {
      const data = {
        surname: text(formData, "workers[workerSurname]"),
        name: text(formData, "workers[workerName]"),
        middleName: text(formData, "workers[workerMiddleName]"),
        phone: text(formData, "workers[workerPhone]"),
      };
      if (numericId) await workersRepo.update(numericId, data);
      else await workersRepo.create(data);
      break;
    }
    case "spareType": {
      const data = { name: text(formData, "spareType[spareTypeName]") };
      if (numericId) await spareTypeRepo.update(numericId, data);
      else await spareTypeRepo.create(data);
      break;
    }
    case "spares": {
      const data = {
        name: text(formData, "spares[spareName]"),
        typeId: text(formData, "spares[spareType]"),
      };
      if (numericId) await sparesRepo.update(numericId, data);
      else await sparesRepo.create(data);
      break;
    }
    case "prov_cus": {
      const data = {
        name: text(formData, "prov_cus[proCustName]"),
        address: text(formData, "prov_cus[proCustAddress]"),
        phone: text(formData, "prov_cus[proCustPhone]"),
        isFl: truthy(formData, "prov_cus[proCustIsFl]"),
        isOurFirm: truthy(formData, "prov_cus[isOurFirm]"),
      };
      if (numericId) await providersRepo.update(numericId, data);
      else await providersRepo.create(data);
      break;
    }
    case "deal_type": {
      const data = { name: text(formData, "deal_type[dealTypeName]") };
      if (numericId) await dealTypeRepo.update(numericId, data);
      else await dealTypeRepo.create(data);
      break;
    }
    case "service": {
      const data = {
        apparatNumber: text(formData, "service[apparatNumber]"),
        changes: text(formData, "service[changes]"),
        operations: text(formData, "service[operations]"),
        worker: text(formData, "service[worker]"),
        date: formatDateParts({
          day: text(formData, "service[date][date][day]"),
          month: text(formData, "service[date][date][month]"),
          year: text(formData, "service[date][date][year]"),
          hour: text(formData, "service[date][time][hour]"),
          minute: text(formData, "service[date][time][minute]"),
        }),
      };
      if (numericId) await serviceRepo.update(numericId, data);
      else await serviceRepo.create(data);
      break;
    }
    case "installation": {
      const data = {
        apparatNumber: text(formData, "installation[apparatNumber]"),
        spare: text(formData, "installation[spare]"),
        worker: text(formData, "installation[worker]"),
        date: formatDateParts({
          day: text(formData, "installation[date][date][day]"),
          month: text(formData, "installation[date][date][month]"),
          year: text(formData, "installation[date][date][year]"),
          hour: text(formData, "installation[date][time][hour]"),
          minute: text(formData, "installation[date][time][minute]"),
        }),
      };
      if (numericId) await installationRepo.update(numericId, data);
      else await installationRepo.create(data);
      break;
    }
    case "deal": {
      const data = {
        day: text(formData, "deal[dealDate][date][day]"),
        month: text(formData, "deal[dealDate][date][month]"),
        year: text(formData, "deal[dealDate][date][year]"),
        hour: text(formData, "deal[dealDate][time][hour]"),
        minute: text(formData, "deal[dealDate][time][minute]"),
        typeId: text(formData, "deal[dealType]"),
        customerId: text(formData, "deal[customer]"),
        providerId: text(formData, "deal[provider]"),
      };
      if (numericId) await dealRepo.update(numericId, data);
      else await dealRepo.create(data);
      break;
    }
    case "spare_operation": {
      const data = {
        count: text(formData, "spare_operation[spareCount]"),
        dealId: text(formData, "spare_operation[deal]"),
        spareId: text(formData, "spare_operation[spare]"),
      };
      if (numericId) await spareOperationRepo.update(numericId, data);
      else await spareOperationRepo.create(data);
      break;
    }
    case "userProfileEdit": {
      const current = numericId ? await usersRepo.get(numericId) : undefined;
      const password = text(formData, "userProfileEdit[user][password][password]");
      const data = {
        name: text(formData, "userProfileEdit[user][name]"),
        email: text(formData, "userProfileEdit[user][email]"),
        username: text(formData, "userProfileEdit[user][username]"),
        password: password || current?.password || "",
      };
      if (numericId) {
        const updated = await usersRepo.update(numericId, data);
        const session = await getSession();
        if (updated && session?.id === updated.id) {
          await createSession({
            id: updated.id,
            name: updated.name,
            username: updated.username,
            email: updated.email,
            registeredAt: updated.createdAt,
          });
        }
      } else {
        await usersRepo.create({
          ...data,
          createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
          status: "1",
          comment: "",
        });
      }
      break;
    }
    default:
      break;
  }

  revalidatePath(redirectTo);
  redirect(redirectTo);
}
