import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface AlertProps {
    destructive?: boolean;
    title: string;
    description: string;
}

export default function FormAlert({ destructive, title, description }: AlertProps) {
    return (
        <div >
            {!destructive &&
                <Alert variant="default" >
                    <AlertTitle> {title}</AlertTitle>
                    <AlertDescription><p className=" text-justify text-balance w-40 md:w-80">{description}</p></AlertDescription>
                </Alert>}
            {destructive &&
                <Alert variant="destructive" >
                    <AlertTitle> {title}</AlertTitle>
                    <AlertDescription><p className=" text-justify text-balance w-40 md:w-80">{description}</p></AlertDescription>
                </Alert>}
        </div >
    )
}