import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/Form/FormField";
import { TextArea } from "@/components/Form/TextArea";

export default function DescriptionField() {
    const { control } = useFormContext();
    return (
        <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500 px-2"> Descripcion y Comentarios</legend>
            <FormField control={control} name="description" label="Descripcion" rules={{ required: "Este campo es obligatorio", maxLength: { message: "Solo se pueden maximo 1500 caracteres", value: 1500 } }} component={TextArea} />
            <FormField control={control} name="comment" label="Comentarios" component={TextArea} />
        </fieldset>
    )
}