import { notFound } from "next/navigation";

import { DealForm } from "@/components/forms/DealForm";
import { dealRepo, dealTypeRepo, providersRepo, spareOperationRepo, sparesRepo } from "@/lib/db";
import { dealTypeName, findById, formatDealDate, spareName } from "@/lib/format";
import { requireUser } from "@/lib/require-user";
import type { Deal } from "@/lib/types";

export default async function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const [types, providers, deals, spares, spareOperations] = await Promise.all([
    dealTypeRepo.list(),
    providersRepo.list(),
    dealRepo.list(),
    sparesRepo.list(),
    spareOperationRepo.list(),
  ]);

  const record = (await dealRepo.get(Number(id))) as Deal | undefined;
  if (!record) notFound();

  const spareRows = spareOperations.map((row) => {
    const deal = findById(deals, row.dealId);
    return {
      id: row.id,
      dealId: row.dealId,
      dealLabel: deal ? `${dealTypeName(types, deal.typeId)} ${formatDealDate(deal)}` : "",
      spare: spareName(spares, row.spareId),
      count: row.count,
    };
  });

  return <DealForm user={user} record={record} types={types} providers={providers} spareRows={spareRows} />;
}
