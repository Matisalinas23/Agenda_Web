import { useState, type ChangeEvent } from 'react';
import SeleccionarColor from './SeleccionarColor'
import type { IFormValues } from '../screens/agenda/agenda';

interface IAñadirEditarNota {
    initialValues: IFormValues
    onSubmit: (formValues: IFormValues) => void
    closeModal: () => void
}

export default function AñadirEditarNota({ initialValues, onSubmit, closeModal }: IAñadirEditarNota) {
    const [formValues, setFormValues] = useState<IFormValues>(initialValues)
    
    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <form className="w-1/2 py-4 px-8 text-white bg-neutral-600"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formValues)
            }}
        >
            <div className='mb-8 grid grid-cols-3 gap-x-8 gap-y-6'>
                <input
                    name="assignature" value={formValues.assignature} onChange={handleOnChange}
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

                <SeleccionarColor setFormValues={setFormValues} color={formValues.color} />
            </div>
            
            <div className='w-full flex justify-between'>
                <button onClick={closeModal} className="cursor-pointer py-2 w-48 bg-red-700 text-white font-semibold rounded-xl duration-200 hover:bg-red-500">CANCELAR</button>
                <button className="cursor-pointer h-fit py-2 w-48 rounded-xl text-md text-blue-900 font-bold bg-blue-300">ACEPTAR</button>
            </div>
        </form>
    )
}
