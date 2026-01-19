import { useState, type ChangeEvent } from "react"

export default function useForm(initialValues) {
    const [formValues, setFormValues] = useState(initialValues)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return {
        formValues,
        setFormValues,
        handleChange,
    }
}
