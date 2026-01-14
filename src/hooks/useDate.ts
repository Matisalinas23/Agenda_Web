import { useEffect, useState } from "react"

export default function useDate() {
    const [año, setAño] = useState<number>(2026)

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString("es-AR")
    }

    const toInputDate = (date: string | Date) => {
        const d = new Date(date)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, "0")
        const day = String(d.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        const año: number = new Date().getFullYear()
        setAño(año)
    }, [])
    
    return {
        año,
        setAño,
        formatDate,
        toInputDate,
    }
}
