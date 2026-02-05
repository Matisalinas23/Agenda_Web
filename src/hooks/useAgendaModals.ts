import { useState } from "react";

export type ModalType = "create" | "edit" | "delete" | "view" | null;

export default function useAgendaModals() {
    const [modal, setModal] = useState<ModalType>(null);

    const openCreate = () => {
        setModal("create");
    };

    const openEdit = () => {
        setModal("edit");
    };

    const openDelete = () => {
        setModal("delete");
    };

    const openView = () => {
        setModal("view");
    };

    const closeModal = () => {
        setModal(null);
    };
    return {
        modal,
        openCreate,
        openEdit,
        openDelete,
        openView,
        closeModal,
    }
}
