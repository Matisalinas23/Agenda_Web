import SeleccionarColor from './SeleccionarColor'
import type { IFormValues } from '../screens/agenda/agenda';
import { ButtonCancelMedium } from './ButtonCancel';
import useDate from '../hooks/useDate';
import useForm from '../hooks/useForm';

interface IAñadirEditarNota {
    initialValues: IFormValues
    onSubmit: (formValues: IFormValues) => void
    closeModal: () => void
}

export default function AñadirEditarNota({ initialValues, onSubmit, closeModal }: IAñadirEditarNota) {
    const { año, toInputDate } = useDate()
    initialValues.limitDate = toInputDate(initialValues.limitDate)

    const { formValues, handleChange, setFormValues } = useForm(initialValues)

    return (
        <form className="w-1/2 py-4 px-8 text-white bg-neutral-700"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formValues)
            }}
        >
            <div className='mb-8 grid grid-cols-3 gap-x-8 gap-y-6'>
                <input
                    name="assignature" value={formValues.assignature} onChange={handleChange}
                    type="text" placeholder="Asignatura" className="bg-neutral-500 py-1 pl-2"
                />
                <input
                    name="title" value={formValues.title} onChange={handleChange}
                    type="text" placeholder="Titulo" className="bg-neutral-500 py-1 pl-2"
                />
                <input
                    name="limitDate" value={formValues.limitDate} onChange={handleChange}
                    type="date" placeholder="Fecha" className="bg-neutral-500 py-1 pl-2"
                    min={`${año}-01-01`} max={`${año}-12-31`}
                />
                <textarea
                    name="description" value={formValues.description} onChange={handleChange}
                    placeholder='Descripción' className="bg-neutral-500"
                />

                <SeleccionarColor setFormValues={setFormValues} color={formValues.color} />
            </div>
            
            <div className='w-full flex justify-between'>
                <ButtonCancelMedium onClick={closeModal}/>
                <button type='submit' className="cursor-pointer h-fit py-2 w-48 rounded-xl text-md text-blue-900 font-bold bg-blue-300">ACEPTAR</button>
            </div>
        </form>
    )
}
