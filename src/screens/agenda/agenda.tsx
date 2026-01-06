import { useState, type ChangeEvent, type FormEvent, type InputEvent } from "react";
import styles from './agenda.module.css'
import SeleccionarColor from "../../components/SeleccionarColor";
import SeleccionarColorTexto from "../../components/SeleccionarColorTexto";

interface INoteCreate {
    title: string;
    description: string;
    limitDate: string;
    assignature: string;
    color: string;
    textColor: string;
}

interface INote extends INoteCreate {
    id: number;
    completed: boolean;
}

export const Agenda = () => {
  const [formValues, setFormValues] = useState<{
    asignature: string
    title: string
    limitDate: string
    description: string
    color: string
    textColor: string
  }>({
    asignature: "",
    title: "",
    limitDate: "",
    description: "",
    color: "",
    textColor: ""
  })

  const notas: INote[] = [
    {
      id: 1,
      title: 'Estudiar matemáticas',
      description: 'Repasar álgebra y geometría para el examen del viernes.',
      limitDate: '2024-06-10',
      completed: false,
      assignature: 'Matemáticas',
      color: "#2b2b2b",
      textColor: "#ffffff"
    }
  ]

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormValues(prev => ({
        ...prev,
        [name]: value,
    }))

    console.log(value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className="flex flex-col items-center gap-24">
        <ul className="w-1/2">
            {notas.length === 0
                ? 'No hay agendas creadas'
                : notas.map((nota, index) => (
                    <li
                        key={index+1}
                        className={`bg-[${nota.color}] p-4 mb-4 rounded-lg text-white flex gap-4`}
                    >
                        <div>
                            {index+1}
                        </div>
                        <div>
                            {nota.title}
                        </div>
                    </li>
                ))
            }
        </ul>

        <form onSubmit={handleSubmit} className={styles.createNote}>
            <div className="text-white grid grid-cols-3 gap-x-8 gap-y-4">
                <input name="asignature" value={formValues.asignature} onChange={handleOnChange} type="text" placeholder="Asignatura" />
                <input name="title" value={formValues.title} onChange={handleOnChange} type="text" placeholder="Titulo" />
                <input name="limitDate" value={formValues.limitDate} onChange={handleOnChange} type="text" placeholder="Fecha" />
                <textarea name="description" value={formValues.description} onChange={handleOnChange} placeholder="" className="bg-neutral-600"></textarea>
                <SeleccionarColor />
                <SeleccionarColorTexto />
            </div>
        </form>
    </div>
  )
}
