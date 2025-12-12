"use client";

//imports de librerias utilizadas
import {useForm,useFieldArray, useWatch} from "react-hook-form";
import {useState, useEffect} from "react";
import {FaPlus, FaTimes } from "react-icons/fa";

//imports dedicados a React-Phone-Number-Input
import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import es from "react-phone-number-input/locale/es.json";
import 'react-phone-number-input/style.css';

//imports dedicados a types y constantes de propietarios
import { Documentos, InitialPropietario, PropietarioForm, Telefonos } from "@/types/propietario"

//imports dedicados a componentes
import { FormField } from "@/components/Form/FormField";
import { SearchableSelect, Select } from "@/components/Form/Select";
import { InputNumber, InputText } from "@/components/Form/Input";

//imports dedicados a types
import { Ciudad } from "@/constants/tipoCiudad";
import { Asesor } from "@/constants/tipoAsesor";

//imports dedicados a constantes
import { Sucursales } from "@/constants/tipoSucursal";

//imports dedicados a servicios de Domus
import { getCities, getBrokers } from "@/lib/domus_connection";

//imports dedicados a las alertas globales
import GlobalAlert, { StateAlert } from "@/components/Form/FormAlert";

export default function FormOwners (){
    const [ciudades, setCiudades] = useState<Ciudad[]>([])
    const [asesores, setAsesores] = useState<Asesor[]>([])

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<PropietarioForm>({
        defaultValues: InitialPropietario
    });

    const phones = useWatch({ control, name: "phones" })

    const { fields, append, remove, update } = useFieldArray({ control, name: "phones" });

    const [alert, setAlert] = useState<StateAlert>({
        show: false,
        destructive: false,
        title: "",
        description: "",
        fadeOut: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            /* const data = await getCities();
            setCiudades(data); */
        };
        const fetchBrokers = async () => {
            /* const data = await getBrokers();
            setAsesores(data); */
        };
        fetchData();
        fetchBrokers();
    }, []);

    const removePhone = (id: any) => {
        if (phones.length !== 1) {
            remove(id)
        } else {
            setAlert({
                show: true,
                destructive: true,
                title: "Error en eliminar telefono",
                description: "Si quieres modificar el telefono, interactua con el campo"
            })
        }
    }

    const onSubmit = (data: PropietarioForm) => {
        console.log("Datos finales:", data);
    };

    const onError = () => {
        setAlert({
            show: true,
            destructive: true,
            title: "Faltan datos",
            description: "Debes completar la informacion del propietario"
        })
    }
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col w-full">
                <GlobalAlert alert={alert} setAlert={setAlert} />
                <fieldset className="flex flex-col sm:flex-row gap-3 items-end fieldset-base">
                    <FormField control={control} name="document_type" label="Tipo de documento" placeholder="Seleccione una opcion" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Documentos} />
                    <FormField control={control} name="document" label="Nro de Documento" placeholder="Inserte numero de documento" rules={{ required: "Este campo es obligatorio" }} component={InputNumber} />
                </fieldset>
                <fieldset className="flex flex-col sm:flex-row gap-3 items-end fieldset-base">
                    <FormField control={control} name="name" label="Nombres" placeholder="Primer y Segundo Nombre" rules={{ required: "Este campo es obligatorio" }} component={InputText} />
                    <FormField control={control} name="last_name" label="Apellidos" placeholder="Primer y Segundo Apellido" rules={{ required: "Este campo es obligatorio" }} component={InputText} />
                    <FormField control={control} name="email" label="Email" placeholder="correo electronico" rules={{ required: "Este campo es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "Por favor introducir un email valido" } }} component={InputText} />
                </fieldset>
                <fieldset className="flex flex-col gap-3 justify-center items-center fieldset-base">
                    {fields.map((field, index) => (
                        <div key={field.id} className="w-full flex flex-col gap-3 sm:flex-row  items-center sm:items-end">
                            <FormField control={control} name={`phones.${index}.type`} label="Tipo de telefono" placeholder="Tipo" component={Select} options={Telefonos} />
                            <div className="w-full">
                                <PhoneInputWithCountry defaultCountry="CO" name={`phones.${index}.phone`} control={control} labels={es} placeholder="Ingrese el numero telefonico" rules={{ validate: (value: string) => isPossiblePhoneNumber(value || "") || "Numero telefonico invalido" }} className="input-base w-full" />
                            </div>
                            <button type="button" onClick={() => removePhone(index)}
                                className="button-base rounded-full bg-error-text text-white border-red-950 active:bg-error"><FaTimes /></button>
                        </div>
                    ))}
                    {
                        errors.phones?.message && (
                            <p className="text-red-500"> {errors.phones.message}</p>
                        )
                    }
                    <button type="button" className="button-base rounded-full w-fit" onClick={() => {append({ type: "", phone: "" }); console.log(phones)}}>
                        <FaPlus />
                    </button>
                </fieldset>
                {/* <FormField control={control} name="phone" label="Telefono Opcional" placeholder="Inserte numero de telefono" rules={{ required: "Este campo es obligatorio" }} component={InputNumber} /> */}
                <fieldset className="flex flex-col sm:flex-row gap-3 items-end fieldset-base">
                    <FormField control={control} name="city" label="Ciudad" placeholder="Seleccionar Ciudad" rules={{ required: "Este campo es obligatorio" }} component={SearchableSelect} options={ciudades} />
                    <FormField control={control} name="neighborhood" label="Barrio" placeholder="Barrio" rules={{ required: "Este campo es obligatorio" }} component={InputText} />
                </fieldset>
                <fieldset className="flex flex-col sm:flex-row gap-3 items-end fieldset-base">
                    <FormField control={control} name="broker" label="Asesor" placeholder="Seleccionar Asesor" rules={{ required: "Este campo es obligatorio" }} component={SearchableSelect} options={asesores} />
                    <FormField control={control} name="branch" label="Sucursal" placeholder="Seleccione una opcion" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Sucursales} />
                </fieldset>
                <button className="border-primary border-2">Prueba</button>
            </form>
        </div>
    );
}