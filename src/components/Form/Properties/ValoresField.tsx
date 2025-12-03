import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { FormField } from "@/components/Form/FormField";
import { InputPrice } from "@/components/Form/Input";

export default function ValoresField() {
    const { control,setValue } = useFormContext();

    //variable para saber el valor de biz
    const biz = useWatch({ control, name: "biz" });

    //Resetea los valores de saleprice y rent cada vez que se escoge un tipo de gestion
    useEffect(() => {
        if (biz === 1) {
            setValue("saleprice", "");
        }
        if (biz === 2) {
            setValue("rent", "");
        }
    }, [biz]);

    return (
        <fieldset className="fieldset-base flex flex-col md:flex-row gap-3">
            <legend className="text-gray-500 px-2">Valores</legend>
            <div className={`flex-col grow justify-center  ${biz == "" ? "hidden" : "flex gap-2"}`}>
                {(biz == 1 || biz == 3) &&
                    <FormField control={control} name="rent" label="Valor Canon" placeholder="$ Valor Canon" rules={{ required: "Este campo es obligatorio" }} component={InputPrice} />
                }
                {(biz == 2 || biz == 3) &&
                    <FormField control={control} name="saleprice" label="Valor Venta" placeholder="$ Valor Venta" rules={{ required: "Este campo es obligatorio" }} component={InputPrice} />
                }
            </div>
            <div className="flex flex-col grow ">
                <FormField control={control} name="administration" label="Valor Administración" placeholder="$ Valor Administración" rules={{}} component={InputPrice} />
            </div>
        </fieldset>
    )
}