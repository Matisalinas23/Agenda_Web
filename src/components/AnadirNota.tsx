import { type FormEvent } from "react"
import useForm from "../hooks/useForm"
import type { ICreateNote } from "../interfaces/notes"
import SeleccionarColor from "./SeleccionarColor"
import { ButtonAcceptMedium } from "./Buttons/ButtonAccept"
import useDate from "../hooks/useDate"
import { ButtonCancelMedium } from "./Buttons/ButtonCancel"
import { useNotes } from "../hooks/useNotes"
import { useAuth } from "../hooks/useAuth"

export default function AñadirNota({ closeModal }: { closeModal: () => void }) {
    const { año } = useDate()
    const { createNote } = useNotes()
    const { getDecodedId } = useAuth()
    const { formValues, setFormValues, handleChange } = useForm<ICreateNote>({
        title: "",
        assignature: "",
        description: "",
        color: "",
        limitDate: "",
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formValues: ICreateNote) => {
        e.preventDefault()

        const userId = getDecodedId()

        if (!userId) {
            console.log("User id is required")
            return
        }
        const isCreatedNote = await createNote(formValues, userId)

        if (!isCreatedNote) {
            alert("Ha ocurrido un error al crear la nota, intentalo denuevo mas tarde")
            return
        }

        closeModal()
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, formValues)} className="w-1/2">

            {/* NOTE BODY */}
            <div className="relative mb-4 bg-white dark:bg-secondary-dark rounded-[1.25rem] px-3 flex items-center gap-4">

                {/* NOTE INPUTS */}
                <div className="py-2 flex flex-col w-full gap-2">
                    <div className="w-full dark:text-white flex gap-4">
                        <input
                            type="text" name="assignature" value={formValues.assignature}
                            onChange={handleChange} placeholder="Asignatura" className="bg-neutral-100 dark:bg-white/10 w-full px-2 py-1 rounded-xl"
                        />
                        <input
                            type="text" name="title" value={formValues.title} onChange={handleChange}
                            placeholder="Titulo de la Nota" className="bg-neutral-100 dark:bg-white/10 w-full px-2 py-1 rounded-xl"
                        />

                        <input
                            type="date" name="limitDate" value={formValues.limitDate} onChange={handleChange}
                            min={`${año}-01-01`} max={`${año}-12-31`} className="bg-neutral-100 dark:bg-white/10 px-1 rounded-lg"
                        />
                    </div>
                    <textarea
                        name="description" value={formValues.description} onChange={handleChange}
                        placeholder="Descripción" className="max-h-8 bg-neutral-100 dark:bg-white/10 dark:text-white rounded-xl"
                    ></textarea>
                </div>

                <SeleccionarColor setFormValues={setFormValues} />
            </div>

            <div className="flex justify-between">
                <ButtonCancelMedium onClick={closeModal} />
                <ButtonAcceptMedium type="submit" />
            </div>
        </form>
    )
}
