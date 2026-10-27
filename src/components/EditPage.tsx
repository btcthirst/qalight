import type { ReactNode } from "react";

import { Page, type Crumb } from "./Page";
import type { MenuKey } from "./Chrome";
import type { SessionUser } from "@/lib/types";
import { MONTH_LABELS } from "@/lib/format";

export const FORM_TOKEN = "qalight-static-token";

export function HiddenFields({
  entity,
  id,
  redirectTo,
}: {
  entity: string;
  id?: number;
  redirectTo: string;
}) {
  return (
    <>
      <input type="hidden" name="_entity" value={entity} />
      <input type="hidden" name="_id" value={id ?? ""} />
      <input type="hidden" name="_redirect" value={redirectTo} />
    </>
  );
}

interface EditPageProps {
  user: SessionUser;
  active: MenuKey;
  crumbs?: Crumb[];
  entity: string;
  isNew: boolean;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  children: ReactNode;
  after?: ReactNode;
}

export function EditPage({
  user,
  active,
  crumbs = [{ label: "Словарь" }],
  entity,
  isNew,
  action,
  submitLabel,
  children,
  after,
}: EditPageProps) {
  return (
    <Page user={user} active={active} title="Словарь" subtitle="" crumbs={crumbs}>
      <div className="row">
        <div className="col-xs-12">
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">Редактирование </h3>
            </div>

            <form name={entity} method="post" action={action} className="form-horizontal">
              <div id={entity}>
                {children}
                <input
                  type="hidden"
                  id={`${entity}__token`}
                  name={`${entity}[_token]`}
                  className="form-control"
                  value={FORM_TOKEN}
                />
              </div>
              <div className="box-footer">
                {isNew ? (
                  <button type="submit" name="add" className="btn btn-info">
                    {submitLabel ?? "Создать"}
                  </button>
                ) : (
                  <>
                    <button type="submit" name="save" className="btn btn-info">
                      {submitLabel ?? "Сохранить"}
                    </button>
                    <button type="submit" name="delete" className="btn btn-danger pull-right">
                      Удалить
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {after}
    </Page>
  );
}

interface FieldProps {
  entity: string;
  field: string;
  label: string;
  required?: boolean;
  type?: string;
  value?: string;
  placeholder?: string;
}

export function TextField({ entity, field, label, required, type = "text", value, placeholder }: FieldProps) {
  const id = `${entity}_${field.replace(/[.[\]]/g, "_")}`;
  return (
    <div className="form-group">
      <label className={`col-sm-2 control-label${required ? " required" : ""}`} htmlFor={id}>
        {label}
      </label>
      <div className="col-sm-10">
        <input
          type={type}
          id={id}
          name={`${entity}[${field}]`}
          required={required || undefined}
          className="form-control"
          defaultValue={value ?? ""}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<FieldProps, "type" | "placeholder"> {
  options: SelectOption[];
  emptyOption?: boolean;
}

export function SelectField({ entity, field, label, required, value, options, emptyOption }: SelectFieldProps) {
  const id = `${entity}_${field.replace(/[.[\]]/g, "_")}`;
  return (
    <div className="form-group">
      <label className={`col-sm-2 control-label${required ? " required" : ""}`} htmlFor={id}>
        {label}
      </label>
      <div className="col-sm-10">
        <select id={id} name={`${entity}[${field}]`} className="form-control" defaultValue={value ?? ""}>
          {emptyOption && <option value="" />}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface CheckboxFieldProps {
  entity: string;
  field: string;
  label: string;
  checked?: boolean;
}

export function CheckboxField({ entity, field, label, checked }: CheckboxFieldProps) {
  const id = `${entity}_${field.replace(/[.[\]]/g, "_")}`;
  return (
    <div className="form-group">
      <div className="col-sm-2" />
      <div className="col-sm-10">
        <div className="checkbox">
          <label>
            <input type="checkbox" id={id} name={`${entity}[${field}]`} value="1" defaultChecked={checked} />
            {label}
          </label>
        </div>
      </div>
    </div>
  );
}

export interface DateValue {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

function range(start: number, end: number): number[] {
  const values: number[] = [];
  for (let value = start; value <= end; value += 1) values.push(value);
  return values;
}

export function DateTimeField({
  entity,
  field,
  label,
  value,
}: {
  entity: string;
  field: string;
  label: string;
  value: DateValue;
}) {
  const id = `${entity}_${field}`;
  const pad = (input: number) => String(input).padStart(2, "0");
  const currentYear = new Date().getFullYear();
  const years = range(currentYear - 5, currentYear + 5);
  if (!years.includes(Number(value.year))) {
    years.push(Number(value.year));
    years.sort((a, b) => a - b);
  }

  return (
    <div className="form-group">
      <label className="col-sm-2 control-label required">{label}</label>
      <div className="col-sm-10">
        <div id={id} className="form-inline">
          <select id={`${id}_date_day`} name={`${entity}[${field}][date][day]`} className="form-control" defaultValue={value.day}>
            {range(1, 31).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select id={`${id}_date_month`} name={`${entity}[${field}][date][month]`} className="form-control" defaultValue={value.month}>
            {range(1, 12).map((month) => (
              <option key={month} value={month}>
                {MONTH_LABELS[month - 1]}
              </option>
            ))}
          </select>
          <select id={`${id}_date_year`} name={`${entity}[${field}][date][year]`} className="form-control" defaultValue={value.year}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select id={`${id}_time_hour`} name={`${entity}[${field}][time][hour]`} className="form-control" defaultValue={value.hour}>
            {range(0, 23).map((hour) => (
              <option key={hour} value={hour}>
                {pad(hour)}
              </option>
            ))}
          </select>
          :
          <select id={`${id}_time_minute`} name={`${entity}[${field}][time][minute]`} className="form-control" defaultValue={value.minute}>
            {range(0, 59).map((minute) => (
              <option key={minute} value={minute}>
                {pad(minute)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
