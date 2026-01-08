import { useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import SeleccionarColor from './SeleccionarColor'

export interface INote {
  id: number;
  title: string;
  description: string;
  limitDate: string;
  assignature: string;
  completed: boolean;
  color: string;
  textColor: string;
}

export interface IFormValues {
  asignature: string
  title: string
  limitDate: string
  description: string
  color: string
}

export default function FormularioAñadirNota({ notes, setNotes }: { notes: INote[], setNotes: Dispatch<SetStateAction<INote[]>> }) {
    const [formValues, setFormValues] = useState<IFormValues>({
        asignature: "",
        title: "",
        limitDate: "",
        description: "",
        color: ""
    })

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const darkColors = ["#E54444","#F38A48","#56EB83", "#5F62F2", "#AF78EA", "#E171E6", "#535353"];
        e.preventDefault();

        setNotes(prev =>
            [
                ...prev,
                {
                    id: notes.length + 1,
                    title: formValues.title,
                    description: formValues.description,
                    limitDate: formValues.limitDate,
                    completed: false,
                    assignature: formValues.asignature,
                    color: formValues.color,
                    textColor: darkColors.includes(formValues.color) ? "#ffffff" : "#222222",
                }
            ]
        )
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2 py-4 px-8 text-white bg-neutral-600 grid grid-cols-3 gap-x-8 gap-y-6">
            <input
                name="asignature" value={formValues.asignature} onChange={handleOnChange}
                type="text" placeholder="Asignatura" className="bg-neutral-500 py-1 pl-2"
            />
            <input
                name="title" value={formValues.title} onChange={handleOnChange}
                type="text" placeholder="Titulo" className="bg-neutral-500 py-1 pl-2"
            />
            <input
                name="limitDate" value={formValues.limitDate} onChange={handleOnChange}
                type="text" placeholder="Fecha" className="bg-neutral-500 py-1 pl-2"
            />
            <textarea
                name="description" value={formValues.description} onChange={handleOnChange}
                placeholder='Descripción' className="bg-neutral-500"
            />
            <SeleccionarColor setFormValues={setFormValues} />
            <button className="cursor-pointer h-fit py-2 rounded-xl text-md text-blue-900 font-bold bg-blue-300">CREAR</button>
        </form>
    )
}
