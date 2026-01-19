import { useState, type ChangeEvent } from "react"

export default function useForm<T extends Record<string, any>>(initialValues: T) {
    const [formValues, setFormValues] = useState<T>(initialValues)

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
