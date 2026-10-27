import { DealForm } from "@/components/forms/DealForm";
import { dealRepo, dealTypeRepo, providersRepo, spareOperationRepo, sparesRepo } from "@/lib/db";
import { dealTypeName, findById, formatDealDate, spareName } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function NewDealPage() {
  const user = await requireUser();
  const [types, providers, deals, spares, spareOperations] = await Promise.all([
    dealTypeRepo.list(),
    providersRepo.list(),
    dealRepo.list(),
    sparesRepo.list(),
    spareOperationRepo.list(),
  ]);

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

  return <DealForm user={user} types={types} providers={providers} spareRows={spareRows} />;
}
