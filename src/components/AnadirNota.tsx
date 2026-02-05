import { useState, type FormEvent } from "react"
import useForm from "../hooks/useForm"
import type { ICreateNote } from "../interfaces/notes"
import SeleccionarColor from "./SeleccionarColor"
import { ButtonAcceptMedium } from "./Buttons/ButtonAccept"
import useDate from "../hooks/useDate"
import { ButtonCancelMedium } from "./Buttons/ButtonCancel"
import { useNotes } from "../hooks/useNotes"

export default function AñadirNota({ closeModal }: { closeModal: () => void }) {
    const [openSelectColor, setOpenSelectColor] = useState<boolean>(false);
    const [buttonColor, setButtonColor] = useState<string | null>(null);

    const { año } = useDate()
    const { createNote } = useNotes()
    const { formValues, setFormValues, handleChange } = useForm<ICreateNote>({
        title: "",
        assignature: "",
        description: "",
        color: "",
        limitDate: "",
    })

    const handleOpenSelectColor = () => {
        setOpenSelectColor(!openSelectColor)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formValues: ICreateNote) => {
        e.preventDefault()

        const isCreatedNote = await createNote(formValues)

        if (!isCreatedNote) {
            alert("Ha ocurrido un error al crear la nota, intentalo denuevo mas tarde")
            return
        }

        closeModal()
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, formValues)} className="w-1/2">

            {/* NOTE BODY */}
            <div className="relative mb-4 bg-white rounded-[1.25rem] px-3 flex items-center gap-4">

                {/* NOTE INPUTS */}
                <div className="py-2 flex flex-col w-full gap-2">
                    <div className="w-full flex gap-4">
                        <input
                            type="text" name="assignature" value={formValues.assignature}
                            onChange={handleChange} placeholder="Asignatura" className="bg-neutral-100 w-full px-2 py-1 rounded-xl"
                        />
                        <input
                            type="text" name="title" value={formValues.title} onChange={handleChange}
                            placeholder="Titulo de la Nota" className="bg-neutral-100 w-full px-2 py-1 rounded-xl"
                        />

                        <input
                            type="date" name="limitDate" value={formValues.limitDate} onChange={handleChange}
                            min={`${año}-01-01`} max={`${año}-12-31`} className="bg-neutral-100 px-1 rounded-lg"
                        />
                    </div>
                    <textarea
                        name="description" value={formValues.description} onChange={handleChange}
                        placeholder="Descripción" className="max-h-8 bg-neutral-100 rounded-xl"
                    ></textarea>
                </div>

                <button
                    className="w-13 h-12 rounded-full cursor-pointer"
                    style={buttonColor ? {backgroundColor: buttonColor} : {backgroundColor: "#3686FF"}}
                    onClick={handleOpenSelectColor}
                >
                </button>

                {openSelectColor && <SeleccionarColor setFormValues={setFormValues} setButtonColor={setButtonColor} closeModal={() => setOpenSelectColor(false)} />}
            </div>

            <div className="flex justify-between">
                <ButtonCancelMedium onClick={closeModal} />
                <ButtonAcceptMedium type="submit" />
            </div>
        </form>
    )
}
